import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { Helmet } from "react-helmet";

export default function ForgetPassword() {
    let [loading, setLoading] = useState(false);

    let [step, setStep] = useState(1);

    let { setUserToken } = useContext(AuthContext);

    async function handleSubmit(values) {
        const option1 = {
            method: "post",
            url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
            data: values,
        };
        const option2 = {
            method: "post",
            url: "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
            data: values,
        };
        const option3 = {
            method: "put",
            url: "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
            data: {
                email: localStorage.getItem("userEmail"),
                newPassword: formik3.values.newPassword,
            },
        };

        try {
            setLoading(true);
            if (step === 1) {
                localStorage.setItem("userEmail", values.email);
                await axios.request(option1);
                toast.success("Reset code sent to your email");
                setStep(2);
            } else if (step === 2) {
                await axios.request(option2);
                toast.success("Code verified successfully");
                setStep(3);
            } else if (step === 3) {
                let { data } = await axios.request(option3);
                localStorage.setItem("token", data.token);
                setUserToken(localStorage.getItem("token"));
                localStorage.removeItem("userEmail");
                toast.success("Password reset successfully!");
            }
        } catch (error) {
            // handle error (e.g., show error message)
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    let formik = useFormik({
        initialValues: {
            email: "",
        },
        onSubmit: handleSubmit,
    });

    let formik2 = useFormik({
        initialValues: {
            resetCode: "",
        },
        onSubmit: handleSubmit,
    });

    let formik3 = useFormik({
        initialValues: {
            email: localStorage.getItem("userEmail"),
            newPassword: "",
        },
        onSubmit: handleSubmit,
    });

    return (
        <>
            <Helmet>
                <title>Forget Password</title>
                <meta
                    name="description"
                    content="Welcome to our AllOrders page! Here, you'll find an extensive range of high-quality items carefully curated for your shopping pleasure."
                />
            </Helmet>
            <div className="w-11/12 sm:w-10/12 md:w-2/3 mx-auto space-y-8 pt-12">
                {step === 1 ? (
                    <>
                        <h1 className="text-maincolor text-2xl italic">
                            Forget Password
                        </h1>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="flex flex-col gap-6">
                                {/* Email input */}
                                <div className="relative h-14">
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        className="w-full h-full px-3 py-2 border border-gray-300 rounded-lg peer focus:outline-none focus:border-maincolor"
                                        placeholder=" "
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        required
                                    />
                                    <label
                                        htmlFor="email"
                                        className={`rounded-2xl absolute text-gray-400
                                        peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-lg peer-focus:text-maincolor
                                        transition-all duration-400 ease-in-out bg-white px-1 peer-focus:px-3 pointer-events-none
                                        ${
                                            formik.values.email === ""
                                                ? `left-3 top-1/2 -translate-y-1/2`
                                                : `top-0 -translate-y-1/2 text-lg text-maincolor px-3 left-3`
                                        }`}
                                    >
                                        Email
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <div className="flex gap-3 items-center">
                                    <button
                                        type="submit"
                                        className="w-fit bg-maincolor cursor-pointer text-white py-2 px-6 rounded-lg hover:bg-maincolor-dark transition-colors duration-200"
                                    >
                                        {loading ? (
                                            <LoaderCircle className="animate-spin" />
                                        ) : (
                                            "Continue"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </>
                ) : step === 2 ? (
                    <>
                        <h1 className="text-maincolor text-2xl">
                            Verify Your Account
                        </h1>
                        <form onSubmit={formik2.handleSubmit}>
                            <div className="flex flex-col gap-6">
                                {/* Reset Code input */}
                                <div className="relative h-14">
                                    <input
                                        type="text"
                                        id="resetCode"
                                        name="resetCode"
                                        className="w-full h-full px-3 py-2 border border-gray-300 rounded-lg peer focus:outline-none focus:border-maincolor"
                                        placeholder=" "
                                        value={formik2.values.resetCode}
                                        onChange={formik2.handleChange}
                                        onBlur={formik2.handleBlur}
                                        required
                                    />
                                    <label
                                        htmlFor="resetCode"
                                        className={`rounded-2xl absolute text-gray-400
                                        peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-lg peer-focus:text-maincolor
                                        transition-all duration-400 ease-in-out bg-white px-1 peer-focus:px-3 pointer-events-none
                                        ${
                                            formik2.values.resetCode === ""
                                                ? `left-3 top-1/2 -translate-y-1/2`
                                                : `top-0 -translate-y-1/2 text-lg text-maincolor px-3 left-3`
                                        }`}
                                    >
                                        Verification Code
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <div className="flex gap-3 items-center">
                                    <button
                                        type="submit"
                                        className="w-fit bg-maincolor cursor-pointer text-white py-2 px-6 rounded-lg hover:bg-maincolor-dark transition-colors duration-200"
                                    >
                                        {loading ? (
                                            <LoaderCircle className="animate-spin" />
                                        ) : (
                                            "Verify"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </>
                ) : (
                    <>
                        <h1 className="text-maincolor text-2xl">
                            Reset Your Password
                        </h1>
                        <form onSubmit={formik3.handleSubmit}>
                            <div className="flex flex-col gap-6">
                                {/* New Password input */}
                                <div className="relative h-14">
                                    <input
                                        type="password"
                                        id="newPassword"
                                        name="newPassword"
                                        className="w-full h-full px-3 py-2 border border-gray-300 rounded-lg peer focus:outline-none focus:border-maincolor"
                                        placeholder=" "
                                        value={formik3.values.newPassword}
                                        onChange={formik3.handleChange}
                                        onBlur={formik3.handleBlur}
                                        required
                                    />
                                    <label
                                        htmlFor="newPassword"
                                        className={`rounded-2xl absolute text-gray-400
                                        peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-lg peer-focus:text-maincolor
                                        transition-all duration-400 ease-in-out bg-white px-1 peer-focus:px-3 pointer-events-none
                                        ${
                                            formik3.values.newPassword === ""
                                                ? `left-3 top-1/2 -translate-y-1/2`
                                                : `top-0 -translate-y-1/2 text-lg text-maincolor px-3 left-3`
                                        }`}
                                    >
                                        New Password
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <div className="flex gap-3 items-center">
                                    <button
                                        type="submit"
                                        className="w-fit bg-maincolor cursor-pointer text-white py-2 px-6 rounded-lg hover:bg-maincolor-dark transition-colors duration-200"
                                    >
                                        {loading ? (
                                            <LoaderCircle className="animate-spin" />
                                        ) : (
                                            "Reset Password"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </>
    );
}
