import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/images/freshcart-logo.svg';
import Social from "../Social/Social";
import { AuthContext } from "../../Context/AuthContext";
import { Heart, ShoppingCart, ShoppingCartIcon } from "lucide-react";
import { CartContext } from "../../Context/CartContext";
import { WishContext } from "../../Context/WishContext";




export default function NavBar() {
    const { userToken, logout } = useContext(AuthContext);
    const {userCart } = useContext(CartContext);
    const { wishList, isWishlistEmpty } = useContext(WishContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="font-main top-0 z-50 mb-6 sticky py-4 px-2 sm:py-6 sm:px-3 bg-light-color shadow-main transition-all duration-500 hover:shadow-green-100">
            {/* Desktop Screen */}
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-3 sm:space-x-5">
                    <div id="logo" className="w-fit">
                        <Link to="/" className="flex gap-1 text-black text-2xl sm:text-3xl">
                            <img src={logo} alt="FreshCart Logo" className="h-8 sm:h-10" />
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <ul className="flex font-light tracking-wider text-base sm:text-lg md:text-sm lg:text-lg text-gray-700 space-x-3 sm:space-x-6">
                            {userToken && (
                                <>
                                    <li data-aos="fade-right" data-aos-delay="200">
                                        <Link to="/" className="transition-colors duration-300 ease-in-out hover:text-maincolor">home</Link>
                                    </li>
                                    <li data-aos="fade-right" data-aos-delay="600">
                                        <Link to="/products" className="transition-colors duration-300 ease-in-out hover:text-maincolor">products</Link>
                                    </li>
                                    <li data-aos="fade-right" data-aos-delay="800">
                                        <Link to="/categories" className="transition-colors duration-300 ease-in-out hover:text-maincolor">categories</Link>
                                    </li>
                                    <li data-aos="fade-right" data-aos-delay="1000">
                                        <Link to="/brands" className="transition-colors duration-300 ease-in-out hover:text-maincolor">brands</Link>
                                    </li>
                                    <li data-aos="fade-right" data-aos-delay="1000">
                                        <Link to="/allorders" className="transition-colors duration-300 ease-in-out hover:text-maincolor">orders</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
                <div className="flex items-center space-x-8 sm:space-x-3">
                    <Link to={'/myWishList'} ><Heart  className={isWishlistEmpty != 0 ? "fill-maincolor stroke-maincolor mr-2 hover:fill-green-400 hover:stroke-green-400 hover:animate-shake" : 'mr-2'}/></Link>
                    <Link to={'/cart'} className="relative">
                        <ShoppingCartIcon className="fill-green-300 stroke-maincolor"/>
                        {userCart ? <span className="absolute -top-2/3 -left-2/3 rounded-[50%] bg-green-400 p-1 px-2 text-white text-sm ">
                            {userCart?.numOfCartItems}
                        </span> : ''}
                        
                    </Link> 
                    <div id="social" className="hidden md:block">
                        <Social/>
                    </div>
                    <div className="hidden md:flex space-x-2 sm:space-x-3 text-base sm:text-lg font-extralight text-gray-700 tracking-wide">
                        {userToken ? (
                            <Link onClick={() => logout()} className="transition-colors duration-300 ease-in-out hover:text-maincolor">Logout</Link>
                        ) : (
                            <>
                                <Link to="/login" className="transition-colors duration-300 ease-in-out hover:text-maincolor">login</Link>
                                <Link to="/register" className="transition-colors duration-300 ease-in-out hover:text-maincolor">register</Link>
                            </>
                        )}
                    </div>
                    <button
                        className="md:hidden text-gray-600 focus:outline-none transition-transform duration-300 ease-in-out"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <svg className="w-7 h-7 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                            />
                        </svg>
                    </button>
                </div>
            </div>
            {/* Mobile Menu */}
            <div
                className={`md:hidden bg-light-color overflow-hidden transition-all duration-500 ease-in-out ${
                    isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <ul className="flex flex-col px-4 sm:px-6 items-start font-light tracking-wider text-base sm:text-lg text-gray-600 space-y-4 sm:space-y-6 py-3 sm:py-4 mt-2 sm:mt-4">
                    {userToken && (
                        <>
                            <li data-aos="fade-right" data-aos-delay="200">
                                <Link to="/" onClick={toggleMenu} className="transition-colors duration-300 ease-in-out hover:text-maincolor">home</Link>
                            </li>
                            <li data-aos="fade-right" data-aos-delay="600">
                                <Link to="/products" onClick={toggleMenu} className="transition-colors duration-300 ease-in-out hover:text-maincolor">products</Link>
                            </li>
                            <li data-aos="fade-right" data-aos-delay="800">
                                <Link to="/categories" onClick={toggleMenu} className="transition-colors duration-300 ease-in-out hover:text-maincolor">categories</Link>
                            </li>
                            <li data-aos="fade-right" data-aos-delay="1000">
                                <Link to="/brands" onClick={toggleMenu} className="transition-colors duration-300 ease-in-out hover:text-maincolor">brands</Link>
                            </li>
                            <li data-aos="fade-right" data-aos-delay="1000">
                                <Link to="/allorders" className="transition-colors duration-300 ease-in-out hover:text-maincolor">orders</Link>
                            </li>
                        </>
                    )}
                    <li className="self-center" >
                        <div id="social" className="flex justify-center">
                            <Social />
                        </div>
                    </li>
                    <li className="flex flex-col self-center items-center space-y-3 sm:space-y-4 text-base sm:text-lg font-extralight text-gray-700 tracking-wide">
                        {userToken ? (
                            <Link onClick={() => { logout(); toggleMenu(); }} className="transition-colors duration-300 ease-in-out hover:text-maincolor">Logout</Link>
                        ) : (
                            <>
                                <Link to="/login" onClick={toggleMenu} className="transition-colors duration-300 ease-in-out hover:text-maincolor">login</Link>
                                <Link to="/register" onClick={toggleMenu} className="transition-colors duration-300 ease-in-out hover:text-maincolor">register</Link>
                            </>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
}