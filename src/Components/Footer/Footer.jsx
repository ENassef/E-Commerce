import React from "react";
import amazon from '../../assets/images/amazon-pay.png';
import american from '../../assets/images/American-Express-Color.png';
import paypal from '../../assets/images/paypal.png';
import master from '../../assets/images/mastercard.webp';
import googlePlay from '../../assets/images/get-google-play.png';
import apple from '../../assets/images/get-apple-store.png';

export default function Footer() {
    return (
        <footer className="w-full py-8 mt-6 bg-light-color">
            <div className="container mx-auto px-4 space-y-6 md:space-y-8">
                {/* Title */}
                <div className="space-y-2 text-center md:text-left">
                    <h2 className="text-2xl md:text-3xl font-extralight">
                        get the freshCart app
                    </h2>
                    <p className="text-gray-500 text-base md:text-lg">
                        we will send a link, open it on your phone to download the app
                    </p>
                </div>

                {/* Input */}
                <div className="flex flex-col md:flex-row gap-4 pb-8">
                    <input 
                        type="email" 
                        className="px-4 py-3 md:py-2 w-full md:w-auto flex-grow bg-white rounded-xl border border-black" 
                        placeholder="Email"
                    />
                    <button className="py-3 px-6 bg-maincolor cursor-pointer rounded-2xl text-base md:text-lg text-white capitalize tracking-wider md:tracking-widest whitespace-nowrap">
                        share app link
                    </button>
                </div>

                {/* Payment & Download */}
                <div className="flex flex-col md:flex-row justify-between gap-6 border-t border-b border-gray-300 py-8">
                    {/* payment */}
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <p className="text-lg md:text-xl font-light text-gray-600 whitespace-nowrap">
                            payments partners
                        </p>
                        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                            <img src={amazon} alt="Amazon Pay" className="w-12 md:w-16 h-auto"/>
                            <img src={american} alt="American Express" className="w-12 md:w-16 h-auto"/>
                            <img src={master} alt="Mastercard" className="w-12 md:w-16 h-auto"/>
                            <img src={paypal} alt="Paypal" className="w-12 md:w-16 h-auto"/>
                        </div>
                    </div>

                    {/* download */}
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <p className="text-center sm:text-left">
                            get deliveries with freshCart
                        </p>
                        <div className="flex gap-2">
                            <img src={apple} alt="App Store" className="w-28 md:w-32 h-auto cursor-pointer"/>
                            <img src={googlePlay} alt="Google Play" className="w-28 md:w-32 h-auto cursor-pointer"/>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}