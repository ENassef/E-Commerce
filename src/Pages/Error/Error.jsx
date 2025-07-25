import React from "react";
import error from "../../assets/images/error.svg";
import { Helmet } from "react-helmet";
export default function Error() {
    return (
        <>
            <Helmet>
                <title>Page Not Found</title>
                <meta
                    name="description"
                    content="Welcome to our AllOrders page! Here, you'll find an extensive range of high-quality items carefully curated for your shopping pleasure."
                />
            </Helmet>
            <div className="w-screen h-full flex justify-center items-center py-4">
                <img src={error} alt="" className="w-1/2" />
            </div>
        </>
    );
}
