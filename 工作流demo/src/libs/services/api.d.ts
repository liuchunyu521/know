declare class Api {
    private _beforeRequest;
    onBeforeRequest(cb: any): void;
    private _afterRequest;
    onAfterRequest(cb: any): void;
    private _onError;
    onError(cb: any): void;
    get(url: string, data: any): Promise<any>;
    delete(url: string): Promise<any>;
    post(url: string, data?: any, json?: boolean): Promise<any>;
}
declare const _default: Api;
export default _default;
