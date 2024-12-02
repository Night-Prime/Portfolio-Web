import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

interface ResponseData<T = any> {
    data: T;
    message?: string;
}

class ApiClient {
    private instance: AxiosInstance;

    constructor() {
        this.instance = axios.create({
            baseURL: process.env.REACT_APP_BACKEND_URL,
            timeout: 10000, // 10 seconds timeout
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        this.initializeInterceptors();
    }

    private initializeInterceptors() {
        this.instance.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('authToken');
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Response interceptor
        this.instance.interceptors.response.use(
            (response) => response,
            (error: any) => {
                if (error.response) {
                    this.handleHttpError(error.response);
                } else if (error.request) {
                    this.handleNetworkError(error);
                } else {
                    console.error('Error', error.message);
                }
                return Promise.reject(error);
            }
        );
    }

    private handleHttpError(response: AxiosResponse) {
        switch (response.status) {
            case 400:
                console.error('Bad Request:', response.data);
                break;
            case 401:
                this.handleUnauthorized();
                break;
            case 403:
                console.error('Forbidden:', response.data);
                break;
            case 404:
                console.error('Not Found:', response.data);
                break;
            case 500:
                console.error('Server Error:', response.data);
                break;
            default:
                console.error('Unexpected Error:', response.data);
        }
    }

    private handleNetworkError(error: any) {
        console.error('Network Error:', error.message);
    }

    private handleUnauthorized() {
        localStorage.removeItem('authToken');
        window.location.href = '/login';
    }

    async get<T>(url: string, config?: AxiosRequestConfig): Promise<ResponseData<T>> {
        try {
            const response = await this.instance.get<ResponseData<T>>(url, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ResponseData<T>> {
        try {
            const response = await this.instance.post<ResponseData<T>>(url, data, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ResponseData<T>> {
        try {
            const response = await this.instance.put<ResponseData<T>>(url, data, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ResponseData<T>> {
        try {
            const response = await this.instance.delete<ResponseData<T>>(url, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export const makeRequest = new ApiClient();