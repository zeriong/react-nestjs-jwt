import React, {useRef, useState} from "react"
import {GoChecklist} from "@react-icons/all-files/go/GoChecklist";
import {HiOutlineDotsHorizontal} from "@react-icons/all-files/hi/HiOutlineDotsHorizontal";

const List = (props: { label: string }) => {
    const [onMouseList, setOnMouseList] = useState(false);
    const [onMouseIcon, setOnMouseIcon] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const checkHandler = (checked) => {
        if (checked) {
            setIsChecked(true)
        } else { setIsChecked(false) }
    }

    return (
        <span
            className="relative flex bg-white overflow-visible font-normal py-2 border-b"
            onMouseEnter={() => {setOnMouseList(true)}}
            onMouseLeave={() => {setOnMouseList(false)}}
        >
                         <input
                             type="checkbox"
                             className="items-start bg-orange-500 h-full m-2"
                             onChange={(e) => {
                                 checkHandler(e.currentTarget.checked);
                             }}
                         />
                        <div
                            className={
                                `text-start items-center w-full break-all pr-7
                            ${isChecked ? "line-through text-gray-400" : ""}`}
                        >
                            {props.label}
                        </div>
                        <div className="h-full relative w-auto">
                            <button
                                type="button"
                                onMouseEnter={() => {setOnMouseIcon(true)}}
                                onMouseLeave={() => {setOnMouseIcon(false)}}
                                className={`absolute rounded-full bg-transparent h-auto right-2 top-[5px]
                                ${onMouseList ? "visible" : "invisible"} ${onMouseIcon ? "bg-gray-300" : ""}`}
                            >
                                <HiOutlineDotsHorizontal size="20" color="2f2f2f"/>
                            </button>
                        </div>
                    </span>
    )
}

export const CheckList = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);

    const [onMouseList, setOnMouseList] = useState(false);
    const [onMouseIcon, setOnMouseIcon] = useState(false);

    const checkHandler = (checked) => {
        if (checked) {
            setIsChecked(true)
        } else { setIsChecked(false) }
    }
    const checkHandler1 = (checked) => {
        if (checked) {
            setIsChecked1(true)
        } else { setIsChecked1(false) }
    }
    const checkHandler2 = (checked) => {
        if (checked) {
            setIsChecked2(true)
        } else { setIsChecked2(false) }
    }

    const onSubmit = (e) => {
        e.target.defaultPrevented();
    }

    return (
        <>
            <form
                className="bg-orange-100 h-auto rounded-xl p-3 shadow-md"
                onSubmit={onSubmit}
            >
                <div className="flex justify-start px-4 pb-2 cursor-default text-lg">
                    <GoChecklist
                        size="30"
                        className="fill-orange-500 mr-1"
                    />
                    <span>체크리스트</span>
                </div>
                <div className="rounded-lg w-full overflow-auto max-h-[200px] custom-scroll cursor-default text-black text-[16px] whitespace-normal">
                    <List label="긴메모를 예시로 들기 1번째"/>
                    <List label="예시메모1"/>
                    <List label="메 모 예 시 2"/>
                    <List label="긴메모를 예시로 들기 2번째 더 길게 메모해보기"/>
                </div>
                <input
                    type="text"
                    className="w-full p-2 text-sm rounded-lg mt-5 font-normal border shadow-md cursor-pointer transition-all
                    bg-orange-500 border-transparent
                    placeholder-white placeholder:font-bold placeholder:text-center
                    focus:bg-white focus:border focus:border-gray-300 focus:placeholder-gray-400 duration-300 focus:cursor-text"
                    placeholder="체크리스트 추가하기 !"
                />
            </form>
        </>
    )
}