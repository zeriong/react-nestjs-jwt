import React, {useEffect} from "react";
import { Index } from "./router";
import {refresh} from "./hooks/useAxios";
import {useDispatch} from "react-redux";
import {DELETE_TOKEN, SET_TOKEN} from "./store/slices/token.slice";
import {setProfile} from "./store/slices/profile.slice";
import {AppDispatch} from "./store";

function App() {
    const dispatch = useDispatch<AppDispatch>();
    useEffect( ()=> {
        console.log('gd');
        (async () => {
            const accessToken = await refresh();
            if (accessToken) {
                dispatch(SET_TOKEN(accessToken));
                console.log('토큰',accessToken);
                dispatch(await setProfile());
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
