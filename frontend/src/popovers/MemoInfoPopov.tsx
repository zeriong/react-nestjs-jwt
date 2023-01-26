import React from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import {FaUserCircle} from "@react-icons/all-files/fa/FaUserCircle";
import {BiChevronDown} from "@react-icons/all-files/bi/BiChevronDown";
import {GrLogout} from "@react-icons/all-files/gr/GrLogout";
import {FaRegIdCard} from "@react-icons/all-files/fa/FaRegIdCard";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../store";

const solutions = [
    {
        name: '나의 회원정보',
        icon: FaRegIdCard,
    },
    {
        name: '로그아웃',
        icon: GrLogout,
    },
]

export default function MemoInfoPopov() {
    const { data: { name } } = useSelector((state: RootState) => (state.user));

    return (
        <div className="w-auto max-w-sm">
            <Popover className="relative">
                {({ open, close }) => (
                    <>
                        <Popover.Button
                            className={`
                ${open ? '' : 'text-opacity-90'}
                group inline-flex items-center rounded-md px-2 py-2 border border-gray-200 bg-white text-base font-medium text-white hover:text-opacity-100`}
                        >
                            <FaUserCircle size="30" color="9f9f9f" className="bg-white rounded-full"/>
                            <BiChevronDown
                                className={`${open ? '' : 'text-opacity-70'}
                  ml-1 h-5 w-5 text-[#5f5f5f] transition duration-150 ease-in-out group-hover:text-opacity-80`}
                                aria-hidden="true"
                            />
                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel className="absolute z-10 mt-3 w-[180px] right-0 px-0 lg:max-w-lg max-md:w-[160px]">
                                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div className="relative bg-white p-3">
                                        <div className="text-lg font-medium text-gray-900 p-1 mb-1 cursor-default">
                                            {`${name}님 😊`}
                                        </div>
                                        {solutions.map((item) => (
                                            <Link
                                                to={`${item.name === '나의 회원정보' ? 'profile' : '/'}`}
                                                onClick={close}
                                                key={item.name}
                                                className=" flex items-center rounded-lg h-12 transition duration-150 ease-in-out hover:bg-orange-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 whitespace-nowrap"
                                            >
                                                <div className="flex h-8 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                                                    <item.icon aria-hidden="true" size="20" color="#2f2f2f" />
                                                </div>
                                                <div className="ml-2">
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {item.name}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        </div>
    )
}
