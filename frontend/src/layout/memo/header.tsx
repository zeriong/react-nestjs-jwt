import React, {useEffect, useRef, useState} from "react";
import {BsFillGearFill} from "@react-icons/all-files/bs/BsFillGearFill";
import {AiFillBell} from "@react-icons/all-files/ai/AiFillBell";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {FaUserCircle} from "@react-icons/all-files/fa/FaUserCircle";
import {BiChevronDown} from "@react-icons/all-files/bi/BiChevronDown";
import {GrUserSettings} from "@react-icons/all-files/gr/GrUserSettings";
import {BiLogOut} from "@react-icons/all-files/bi/BiLogOut";

export const Header = () => {
    const { data: userState } = useSelector((state: RootState) => (state.user));

    const el = useRef<HTMLDivElement>(null);
    const [isOpen, setOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = ({target}): void => {
            if (!el.current.contains(target as Node)) {
                if (isOpen) {
                    setOpen(true);
                } else {
                    setOpen(false);
                }
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    },[])

    return (
        <>
            <header className="flex fixed h-[60px] w-full border-b-[1px] z-10 pl-[240px] bg-white">
                <div className="flex justify-between items-center px-5 w-full">
                    <div className="flex flex-row items-center">
                        <BsFillGearFill size="24" color="#9f9f9f" className="mr-1"/>
                        <div className="font-bold text-gray-700 text-[18px]">설정</div>
                    </div>
                    <div className="flex flex-row items-center relative"
                         onClick={ ()=> setOpen(true) }
                    >
                        <FaUserCircle size="30" color="9f9f9f" className=""/>
                        <div className="text-[#5f5f5f] flex cursor-pointer">
                            <BiChevronDown className="mt-1"/>
                        </div>
                        {
                            isOpen && (
                                <div
                                    className="flex flex-col items-center p-5 absolute bg-orange-100 w-[130px] top-9 -left-20
                                    transition-all ease-in-out duration-300 hover:bg-orange-500 rounded-2xl"
                                    ref={el}
                                >
                                    <div className="flex mb-1 justify-items-center h-7">
                                        <GrUserSettings size="15" className="flex h-full"/>
                                        <div className="flex items-center ml-1 h-full">회원정보</div>
                                    </div>
                                    <div className="flex justify-items-center h-7">
                                        <BiLogOut size="18" className="flex h-full"/>
                                        <div className="flex items-center ml-1 h-full">로그아웃</div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </header>
        </>
    )
}