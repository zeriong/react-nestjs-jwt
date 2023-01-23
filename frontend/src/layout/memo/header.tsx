import React from "react";
import MemoInfoModal from "../../modals/MemoInfoModal";
import {ConfigModal} from "../../modals/configModal";
import {BsFillGearFill} from "@react-icons/all-files/bs/BsFillGearFill";
import {useSearchParams} from "react-router-dom";

export const Header = () => {
    return (
        <>
            <header className="flex fixed h-[60px] w-full z-10 pl-[260px] bg-transparent">
                <div className="flex justify-end items-center px-5 w-full">
                    <MemoInfoModal/>
                </div>
            </header>
        </>
    )
}