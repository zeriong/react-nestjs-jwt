import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Home} from "../pages/intro";
import {MemoLayout} from "../layout/memo";
import {ProfileModify} from "../pages/memo/profileModify";
import {PrivateElement} from "./privateElement";
import {Profile} from "../pages/memo/profile";
import {MemoMain} from "../pages/memo";
import {HomeLayout} from "../layout/intro";

export const Index = ()=> {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomeLayout/>}>
                    <Route index element={<Home/>}/>
                </Route>

                <Route path="/memo/*" element={<PrivateElement><MemoLayout/></PrivateElement>}>
                    <Route index element={<MemoMain/>}/>
                    <Route path="profile" element={<Profile/>}/>
                    <Route path="profile/modify" element={<ProfileModify/>}/>
                </Route>
            </Routes>
        </Router>
    );
};