import {store} from "../store";
import axios, {AxiosHeaders, AxiosInstance, AxiosRequestConfig} from "axios";
import {sendRefreshAccessToken, SET_LOGOUT} from "../store/slices/auth.slice";

const API_URL = "http://localhost:4000";
export const REFRESH_TOKEN_PATH = "/auth/refresh";

console.log("API !!!!!!!!!!!!!!!!!!!!!!!")

const instance = axios.create({
    baseURL: API_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});

export const Api = (): AxiosInstance => {
    return instance
}

export const InitApi = () => {
    console.log('InitApi!!!')
    instance.interceptors.request.use((config) => {
        // @ts-ignore
        config.headers.Authorization = `Bearer ${store.getState().auth.data.accessToken}`
        return config
    });


    instance.interceptors.response.use(
        (value: any) => value,
        async (error) => {
            const originalConfig = error.config;
            console.log('refresh 접근.1')
            // accessToken 발급요청이 에러를 내면 무한루프에 빠짐
            if (error.config.url === REFRESH_TOKEN_PATH) {
                console.log('refresh 접근.2 리턴')
                return Promise.reject(error);
            }
            if (error.response?.status === 401 && !originalConfig.retry) { // 권한 오류가 발생했고 재실행된(무한루프방지) 경우가 아니라면
                try {
                    console.log('refresh 접근.3 리플레시')
                    await store.dispatch(sendRefreshAccessToken())

                    originalConfig.headers['Authorization'] = `Bearer ${store.getState().auth.data.accessToken}`;

                    originalConfig.retry = true; // 아래 내용 처리 이후 해당 요청을 재실행

                    return instance(originalConfig);
                } catch (_error) { // ***토큰발급 실패, 로그인정보 초기화 및 로그인창 이동
                    console.log('refresh 에러1 - 로그아웃')
                    SET_LOGOUT();
                    return Promise.reject(_error);
                }
            }
            return Promise.reject(error);
        }
    );
    instance.interceptors.request.use(
        (config: AxiosRequestConfig) => config,
        (error) => Promise.reject(error)
    );
}