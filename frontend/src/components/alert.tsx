import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState, store} from "../store";
import {DELETE_ALERT, IAlertObject} from "../store/slices/alert.slice";

export const Alert = () => {
    const { alerts } = useSelector((state:RootState) => state.alert);
    const [alert, setAlert] = useState<IAlertObject>({type: "", message: ""});
    const [isShow, setIsShow] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const alarm = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();

    const showAlert = () => {
        console.log('접근!', store.getState().alert.alerts.length)
        if (!isRunning && store.getState().alert.alerts.length > 0) {
            console.log('실행!')
            setIsRunning(true)
            setAlert(store.getState().alert.alerts[store.getState().alert.alerts.length - 1])
            setIsShow(true)
            setTimeout(() => {
                setIsShow(false)
                setTimeout(() => {
                    console.log('종료!')
                    //setShow(false)
                    dispatch(DELETE_ALERT())
                    setIsRunning(false)
                    showAlert()
                }, 300);
            }, 3000);
        }
    }

    useEffect(() => {
        showAlert()
    }, [alerts]);

    const color = ():string => {
        if (alert.type === "alarm") {return "bg-orange-100"}
        if (alert.type === "success") {return "bg-green-500"}
        if (alert.type === "error") {return "bg-red-200"}
    };
//`${color()} flex absolute w-[200px] h-50 z-50 left-1/2 -translate-x-1/2 top-12`
    return (
        <div
            className={`${color()}
            bg-sky-200 flex items-center justify-center absolute w-auto h-10 px-3 z-20
            top-10 rounded-lg transition-all duration-300 ease-in-out ${isShow ? "top-[88px] opacity-100" : "opacity-0"}`}
            ref={alarm}
        >
            <div className={`w-full font-bold text-gray-700 ${color() === "bg-green-500" ? "text-white" : ""}`}>
                <span>{alert.message}</span>
            </div>
        </div>
    )
}