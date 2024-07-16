import axios, { AxiosError } from 'axios';
import type { AxiosResponse } from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';

// 定义接口类型《后端返回的最外层数据类型》
interface BaseResponse<T = any> {
    code: number | string;
    message: string;

    data: T;
}
const service: AxiosInstance = axios.create({
    // baseURL: '/',
    // 这样我们就可以在环境变量中改变 axios 的 baseURL
    baseURL: import.meta.env.BASE_URL,
    timeout: 10000
});

// axios 实例拦截请求
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        return config;
    },
    (err: AxiosError) => {
        return Promise.reject(err);
    }
);

// axios 实例拦截响应
service.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.status === 200) {
            const data = response.data;
            if (data.code === 401) {
                window.location.href = '/login';
                // ElMessage({
                //     message: data.message,
                //     type: 'error'
                // });
                // return Promise.reject(data);
            } else {
                return data;
            }
        }
        return response;
    },
    (err: AxiosError) => {
        return Promise.reject(err);
    }
);

export default service;
