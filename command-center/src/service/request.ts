import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
                toast.error("Request error: Couldn't initiate request.");
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
                    toast.error("An unexpected error occurred.");
                }
                return Promise.reject(error);
            }
        );
    }

    private handleHttpError(response: AxiosResponse) {
        const { status, data } = response;

        switch (status) {
            case 400:
                toast.error(data.message || 'Bad Request: Invalid input.');
                console.error('Bad Request:', data);
                break;
            case 401:
                this.handleUnauthorized();
                break;
            case 403:
                toast.error(data.message || 'Forbidden: Access denied.');
                console.error('Forbidden:', data);
                break;
            case 404:
                toast.error(data.message || 'Resource not found.');
                console.error('Not Found:', data);
                break;
            case 500:
                toast.error(data.message || 'Server Error: Please try again later.');
                console.error('Server Error:', data);
                break;
            default:
                toast.error(data.message || 'Unexpected Error occurred.');
                console.error('Unexpected Error:', data);
        }
    }

    private handleNetworkError(error: any) {
        toast.error('Network Error: Please check your connection.');
        console.error('Network Error:', error.message);
    }

    private handleUnauthorized() {
        toast.warn('Unauthorized: Please log in again.');
        alert("Unauthorized: Please log in again.")
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