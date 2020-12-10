import { Status } from "./Reply";
export declare enum LogTag {
    Default = "Default",
    Notify = "Notify"
}
export declare const log: (message: string, code?: Status, ...tags: LogTag[]) => string;
//# sourceMappingURL=log.d.ts.map