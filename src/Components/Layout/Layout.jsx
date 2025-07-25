import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

export default function Layout() {
    return (
        <>
                <main className="flex flex-col min-h-screen max-w-screen">
                    <NavBar />
                    <div className="grow">
                        <Outlet />
                    </div>
                    <Footer />
                </main>
        </>
    );
}
