import axios, { AxiosRequestConfig } from "axios";
import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {DELETE_TOKEN, SET_TOKEN} from "../store/slices/auth";
import {useNavigate} from "react-router-dom";


const API_URL = "http://localhost:4000";
const REFRESH_TOKEN_PATH = "/auth/refresh"; // *** 임의 경로

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});

export const refresh = async () => { // accessToken 재발급
    const response = await axiosInstance.post(
        REFRESH_TOKEN_PATH,
        {
            withCredentials: true,
        },
    );
    if (response.data?.success) {
        return response.data?.accessToken; // *** 임의 데이터 구조
    } else {
        return '';
    }
};

export const useAxios = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dispatch = useDispatch();
    const navigate = useNavigate();
// eslint-disable-next-line react-hooks/rules-of-hooks
    const storeToken = useSelector((state: RootState) => (state.token));
    // const storeToken: string = ''; // *** 임의 삭제 accessToken
    //const navigate = useNavigate();
    const requestInterceptor = axiosInstance.interceptors.request.use(
        (config) => ({
            ...config,
            headers: {
                ...config.headers,
                'Authorization': `Bearer ${storeToken.accessToken}`,// *** 리덕스에 저장한것 불러오기
            },
        }),
        (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
        (value: any) => value,
        async (error) => {
            const originalConfig = error.config;
            console.log('접근.1')
            // accessToken 발급요청이 에러를 내면 무한루프에 빠짐
            if (error.config.url === REFRESH_TOKEN_PATH) {
                console.log('접근.2 리턴')
                return Promise.reject(error);
            }
            if (error.response?.status === 401 && !originalConfig.retry) { // 권한 오류가 발생했고 재실행된(무한루프방지) 경우가 아니라면
                originalConfig.retry = true; // 아래 내용 처리 이후 해당 요청을 재실행
                try {
                    console.log('접근.3 리플레시')
                    const accessToken = await refresh(); // accessToken 토큰 발급
                    if (accessToken) { // 토큰이 정상 발급되었다면 헤더에 accessToken 포함
                        dispatch(SET_TOKEN(error.data?.accessToken));
                        // *** 리덕스에 저장 엑세스토큰
                        console.log('접근.4 ', accessToken)
                        originalConfig.headers['Authorization'] = `Bearer ${storeToken.accessToken}`;// *** 리덕스에 저장한것 불러오기
                        return axiosInstance(originalConfig);
                    }
                } catch (_error) { // ***토큰발급 실패, 로그인정보 초기화 및 로그인창 이동
                    console.log('에러1')
                    dispatch(DELETE_TOKEN())
                    navigate("/home");
                    return Promise.reject(_error);
                }
            }
            return Promise.reject(error);
        }
    );
    useEffect(() => {
        axiosInstance.interceptors.request.use(
            (config: AxiosRequestConfig) => config,
            (error) => Promise.reject(error)
        );

        return () => {
            axiosInstance.interceptors.request.eject(requestInterceptor);
            axiosInstance.interceptors.response.eject(responseInterceptor);
        };
    }, [requestInterceptor,responseInterceptor]);
    return axiosInstance;
};