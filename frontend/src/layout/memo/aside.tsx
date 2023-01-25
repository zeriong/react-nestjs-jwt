import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {BiPencil} from "@react-icons/all-files/bi/BiPencil";
import {useDispatch, useSelector} from "react-redux";
import {SET_ALERT} from "../../store/slices/alert.slice";
import {RootState} from "../../store";
import {ConfigModal} from "../../modals/configModal";
import {SET_SHOW_MENU, TOGGLE_SHOW_MENU} from "../../store/slices/changedMenu.slice";
import {GiHamburgerMenu} from "@react-icons/all-files/gi/GiHamburgerMenu";
import {BiGridSmall} from "@react-icons/all-files/bi/BiGridSmall";
import {MdLabelImportant} from "react-icons/md";
import {CiMemoPad} from "react-icons/ci";

export const Aside = () => {
    const dispatch = useDispatch();
    const { alerts } = useSelector((state: RootState) => state.alert);
    const { showMenu } = useSelector((state: RootState) => (state.changedMenu));

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 767) {
                dispatch(SET_SHOW_MENU(true));
            } else {
                dispatch(SET_SHOW_MENU(false));
            }
        }
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [dispatch])

    const toggleMenu = () => {
        dispatch(TOGGLE_SHOW_MENU());
    }

    const [onMouseImportant, setOnMouseImportant] = useState(false);
    const [onMouseAllShow, setOnMouseAllShow] = useState(false);

    /** 예시로 해두었지만 실제론 map을 통해서 반복 */
    const [onMouseMemos, setOnMouseMemos] = useState(false);
    const [onMouseMemos1, setOnMouseMemos1] = useState(false);
    const [onMouseMemos2, setOnMouseMemos2] = useState(false);
    const [onMouseMemos3, setOnMouseMemos3] = useState(false);

    return (
        <>
            <section
                className={`${showMenu ? "opacity-50 visible" : "opacity-0 invisible"}
                    z-10 w-full h-full left-0 top-0 fixed bg-black opacity-0 hidden max-md:block ease-in-out duration-300`}
                onClick={toggleMenu}
            />
            <nav
                className={`${showMenu ? "left-0" : "-left-full"}
            fixed w-[300px] bg-white z-20 ease-in-out duration-300 left-0 pt-[60px] shadow-xl shadow-gray-300 h-full overflow-auto`}
            >
                <div className="flex flex-col h-full w-full py-8 min-h-[520px]">
                    <div className="flex flex-col h-full justify-center text-center px-5 text-xl font-bold text-gray-800 tracking-wider">
                        <Link
                            to="/memo"
                            onMouseEnter={() => setOnMouseAllShow(true)}
                            onMouseLeave={() => setOnMouseAllShow(false)}
                            className={`${onMouseAllShow ? "bg-orange-100" : ""} flex justify-start items-center w-full rounded-lg mb-2 text-lg transition-all duration-150 h-[50px]`}
                        >
                            <BiGridSmall
                                size="50"
                                className={`${onMouseAllShow ? "" : ""} w-auto fill-orange-500`}
                            />
                            <span>전체보기</span>
                        </Link>
                        <Link
                            to="/memo"
                            onMouseEnter={() => setOnMouseImportant(true)}
                            onMouseLeave={() => setOnMouseImportant(false)}
                            className={`${onMouseImportant ? "bg-orange-100" : ""} flex justify-start items-center w-full rounded-lg mb-2 text-lg transition-all duration-150 h-[50px] pl-2`}
                        >
                            <MdLabelImportant
                                size="32"
                                className={`${onMouseImportant ? "" : ""} w-auto mr-[10px] fill-orange-500`}
                            />
                            <span>중요메모</span>
                        </Link>
                        <div className="flex flex-col grow py-3 w-auto bg-white mt-5 py-5">
                            <div
                                className="flex justify-start items-center w-full rounded-lg mb-2 text-lg transition-all duration-150 h-auto pl-2"
                            >
                                <CiMemoPad
                                    size="30"
                                    className="fill-orange-600 ml-[1px] mr-3"/>
                                <span>메모</span>
                            </div>
                            <div className="flex flex-col g-white rounded-lg my-2 h-20 overflow-y-scroll custom-scroll font-normal grow pl-4">
                                <button
                                    onMouseEnter={() => setOnMouseMemos(true)}
                                    onMouseLeave={() => setOnMouseMemos(false)}
                                    className={`${onMouseMemos ? "font-bold border-orange-400" : "font-normal border-orange-200"}
                                    relative flex justify-center items-center bg-transparent border-l-4 h-10 overflow-hidden transition-all duration-200`}
                                >
                                    <div
                                        className={`${onMouseMemos ? "left-0" : "-left-[240px]"}
                                        relative h-full w-full bg-orange-100  transition-all duration-200`}
                                    />
                                    <span className="absolute text-ellipsis whitespace-nowrap overflow-hidden w-[200px]">가족 및 친구 생일</span>
                                </button>
                                <button
                                    onMouseEnter={() => setOnMouseMemos1(true)}
                                    onMouseLeave={() => setOnMouseMemos1(false)}
                                    className={`${onMouseMemos1 ? "font-bold border-orange-400" : "font-normal border-orange-200"}
                                    relative flex justify-center items-center bg-transparent border-l-4 h-10 overflow-hidden transition-all duration-200`}
                                >
                                    <div
                                        className={`${onMouseMemos1 ? "left-0" : "-left-[240px]"}
                                        relative h-full w-full bg-orange-100  transition-all duration-200`}
                                    />
                                    <span className="absolute text-ellipsis whitespace-nowrap overflow-hidden w-[200px]">요리 레시피</span>
                                </button>
                                <button
                                    onMouseEnter={() => setOnMouseMemos2(true)}
                                    onMouseLeave={() => setOnMouseMemos2(false)}
                                    className={`${onMouseMemos2 ? "font-bold border-orange-400" : "font-normal border-orange-200"}
                                    relative flex justify-center items-center bg-transparent border-l-4 h-10 overflow-hidden transition-all duration-200`}
                                >
                                    <div
                                        className={`${onMouseMemos2 ? "left-0" : "-left-[240px]"}
                                        relative h-full w-full bg-orange-100  transition-all duration-200`}
                                    />
                                    <span className="absolute text-ellipsis whitespace-nowrap overflow-hidden w-[200px]">이런저런 메모</span>
                                </button>
                                <button
                                    onMouseEnter={() => setOnMouseMemos3(true)}
                                    onMouseLeave={() => setOnMouseMemos3(false)}
                                    className={`${onMouseMemos3 ? "font-bold border-orange-400" : "font-normal border-orange-200"}
                                    relative flex justify-center items-center bg-transparent border-l-4 h-10 overflow-hidden transition-all duration-200`}
                                >
                                    <div
                                        className={`${onMouseMemos3 ? "left-0" : "-left-[240px]"}
                                        relative h-full w-full bg-orange-100  transition-all duration-200`}
                                    />
                                    <span className="absolute text-ellipsis whitespace-nowrap overflow-hidden w-[200px]">이메일 메모 google@google.com</span>
                                </button>
                            </div>
                        </div>
                        <button
                            className="fixed bg-black text-white bottom-0 right-0 p-2"
                            type="button"
                            onClick={
                                () => {
                                    dispatch(
                                        SET_ALERT({type: "success", message:"안녕안녕안녕안녕ㅇㄴ"})
                                    )
                                    console.log(alerts);
                                }
                            }
                        >
                            test button
                        </button>
                        <ConfigModal/>
                        <div
                            className="flex w-full relative justify-center cursor-pointer h-[54px]
                            items-center rounded-lg mt-5 bg-orange-500 text-white font-medium
                            hover:bg-orange-50 ease-in-out duration-300 hover:border-orange-200 hover:border-4
                            hover:text-orange-600 hover:font-extrabold"
                            onClick={toggleMenu}
                        >
                            메뉴 숨기기
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}