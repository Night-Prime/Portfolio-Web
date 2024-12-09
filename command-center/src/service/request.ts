import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import Swal from "sweetalert2";
import { NotificationType, showNotification } from './notification';

interface ResponseData<T = any> {
    status: string;
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
                showNotification('Request Error: Couldn\'t initate request', NotificationType.ERROR)
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
                    showNotification('Unexpected Error, Try Again!', NotificationType.ERROR)
                    console.error('Error', error.message);
                }
                return Promise.reject(error);
            }
        );
    }

    private handleHttpError(response: AxiosResponse) {
        const { status, data } = response;

        switch (status) {
            case 400:
                showNotification('Bad Request, Try Again!', NotificationType.ERROR)
                console.error('Bad Request:', data);
                break;
            case 401:
                this.handleUnauthorized();
                break;
            case 403:
                showNotification('Forbidden: Access Denied', NotificationType.ERROR)
                console.error('Forbidden:', data);
                break;
            case 404:
                showNotification('Resource Not Found', NotificationType.INFO)
                console.error('Not Found:', data);
                break;
            case 500:
                showNotification('Server Error', NotificationType.ERROR)
                console.error('Server Error:', data);
                break;
            default:
                showNotification('Unexpected Error, Try Again!', NotificationType.ERROR)
                console.error('Unexpected Error:', data);
        }
    }

    private handleNetworkError(error: any) {
        showNotification('Network Error, Please check your connection!', NotificationType.ERROR)
        console.error('Network Error:', error.message);
    }

    private handleUnauthorized() {
        showNotification('Unauthorized, Please log in again!', NotificationType.ERROR)
        localStorage.removeItem('authToken');
        window.location.href = '/';
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