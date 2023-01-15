import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Home} from "../pages/home";
import {Dashboard} from "../pages/layout/dashboard";
import {ProfileModify} from "../pages/profileModify";
import {PrivateElement} from "./privateElement";
import {Profile} from "../pages/profile";
import {DashboardMain} from "../pages/layout/dashboardMain";

export const Index = ()=> {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/dashboard/*" element={<PrivateElement><Dashboard/></PrivateElement>}>
                    <Route index element={<DashboardMain/>}/>
                    <Route path="profile" element={<Profile/>}/>
                    <Route path="profileModify" element={<ProfileModify/>}/>
                </Route>
            </Routes>
        </Router>
    );
};