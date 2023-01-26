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
import {CheckList} from "./checkList";

const MemoButton = (props: { label: string }) => {
    const [onMouseMemos, setOnMouseMemos] = useState<boolean>(false);

    return (
        <button
            onMouseEnter={() => setOnMouseMemos(true)}
            onMouseLeave={() => setOnMouseMemos(false)}
            className={`${onMouseMemos ? "font-bold border-orange-400" : "font-normal border-gray-200"}
                                    relative flex justify-center items-center bg-transparent border-l-2 h-10 overflow-hidden transition-all duration-200`}
        >
            <div
                className={`${onMouseMemos ? "left-0" : "-left-[240px]"}
                                        relative h-full w-full bg-orange-100  transition-all duration-200`}
            />
            <span className="absolute text-ellipsis whitespace-nowrap overflow-hidden w-[200px] text-start pl-4">{props.label}</span>
        </button>
    )
}

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

    return (
        <>
            <section
                className={`${showMenu ? "opacity-50 visible" : "opacity-0 invisible"}
                    z-10 w-full h-full left-0 top-0 fixed bg-black opacity-0 hidden max-md:block ease-in-out duration-300`}
                onClick={toggleMenu}
            />
            <nav
                className={`${showMenu ? "left-0" : "-left-asideWidth"}
            fixed w-asideWidth bg-white z-20 ease-in-out duration-300 left-0 pt-headerHeight shadow-xl shadow-gray-300 h-full overflow-auto scroll-hidden`}
            >
                <div className="flex flex-col h-full w-full py-8 min-h-[820px]">
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
                        <div className="flex flex-col grow w-auto bg-white pb-5">
                            <div
                                className="flex justify-start items-center w-full rounded-lg text-lg transition-all duration-150 h-[50px] pl-2 cursor-default"
                            >
                                <CiMemoPad
                                    size="30"
                                    className="fill-orange-600 ml-[1px] mr-3"/>
                                <span>메모</span>
                            </div>
                            <div className="flex flex-col g-white rounded-lg my-2 h-20 overflow-y-scroll custom-scroll font-normal grow pl-[21px]">
                                <MemoButton label={"메모 라벨"} />
                                <MemoButton label={"읽을 책 메모"} />
                                <MemoButton label={"이메일 메모"} />
                                <MemoButton label={"전화번호 저장소"} />
                                <MemoButton label={"요리 레시피"} />
                            </div>
                        </div>
                        <CheckList/>
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
                            알림 테스트
                        </button>
                    </div>
                </div>
            </nav>
        </>
    )
}