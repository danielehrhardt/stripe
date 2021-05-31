export declare function flatten(json: any, prefix?: string, omit?: string[]): any;
export declare function stringify(json: any): string;
export declare function formBody(json: any, prefix?: string, omit?: string[]): string;
export declare function _callStripeAPI<T>(fetchUrl: string, fetchOpts: RequestInit): Promise<T>;
export declare function _stripePost<T>(path: string, body: string, key: string, extraHeaders?: any): Promise<T>;
export declare function _stripeGet<T>(path: string, key: string, extraHeaders?: any): Promise<T>;
