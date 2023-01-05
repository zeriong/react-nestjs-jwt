import {useAxios} from "./useAxios";

/** 유저데이터 불러오기 */
export const useMe = async () => {
    const axios = useAxios();

    const response = await axios.post(
        '/user/profile',
        {
            withCredentials: true,
        },
    );
    return response.data;
};