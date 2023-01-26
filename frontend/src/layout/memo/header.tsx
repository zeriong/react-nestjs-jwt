import React, {useState} from "react";
import MemoInfoPopov from "../../popovers/MemoInfoPopov";
import {useDispatch, useSelector} from "react-redux";
import {BiPencil} from "@react-icons/all-files/bi/BiPencil";
import {Link} from "react-router-dom";
import {GiHamburgerMenu} from "@react-icons/all-files/gi/GiHamburgerMenu";
import {TOGGLE_SHOW_MENU} from "../../store/slices/changedMenu.slice";

export const Header = () => {
    const [onMouseTitle, setOnMouseTitle] = useState(false);
    const dispatch = useDispatch();

    const toggleMenu = () => {
        dispatch(TOGGLE_SHOW_MENU());
    }

    return (
        <>
            <header
                className="flex fixed h-[60px] items-center w-full z-30 ease-in-out duration-300 bg-white border-b border-gray-300"
            >
                <div className="flex relative items-center px-3 w-full">
                    <button
                        type="button"
                        className="bg-white p-[6px] rounded-lg border border-gray-200 ease-in-out duration-300 z-10 mr-10"
                        onClick={toggleMenu}
                    >
                        <GiHamburgerMenu size="24" color="#f97316"/>
                    </button>
                    <Link
                        to="/memo"
                        onMouseEnter={() => setOnMouseTitle(true)}
                        onMouseLeave={() => setOnMouseTitle(false)}
                        className={`${onMouseTitle ? "scale-110 text-orange-500" : ""} 
                            flex relative justify-start items-center text-2xl font-extrabold transition-all duration-300 h-full bottom-[2px]`}
                    >
                        Zeriong Keep
                        <BiPencil
                            size="24"
                            className={`${onMouseTitle ? "fill-orange-500 rotate-[360deg] scale-110" : "fill-gray-800"} relative transition-all duration-300 top-1 ml-1`}
                        />
                    </Link>
                    <div className="absolute right-3">
                        <MemoInfoPopov/>
                    </div>
                </div>
            </header>
        </>
    )
}