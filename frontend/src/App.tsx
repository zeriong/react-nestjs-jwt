import React, {useEffect} from "react";
import { Index } from "./router";
import {refresh} from "./hooks/useAxios";
import {useDispatch} from "react-redux";
import {DELETE_TOKEN, SET_TOKEN} from "./store/slices/auth";

function App() {
    const dispatch = useDispatch();
    useEffect( ()=> {
        console.log('gd');
        (async () => {
            const accessToken = await refresh();
            if (accessToken) {
                dispatch(SET_TOKEN(accessToken));
            } else { dispatch(DELETE_TOKEN) }
        })()
    },[dispatch])

    return (
        <>
            <Index/>
        </>
    );
}

export default App;
