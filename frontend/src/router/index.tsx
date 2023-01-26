import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Home} from "../pages/intro";
import {MemoLayout} from "../layout/memo";
import {ProfileModify} from "../pages/memo/profileModify";
import {PrivateElement} from "./privateElement";
import {Profile} from "../pages/memo/profile";
import {MemoMain} from "../pages/memo";
import {HomeLayout} from "../layout/intro";
import {Service} from "../pages/intro/service";
import {Guide} from "../pages/intro/guide";
import {PayNotice} from "../pages/intro/paymentNotice";
import {UserExp} from "../pages/intro/userExperience";
import {Notice} from "../pages/intro/notice";
import MemoInfoPopov from "../popovers/MemoInfoPopov";

export const Index = ()=> {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomeLayout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="service" element={<Service/>}/>
                    <Route path="guide" element={<Guide/>}/>
                    <Route path="userExp" element={<UserExp/>}/>
                    <Route path="payNotice" element={<PayNotice/>}/>
                    <Route path="notice" element={<Notice/>}/>
                    <Route path="e" element={<MemoInfoPopov/>}/>
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