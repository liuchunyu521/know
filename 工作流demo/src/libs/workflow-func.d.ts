import { Options, StartOptions } from './models';
/**
 * 回退
 */
export declare function reject(options: Options): void;
export declare function canTaskRevoke(options: Options): Promise<boolean>;
/**
 * 提交
 */
export declare function submit(options: Options): Promise<void>;
export declare function startWorkflow(options: StartOptions): Promise<void>;
export declare function revoke(options: Options): Promise<void>;
