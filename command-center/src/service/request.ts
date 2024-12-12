import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import Swal from "sweetalert2";
import { NotificationType, showNotification } from './notification';
import { useNavigate } from 'react-router';

interface ResponseData<T = any> {
    status: string;
    data: T;
    message?: string;
}

class ApiClient {
    private instance: AxiosInstance;
    private navigate: (path: string) => void;

    constructor() {
        this.instance = axios.create({
            baseURL: process.env.REACT_APP_BACKEND_URL,
            timeout: 30000,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        this.navigate = (path: string) => {
            window.location.href = path;
        };

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
        const { status } = response;

        switch (status) {
            case 400:
                showNotification('Bad Request, Try Again!', NotificationType.ERROR)
                break;
            case 401:
                this.handleUnauthorized();
                break;
            case 403:
                showNotification('Forbidden: Access Denied', NotificationType.ERROR);
                localStorage.removeItem('authToken');
                this.navigate('/');
                break;
            case 404:
                showNotification('Resource Not Found', NotificationType.INFO)
                break;
            case 500:
                showNotification('Server Error', NotificationType.ERROR)
                break;
            default:
                showNotification('Unexpected Error, Try Again!', NotificationType.ERROR)
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

    async get<T>(url: string, config?: AxiosRequestConfig): Promise<ResponseData<T> | null> {
        try {
            const response = await this.instance.get<ResponseData<T>>(url, config);
            return response.data;
        } catch (error) {
            this.handleRequestError(error);
            return null;
        }
    }

    async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ResponseData<T> | null> {
        try {
            const response = await this.instance.post<ResponseData<T>>(url, data, config);
            return response.data;
        } catch (error) {
            this.handleRequestError(error);
            return null;
        }
    }

    async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ResponseData<T> | null> {
        try {
            const response = await this.instance.put<ResponseData<T>>(url, data, config);
            return response.data;
        } catch (error) {
            this.handleRequestError(error);
            return null;
        }
    }

    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ResponseData<T> | null> {
        try {
            const response = await this.instance.delete<ResponseData<T>>(url, config);
            return response.data;
        } catch (error) {
            this.handleRequestError(error);
            return null;
        }
    }

    private handleRequestError(error: any) {
        if (error.response) {
            this.handleHttpError(error.response);
        } else if (error.request) {
            this.handleNetworkError(error);
        } else {

            showNotification('Unexpected Error, Try Again!', NotificationType.ERROR);
            console.error('Error', error.message);
        }
    }
}

export const makeRequest = new ApiClient();