import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Home} from "../pages/home";
import {Profile} from "../pages/profile";
import {ProfileModify} from "../pages/profileModify";
import {PrivateElement} from "./privateElement";
import {store} from "../store";

export const Index = ()=> {
    const isLoggedIn = store.getState().auth.data.isLoggedIn;
    return (
        <Router>
            <Routes>
                <Route path={`${process.env.PUBLIC_URL}/`} element={<Home/>}/>
                <Route element={<PrivateElement isLoggedIn={isLoggedIn}/>}>
                    <Route path={'profile'} element={<Profile/>}/>
                    <Route path={'profile/modify'} element={<ProfileModify/>}/>
                </Route>
            </Routes>
        </Router>
    );
};