import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Loading from "../../Components/Loading/Loading";
import { LoaderCircle } from "lucide-react";
import { Helmet } from "react-helmet";

export default function Login() {
    let { setUserToken } = useContext(AuthContext);

    let [loading, setLoading] = useState(false);

    let [btnStatus, setBtnStatus] = useState(false);

    let nevigate = useNavigate();

    const handleLogin = async (values) => {
        setBtnStatus(true);
        setLoading(true);
        try {
            const { data } = await axios.post(
                "https://ecommerce.routemisr.com/api/v1/auth/signin",
                values
            );
            if (data?.token) {
                localStorage.setItem("token", data.token);
                setUserToken(data.token);
                setTimeout(() => {
                    nevigate("/"); // Use navigate function to redirect
                }, 200);
                console.log(data);
            }
        } catch (err) {
            console.error("Login error:", err);
            toast.error(err.response.data.message);
        } finally {
            setLoading(false);
            setBtnStatus(false);
        }
    };

    let formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: handleLogin,
    });

    return (
        <>
            <Helmet>
                <title>Login</title>
                <meta
                    name="description"
                    content="Welcome to our AllOrders page! Here, you'll find an extensive range of high-quality items carefully curated for your shopping pleasure."
                />
            </Helmet>
            <div>
                <div className="w-2/3 mx-auto space-y-4 pt-12 italic ">
                    <h1 className="text-maincolor text-2xl ">Login</h1>
                    <div>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="flex flex-col gap-8">
                                {/* Email input */}
                                <div className="relative h-14">
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        className="w-full h-full px-3 py-2 border border-gray-300 rounded-lg peer focus:outline-none focus:border-maincolor "
                                        placeholder=" "
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        required
                                    />
                                    <label
                                        htmlFor="email"
                                        className={` rounded-2xl absolute  text-gray-400
                                        peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-lg peer-focus:text-maincolor
                                        transition-all duration-400 ease-in-out bg-white px-1 peer-focus:px-3 pointer-events-none
                                        ${
                                            formik.values.email == ""
                                                ? `left-3 top-1/2 -translate-y-1/2`
                                                : `top-0 -translate-y-1/2 text-lg text-maincolor px-3 left-3
                                            `
                                        }
                                        `}
                                    >
                                        Email
                                    </label>
                                </div>

                                {/* password input */}
                                <div className="relative h-14">
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="w-full h-full px-3 py-2 border border-gray-300 rounded-lg peer focus:outline-none focus:border-maincolor "
                                        placeholder=" "
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        required
                                    />
                                    <label
                                        htmlFor="password"
                                        className={` rounded-2xl absolute  text-gray-400
                                        peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-lg peer-focus:text-maincolor
                                        transition-all duration-400 ease-in-out bg-white px-1 peer-focus:px-3 pointer-events-none
                                        ${
                                            formik.values.password == ""
                                                ? `left-3 top-1/2 -translate-y-1/2`
                                                : `top-0 -translate-y-1/2 text-lg text-maincolor px-3 left-3
                                            `
                                        }
                                        `}
                                    >
                                        password
                                    </label>
                                </div>

                                {/* SubMit Button */}
                                <div className="flex gap-3 items-center">
                                    <button
                                        disabled={btnStatus}
                                        type="submit"
                                        className="w-fit max-w-[95px] text-xs md:text-[16px] bg-maincolor cursor-pointer text-white py-2 px-6 rounded-lg hover:bg-maincolor-dark transition-colors duration-200"
                                    >
                                        {loading ? (
                                            <LoaderCircle className="animate-spin" />
                                        ) : (
                                            "sign in"
                                        )}
                                    </button>
                                    <span>
                                        <Link
                                            to={"/resetPassword"}
                                            className="text-sm text-maincolor font-bold"
                                        >
                                            Forget Password?
                                        </Link>
                                    </span>
                                </div>
                                <span className="space-x-2">
                                    <span className="text-gray-500">
                                        {" "}
                                        Not have an account?
                                    </span>
                                    <Link
                                        to={"/register"}
                                        className="text-xl text-maincolor font-bold"
                                    >
                                        Register Now
                                    </Link>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
