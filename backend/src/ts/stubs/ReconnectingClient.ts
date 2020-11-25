import {has} from "../helpers/has";
import {wait} from "../helpers/wait";
import {errStatus, okReply, Reply, Status} from "../helpers/Reply";

export interface ReconnectConfig {
    /**
     * Amount of failing reconnects before no further reconnects are attempted.
     * Once a connection is established successfully the budget of failing reconnects is reset to the starting value.
     */
    maxReconnects: number;
    /**
     * Delay between successive reconnects in milliseconds.
     */
    reconnectTimeout: number;
}

export abstract class ReconnectingClient {

    private readonly maxReconnects: number;
    private readonly reconnectTimeout: number;
    private readonly onReconnectsExceeded: (status: Reply<never, Status.Error> | null) => void;
    private connectionListeners: ((reply: Reply<never>) => void)[] = [];
    private isConnecting: boolean = false;
    private isConnected: boolean = false;
    private reconnectCounter: number = 0;

    /**
     * @param onReconnectsExceeded Will be called once the number of reconnection attempts exceeds
     *     the max reconnects ({@link ReconnectConfig.maxReconnects}) given in {@param config}.
     * @param config {@see ReconnectConfig}
     */
    protected constructor(onReconnectsExceeded: (status: Reply<never, Status.Error> | null) => void,
                          config: ReconnectConfig) {
        this.maxReconnects = config.maxReconnects;
        this.reconnectTimeout = config.reconnectTimeout;
        this.onReconnectsExceeded = onReconnectsExceeded;
    }

    /**
     * Only resolves once this service is connected successfully.
     * This method does nothing and resolves immediately if the service is already in the progress of establishing a
     * connection or has already established a connection successfully in the past.
     *
     * @return The return value of {@link resolveWhenConnected}.
     */
    public connect(): Promise<Reply> {
        if (!this.isConnected && !this.isConnecting) {
            this.isConnecting = true;
            (async (): Promise<void> => {
                let connectionStatus = null;
                while ((!has(connectionStatus) || connectionStatus.notOk())
                && this.reconnectCounter < this.maxReconnects) {

                    if (has(connectionStatus)) {
                        connectionStatus.log();
                        okReply(`Reconnecting to external service... (attempts left: ${this.maxReconnects -
                        this.reconnectCounter})`).log();
                        this.reconnectCounter++;
                        await wait(this.reconnectTimeout);
                    }

                    connectionStatus = await this.connectToExternalService();
                }

                if (this.reconnectCounter >= this.maxReconnects) {
                    this.onReconnectsExceeded(connectionStatus as Reply<never, Status.Error>);
                    this.isConnected = false;
                    this.isConnecting = false;
                    return;
                }

                this.isConnected = true;
                this.isConnecting = false;
                this.reconnectCounter = 0;
                if (has(connectionStatus)) {
                    connectionStatus.log();
                    this.fireConnectionListeners(connectionStatus);
                }
            })();
        }

        return this.resolveWhenConnected();
    }

    /**
     * @return A promise that resolves once the connection to the external service is established. The return value
     *     will always resolve to a successful status.
     */
    public async resolveWhenConnected(): Promise<Reply> {
        if (this.isConnected) {
            return Reply.getOk();
        }
        return new Promise<Reply>(resolve => this.connectionListeners.push(resolve));
    }

    /**
     * This method must be called by the implementing class whenever the external service disconnects.
     * It will reconnect to the external service.
     *
     * @param reason An error status explaining the reason for the disconnect.
     * @return The return value of {@link resolveWhenConnected}.
     */
    protected onDisconnect(reason: Reply<never, Status.Error>): Promise<Reply<never, Status.Error>> {
        if (!this.isConnecting) {
            reason.log();
            errStatus('Connection lost. Starting to reconnect...').log();
        }
        this.isConnected = false;
        return this.connect() as Promise<Reply<never, Status.Error>>;
    }

    /**
     * Will be called at least once and at most {@code {@link this.maxReconnects} + 1} times.
     */
    protected abstract connectToExternalService(): Promise<Reply>;

    private fireConnectionListeners(connectionStatus: Reply<never>): void {
        this.connectionListeners.forEach((resolve) => resolve(connectionStatus));
        this.connectionListeners = [];
    }
}
