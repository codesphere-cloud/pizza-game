import { LogTag } from "./log";
export declare enum Status {
    Ok = "Ok",
    Error = "Error"
}
export declare type SerializedReply<T = never, S extends Status = Status> = {
    readonly code: S;
    readonly errMessage: S extends Status.Ok ? never : string;
    readonly data: S extends Status.Ok ? T : never;
};
export declare class UnexpectedOkError extends Error {
    constructor();
}
export declare class UnexpectedNotOkError extends Error {
    constructor();
}
export declare class Reply<T = never, S extends Status = Status> {
    private static readonly OK;
    private readonly serializedReply;
    private readonly stack;
    private constructor();
    static all(...replies: Reply<unknown>[]): Reply;
    static any(...replies: Reply<unknown>[]): Reply<string>;
    static okReply<T>(data?: T): Reply<T, Status.Ok>;
    static okStatus(message: string): Reply<string, Status.Ok>;
    static errStatus(message: string | Error, stack?: (typeof message) extends Error ? never : string): Reply<never, Status.Error>;
    static getOk(): Reply<never, Status.Ok>;
    static createFromSerializedReply<T, S extends Status = Status>(reply: SerializedReply<T, S>): Reply<T>;
    static createFromError(err: Error): Reply<never, Status.Error>;
    private static collectErrors;
    private static getUnparseable;
    ok(): this is Reply<T, Status.Ok>;
    notOk(): this is Reply<never, Status.Error>;
    toSerializedReply(): SerializedReply<T>;
    and(otherReply: Reply<unknown>): Reply<string>;
    or(otherReply: Reply<unknown>): Reply<string>;
    getErrorMessage(): S extends Status.Ok ? never : string;
    getValue(): S extends Status.Ok ? T : never;
    orElse(alternativeData: T): T;
    log(...tags: LogTag[]): this;
    logIfError(): this;
    throwIfError(): Reply<T, Status.Ok>;
}
export declare type UnknownReply = Reply<unknown>;
export declare type ReplyPromise<T> = Promise<Reply<T>>;
export declare type UnknownReplyPromise = ReplyPromise<unknown>;
export declare const all: typeof Reply.all;
export declare const any: typeof Reply.any;
export declare const okStatus: typeof Reply.okStatus;
export declare const errStatus: typeof Reply.errStatus;
export declare const okReply: typeof Reply.okReply;
export declare const getOk: typeof Reply.getOk;
//# sourceMappingURL=Reply.d.ts.map