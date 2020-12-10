import { Reply, Status } from "../helpers/Reply";
export interface ReconnectConfig {
    maxReconnects: number;
    reconnectTimeout: number;
}
export declare abstract class ReconnectingClient {
    private readonly maxReconnects;
    private readonly reconnectTimeout;
    private readonly onReconnectsExceeded;
    private connectionListeners;
    private isConnecting;
    private isConnected;
    private reconnectCounter;
    protected constructor(onReconnectsExceeded: (status: Reply<never, Status.Error> | null) => void, config: ReconnectConfig);
    connect(): Promise<Reply>;
    resolveWhenConnected(): Promise<Reply>;
    protected onDisconnect(reason: Reply<never, Status.Error>): Promise<Reply<never, Status.Error>>;
    protected abstract connectToExternalService(): Promise<Reply>;
    private fireConnectionListeners;
}
//# sourceMappingURL=ReconnectingClient.d.ts.map