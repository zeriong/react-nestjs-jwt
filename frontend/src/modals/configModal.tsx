import React, {useEffect, Fragment, useState, useRef} from "react";
import {useSearchParams} from "react-router-dom";
import {Dialog, Transition } from "@headlessui/react";
import {BsFillGearFill} from "@react-icons/all-files/bs/BsFillGearFill";

export const ConfigModal = () => {
    const [isShow, setIsShow] = useState(false);

    return (
        <>
            <div className="flex w-full justify-center cursor-pointer h-[54px] items-center rounded-lg
                        hover:bg-orange-50 ease-in-out duration-300 hover:border-orange-200 hover:border-2"
                 onClick={ () => { setIsShow(true) } }
            >
                <section className="flex ease-in-out duration-300 hover:scale-110 h-full w-full justify-center items-center">
                    <BsFillGearFill
                        className="cursor-pointer" size="30" color="#f97316"
                    />
                    <span className="ml-3">환경설정</span>
                </section>
            </div>
            <Transition appear show={isShow} as={Fragment}>
                <Dialog as="div" className="relative z-20" onClose={() => setIsShow(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-40" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-lg bg-white p-6 md:p-8 text-left align-middle shadow-xl transition-all">
                                    <div className="text-2xl mb-5 text-center font-bold">
                                        환경설정
                                    </div>
                                    <div className="mb-6 text-lg font-bold text-center">
                                        환경설정 영역
                                    </div>
                                    <div className="w-[160px] flex justify-center cursor-pointer
                                    rounded-2xl p-1 bg-orange-500 text-white m-auto"
                                         onClick={() => setIsShow(false)}
                                    >
                                        저장
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};