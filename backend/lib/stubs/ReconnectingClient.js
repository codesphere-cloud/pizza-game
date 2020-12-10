"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReconnectingClient = void 0;
const has_1 = require("../helpers/has");
const wait_1 = require("../helpers/wait");
const Reply_1 = require("../helpers/Reply");
class ReconnectingClient {
    constructor(onReconnectsExceeded, config) {
        this.connectionListeners = [];
        this.isConnecting = false;
        this.isConnected = false;
        this.reconnectCounter = 0;
        this.maxReconnects = config.maxReconnects;
        this.reconnectTimeout = config.reconnectTimeout;
        this.onReconnectsExceeded = onReconnectsExceeded;
    }
    connect() {
        if (!this.isConnected && !this.isConnecting) {
            this.isConnecting = true;
            (async () => {
                let connectionStatus = null;
                while ((!has_1.has(connectionStatus) || connectionStatus.notOk())
                    && this.reconnectCounter < this.maxReconnects) {
                    if (has_1.has(connectionStatus)) {
                        connectionStatus.log();
                        Reply_1.okReply(`Reconnecting to external service... (attempts left: ${this.maxReconnects -
                            this.reconnectCounter})`).log();
                        this.reconnectCounter++;
                        await wait_1.wait(this.reconnectTimeout);
                    }
                    connectionStatus = await this.connectToExternalService();
                }
                if (this.reconnectCounter >= this.maxReconnects) {
                    this.onReconnectsExceeded(connectionStatus);
                    this.isConnected = false;
                    this.isConnecting = false;
                    return;
                }
                this.isConnected = true;
                this.isConnecting = false;
                this.reconnectCounter = 0;
                if (has_1.has(connectionStatus)) {
                    connectionStatus.log();
                    this.fireConnectionListeners(connectionStatus);
                }
            })();
        }
        return this.resolveWhenConnected();
    }
    async resolveWhenConnected() {
        if (this.isConnected) {
            return Reply_1.Reply.getOk();
        }
        return new Promise(resolve => this.connectionListeners.push(resolve));
    }
    onDisconnect(reason) {
        if (!this.isConnecting) {
            reason.log();
            Reply_1.errStatus('Connection lost. Starting to reconnect...').log();
        }
        this.isConnected = false;
        return this.connect();
    }
    fireConnectionListeners(connectionStatus) {
        this.connectionListeners.forEach((resolve) => resolve(connectionStatus));
        this.connectionListeners = [];
    }
}
exports.ReconnectingClient = ReconnectingClient;
//# sourceMappingURL=ReconnectingClient.js.map