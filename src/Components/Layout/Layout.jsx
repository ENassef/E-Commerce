import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import Loading from "../Loading/Loading";
import { Offline, Online } from "react-detect-offline";
import MyOffline from "./../MyOffline/MyOffline";
export default function Layout() {
    return (
        <>
            <Online>
                <main className="flex flex-col min-h-screen max-w-screen">
                    <NavBar />
                    <div className="grow">
                        {/* <Loading/> */}
                        <Outlet />
                    </div>
                    <Footer />
                </main>
            </Online>
            <Offline>
                <div className="container relative pt-[80px] pb-[320px] max-md:pb-[380px]">
                    <MyOffline />
                </div>
            </Offline>
        </>
    );
}
