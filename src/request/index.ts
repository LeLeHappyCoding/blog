/**
 * @Description: 接口封装
 * @Author: lele
 * @Date: 2025-08-30 16:53:17
 */
import axios from 'axios';

import type {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from 'axios';

interface RequestConfig extends AxiosRequestConfig {
    retryCount?: number;
    retryDelay?: number;
    _metadata?: {
        startTime: number;
    };
}

interface DebounceRecord {
    timer: NodeJS.Timeout;
    resolve: (value: any) => void;
    reject: (reason: any) => void;
}

class HttpRequest {
    private instance: AxiosInstance;
    private pendingRequests: Map<string, AbortController>;
    private retryCounts: Map<string, number>;
    private debounceTimers: Map<string, DebounceRecord>;
    private baseURL: string;

    constructor(baseURL: string = '') {
        this.baseURL = baseURL;
        this.pendingRequests = new Map();
        this.retryCounts = new Map();
        this.debounceTimers = new Map();

        this.instance = axios.create({
            baseURL: this.baseURL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.setupInterceptors();
    }

    private setupInterceptors(): void {
        // 请求拦截器
        this.instance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                const key = this.generateRequestKey(config);

                // 标记开始时间
                (config as RequestConfig)._metadata = {
                    startTime: Date.now(),
                };

                // 如果已有相同请求，先取消
                if (this.pendingRequests.has(key)) {
                    this.pendingRequests.get(key)?.abort();
                }

                // 新建 controller 绑定
                const controller = new AbortController();
                config.signal = controller.signal;
                this.pendingRequests.set(key, controller);

                return config;
            },
            (error) => Promise.reject(error)
        );

        // 响应拦截器
        this.instance.interceptors.response.use(
            (response: AxiosResponse) => {
                const config = response.config as RequestConfig;
                const key = this.generateRequestKey(config);
                const endTime = Date.now();
                const startTime = config._metadata?.startTime || endTime;
                const duration = endTime - startTime;

                // TODO: 这里可以上报接口耗时
                console.log(`[HttpRequest] ${config.url} 耗时 ${duration}ms`);

                // 清理
                this.pendingRequests.delete(key);
                this.retryCounts.delete(key);

                return response;
            },
            (error) => {
                if (axios.isCancel(error)) {
                    return Promise.reject(error);
                }

                const config = error.config as RequestConfig;
                if (!config) return Promise.reject(error);

                const key = this.generateRequestKey(config);
                const currentRetryCount = this.retryCounts.get(key) || 0;
                const retryCount = config.retryCount || 0;
                const retryDelay = config.retryDelay || 1000;

                if (retryCount > 0 && currentRetryCount < retryCount) {
                    this.retryCounts.set(key, currentRetryCount + 1);
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            resolve(this.instance(config));
                        }, retryDelay);
                    });
                }

                // 清理
                this.pendingRequests.delete(key);
                this.retryCounts.delete(key);

                return Promise.reject(error);
            }
        );
    }

    private generateRequestKey(config: AxiosRequestConfig): string {
        const {method, url, params, data} = config;
        return `${method}-${url}-${JSON.stringify(params)}-${JSON.stringify(
            data
        )}`;
    }

    public async request<T = any>(
        config: RequestConfig
    ): Promise<AxiosResponse<T>> {
        return this.instance(config);
    }

    public get<T = any>(
        url: string,
        config: RequestConfig = {}
    ): Promise<AxiosResponse<T>> {
        return this.request({method: 'get', url, ...config});
    }

    public post<T = any>(
        url: string,
        data?: any,
        config: RequestConfig = {}
    ): Promise<AxiosResponse<T>> {
        return this.request({method: 'post', url, data, ...config});
    }

    public put<T = any>(
        url: string,
        data?: any,
        config: RequestConfig = {}
    ): Promise<AxiosResponse<T>> {
        return this.request({method: 'put', url, data, ...config});
    }

    public delete<T = any>(
        url: string,
        config: RequestConfig = {}
    ): Promise<AxiosResponse<T>> {
        return this.request({method: 'delete', url, ...config});
    }

    // 防抖请求
    public debouncedRequest<T = any>(
        config: RequestConfig,
        delay: number
    ): Promise<AxiosResponse<T>> {
        const key = this.generateRequestKey(config);

        if (this.debounceTimers.has(key)) {
            const {timer} = this.debounceTimers.get(key)!;
            clearTimeout(timer);
            this.debounceTimers.delete(key);
        }

        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                this.debounceTimers.delete(key);
                this.request(config).then(resolve).catch(reject);
            }, delay);

            this.debounceTimers.set(key, {timer, resolve, reject});
        });
    }

    // 取消单个请求
    public cancelRequest(config: AxiosRequestConfig): boolean {
        const key = this.generateRequestKey(config);
        if (this.pendingRequests.has(key)) {
            this.pendingRequests.get(key)?.abort();
            this.pendingRequests.delete(key);
            this.retryCounts.delete(key);
            return true;
        }
        return false;
    }

    // 取消所有请求
    public cancelAllRequests(): void {
        this.pendingRequests.forEach((controller) => controller.abort());
        this.pendingRequests.clear();
        this.retryCounts.clear();
    }
}

export default HttpRequest;
