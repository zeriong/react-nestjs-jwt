import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Home} from "../pages/home";
import {UserDetail} from "../pages/userDetail";

export const Index = ()=> {
    return (
        <Router>
            <Routes>
                <Route path={`${process.env.PUBLIC_URL}/`} element={<Home/>}/>
                <Route path={'/userDetail'} element={<UserDetail/>}/>
            </Routes>
        </Router>
    );
};