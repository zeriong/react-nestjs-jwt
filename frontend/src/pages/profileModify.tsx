import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {sendMyProfile, userState} from "../store/slices/user.slice";
import {AppDispatch, RootState} from "../store";
import {useForm} from "react-hook-form";
import {Api} from "../utile/api";

export const ProfileModify = () => {
    type FormData = {
        name: string;
        email: string;
        password?: string | '';
        passwordConfirm?: string | '';
        mobile: string;
    };

    const {
        setValue,
        getValues,
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<FormData>({ mode: "onChange" });

    const { data: userState, loading } = useSelector((state: RootState) => (state.user));

    const [PwShow, setPwShow] = useState(false);
    const [PwConfirmShow, setPwConfirmShow] = useState(false);
    let password = watch("password", "");


    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(sendMyProfile());
    }, []);

    const onSubmit = handleSubmit(async () => {
        console.log('서브밋~!!')
        const {email,password,name,mobile} = getValues();
        await Api().patch(
            '/user/modify',
            {
                "email": email,
                "name": name,
                "mobile": mobile,
                "password": password,
            },)
            .then((res) => {
                console.log(res.data);
            })
            .catch((e) => {
                console.log(e);
            });
    });

    const [inputValue, setInputValue] = useState()

    const onChange = ({target: {value, id}}) => {
        setInputValue(value);
    }

    return ( loading ? (<div>로딩중...</div>) : (
            <div>
                <form
                    className="flex flex-col justify-center items-center"
                    onSubmit={onSubmit}
                >
                    <div className="flex flex-col gap-5">
                        <div>
                            <h1>{`사용중인 이름: ${userState.name}`}</h1>
                            <input
                                id="name"
                                onChange={getValues}
                                className="border border-gray-400 rounded px-2 py-1 w-96"
                                {...register("name", { required: true, minLength: 2, maxLength: 30 })}
                                type="text"
                                value={userState.name}
                                placeholder="수정할 이름을 입력해주세요."
                            />
                            <p className="mt-1 text-red-500 text-xs font-normal h-3">
                                {errors.name && '성함을 입력해 주시기 바랍니다.'}
                            </p>
                        </div>
                        <div>
                            <p>{`사용중인 이메일: ${userState.email}`}</p>
                            <input
                                id="email"
                                className="border border-gray-400 rounded px-2 py-1 w-96"
                                {...register("email", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 70,
                                    pattern: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
                                })}
                                placeholder="변경할 이메일을 입력해주세요."

                            />
                            <p className="mt-1 text-red-500 text-xs font-normal h-3">
                                {errors.email && '이메일을 입력해주시기 바랍니다.'}
                            </p>
                        </div>
                        <div>
                            <p>{`사용중인 휴대전화번호: ${userState.mobile}`}</p>
                            <input
                                id="mobile"
                                className="border border-gray-400 rounded px-2 py-1 w-96"
                                {...register("mobile",
                                    {
                                        required: true,
                                        minLength: 13
                                    })}
                                type="text"
                                value={userState.mobile}
                                placeholder="휴대폰번호를 입력해주세요."
                                onInput={(e) => {
                                    let val = e.currentTarget.value.substring(0, 13).replace(/[^0-9]/g, '')
                                        // eslint-disable-next-line
                                        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
                                    setValue("mobile", val);
                                }}
                            />
                            <p className="mt-1 text-red-500 text-xs font-normal h-3">
                                {errors.mobile && '휴대전화번호를 입력해주세요.'}
                            </p>
                        </div>
                        <span></span>
                        <div>
                            <h1>비밀번호 수정</h1>
                            <input
                                id="password"
                                className="border border-gray-400 rounded px-2 py-1 w-96"
                                {...register("password", { maxLength: 24, required: false })}
                                type={ PwShow ? "text" : "password" }
                                placeholder="수정할 비밀번호를 입력해주세요."
                            />
                            <div className="flex justify-between w-96">
                                <p className="mt-1 text-red-500 text-xs font-normal h-3">
                                    {errors.password && '비밀번호는 최소 8자 이상입니다.'}
                                </p>
                                <span onClick={()=>{setPwShow(!PwShow)}} className='cursor-pointer h-3 text-xs bg-gray-400 h-fit text-gray-100 px-2 mr-1'>
                                    { PwShow ? "비밀번호 숨김" : "비밀번호 확인" }
                                </span>
                            </div>
                            <h1>비밀번호 수정 재확인</h1>
                            <input
                                id="passwordConfirm"
                                className="border border-gray-400 rounded px-2 py-1 w-96"
                                {...register("passwordConfirm", {
                                    validate: value => value === password || value === ''
                                    , required: false
                                })}
                                type={ PwConfirmShow ? "text" : "password" }
                                placeholder="비밀번호를 다시 한번 입력해주세요."
                            />
                            <div className="flex justify-between w-96">
                                <p className="mt-1 text-red-500 text-xs font-normal h-3">
                                    {errors.passwordConfirm && '비밀번호가 동일하지 않습니다.'}
                                </p>
                                <span onClick={()=>{setPwConfirmShow(!PwConfirmShow)}} className='cursor-pointer h-3 text-xs bg-gray-400 h-fit text-gray-100 px-2 mr-1'>
                                    { PwConfirmShow ? "비밀번호 숨김" : "비밀번호 확인" }
                                </span>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="border-8 border-sky-300 bg-sky-200 w-96 text-center mt-10">정보 수정하기</button>
                </form>
            </div>
        )
    )
};