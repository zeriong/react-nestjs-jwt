import React from "react";
import {Link} from "react-router-dom";
import {ConfigModal} from "../../modals/configModal";
import {BiPencil} from "@react-icons/all-files/bi/BiPencil";

export const Aside = () => {
    return (
        <nav className="fixed w-[260px] bg-white h-full z-20">
            <div className="flex flex-col h-full w-full py-8 shadow-xl">
                <div className="flex flex-col justify-center text-center px-5 text-2xl font-bold text-gray-800 tracking-widest">
                    <span className="flex justify-center items-center text-lg font-extrabold mb-8">
                        Zeriong Keep!
                        <BiPencil size="20"/>
                    </span>
                    <Link to="/memo" className="py-3 w-full bg-orange-100 rounded-lg mb-8">
                        대시보드
                    </Link>
                    <div className="py-3 w-full bg-orange-100 rounded-lg mb-8 p-2">
                        <Link to="" className="">
                            중요메모
                        </Link>
                        <div className="bg-orange-500">
                            <h1>생일메모</h1>
                            <h1>이메일메모</h1>
                            <h1>중요한메모1</h1>
                            <h1>중요한메모2</h1>
                        </div>
                    </div>
                    <div>
                        <Link to="" className="py-3 w-full">
                            카테고리
                        </Link>
                        <div className="bg-orange-500">
                            <h1>요리메모</h1>
                            <h1>개발메모</h1>
                            <h1>생일메모</h1>
                            <h1>이메일메모</h1>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}