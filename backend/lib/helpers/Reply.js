"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOk = exports.okReply = exports.errStatus = exports.okStatus = exports.any = exports.all = exports.Reply = exports.UnexpectedNotOkError = exports.UnexpectedOkError = exports.Status = void 0;
const has_1 = require("./has");
const hasAll_1 = require("./hasAll");
const deepCopy_1 = require("./deepCopy");
const log_1 = require("./log");
var Status;
(function (Status) {
    Status["Ok"] = "Ok";
    Status["Error"] = "Error";
})(Status = exports.Status || (exports.Status = {}));
class UnexpectedOkError extends Error {
    constructor() {
        super("A reply with StatusCode.OK does not store an errorMessage. Did you mean .getValue()?");
    }
}
exports.UnexpectedOkError = UnexpectedOkError;
class UnexpectedNotOkError extends Error {
    constructor() {
        super("A reply with StatusCode.ERROR is not intended hold any data. Did you mean .getMessage()?");
    }
}
exports.UnexpectedNotOkError = UnexpectedNotOkError;
class Reply {
    constructor(reply, stack) {
        this.serializedReply = reply;
        this.stack = stack;
    }
    static all(...replies) {
        for (const reply of replies) {
            if (reply.notOk()) {
                return Reply.collectErrors(...replies);
            }
        }
        return Reply.getOk();
    }
    static any(...replies) {
        for (const reply of replies) {
            if (reply.ok()) {
                return Reply.getOk();
            }
        }
        return Reply.collectErrors(...replies);
    }
    static okReply(data) {
        return new Reply({
            code: Status.Ok,
            data: data,
        }, undefined);
    }
    static okStatus(message) {
        return new Reply({
            code: Status.Ok,
            data: message,
        }, undefined);
    }
    static errStatus(message, stack) {
        var _a;
        if (typeof message === 'string') {
            return new Reply({
                code: Status.Error,
                errMessage: message,
            }, (_a = (stack)) !== null && _a !== void 0 ? _a : new Error().stack);
        }
        else {
            return Reply.createFromError(message);
        }
    }
    static getOk() {
        return Reply.OK;
    }
    static createFromSerializedReply(reply) {
        if (!has_1.has(reply) || !has_1.has(reply.code) && (!has_1.has(reply.data) || !has_1.has(reply.errMessage))) {
            return Reply.getUnparseable();
        }
        return new Reply(reply, reply.code === Status.Ok ? undefined : new Error().stack);
    }
    static createFromError(err) {
        var _a;
        if (!has_1.has(err) || !hasAll_1.hasAll(err.message, err.stack)) {
            return Reply.getUnparseable();
        }
        return new Reply({
            code: Status.Error,
            errMessage: (err.name !== "Error" ? `(${err.name}) ` : "") + err.message,
        }, (_a = err.stack) !== null && _a !== void 0 ? _a : new Error().stack);
    }
    static collectErrors(...replies) {
        const failedReplys = replies.filter(reply => reply.notOk());
        const message = failedReplys.map(reply => reply.getErrorMessage()).join('\n');
        const stack = failedReplys.map(reply => reply.stack).join('\n\n');
        return failedReplys.length === 0 ? Reply.getOk() : Reply.errStatus(message, stack);
    }
    static getUnparseable() {
        return Reply.errStatus("The reply could not be parsed.");
    }
    ok() {
        return this.serializedReply.code === Status.Ok;
    }
    notOk() {
        return !this.ok();
    }
    toSerializedReply() {
        return deepCopy_1.deepCopy(this.serializedReply);
    }
    and(otherReply) {
        return Reply.all(this, otherReply);
    }
    or(otherReply) {
        return Reply.any(this, otherReply);
    }
    getErrorMessage() {
        if (this.ok()) {
            throw new UnexpectedOkError();
        }
        return this.serializedReply.errMessage;
    }
    getValue() {
        if (this.notOk()) {
            throw new UnexpectedNotOkError();
        }
        return this.serializedReply.data;
    }
    orElse(alternativeData) {
        if (this.ok()) {
            return this.getValue();
        }
        else {
            return alternativeData;
        }
    }
    log(...tags) {
        if (this.notOk()) {
            log_1.log(this.getErrorMessage(), Status.Error, ...tags);
            console.log(this.stack);
        }
        else {
            log_1.log(JSON.stringify(this.getValue()), this.serializedReply.code, ...tags);
        }
        return this;
    }
    logIfError() {
        if (this.notOk()) {
            this.log();
        }
        return this;
    }
    throwIfError() {
        if (this.ok()) {
            return this;
        }
        else {
            const err = new Error(this.getErrorMessage());
            if (has_1.has(this.stack)) {
                err.stack = this.stack;
            }
            throw err;
        }
    }
}
exports.Reply = Reply;
Reply.OK = new Reply({
    code: Status.Ok,
}, undefined);
exports.all = Reply.all;
exports.any = Reply.any;
exports.okStatus = Reply.okStatus;
exports.errStatus = Reply.errStatus;
exports.okReply = Reply.okReply;
exports.getOk = Reply.getOk;
//# sourceMappingURL=Reply.js.map