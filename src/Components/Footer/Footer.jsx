import React from "react";
import amazon from '../../assets/images/amazon-pay.png'
import american from '../../assets/images/American-Express-Color.png'
import paypal from '../../assets/images/paypal.png'
import master from '../../assets/images/mastercard.webp'
import googlePlay from '../../assets/images/get-google-play.png'
import apple from '../../assets/images/get-apple-store.png'
export default function () {
    return (
        <>
            <footer className=" w-screen py-8 mt-6 bg-light-color">
                <div className="container space-y-3">
                    {/* Title */}
                    <div className="space-y-2">
                        <h2 className="text-3xl font-extralight">
                            get the freshCart app
                        </h2>
                        <p className="text-gray-500 text-lg">
                            we will send a link , open it on your phone to
                            download the app
                        </p>
                    </div>

                    {/* Input */}
                    <div className="flex space-x-6 pb-8" >
                        <input type="email" className="px-3 grow bg-white rounded-xl border border-black " placeholder="Email"/>
                        <button className="py-3 px-6 bg-maincolor cursor-pointer rounded-2xl text-lg text-white capitalize tracking-widest">share app link</button>
                    </div>

                    {/* Payment & Download  */}
                    <div className="flex justify-between border-y-1 border-gray-300 py-8">
                        {/* payment */}
                        <div className="flex items-center space-x-3">
                            <p className="text-xl font-light text-gray-600">payments partners </p>
                            <img src={amazon} alt=""  className="w-16"/>
                            <img src={american} alt=""  className="w-16"/>
                            <img src={master} alt=""  className="w-16"/>
                            <img src={paypal} alt=""  className="w-16"/>
                        </div>

                        {/* download */}
                        <div className="flex items-center space-x-2">
                            <p>get deliveries with freshCart </p>
                            <img src={apple} alt="" className="w-32 cursor-pointer"/>
                            <img src={googlePlay} alt="" className="w-32 cursor-pointer"/>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
