import axios from "axios";
import { useFormik } from "formik";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Register() {
    let [loading, setLoading] = useState(false);

    // let [btnStatus, setBtnStatus] = useState(false);

    let navigate = useNavigate();

    let validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, "name must be 3 char at least ")
            .max(16, "name must be 16 or less")
            .required("name is required"),
        email: Yup.string()
            .email("email must be vaild ")
            .required("email is required"),
        phone: Yup.string()
            .matches(
                /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/,
                "phone must be a valid Egyptian phone number"
            )
            .required("phone is required"),
        password: Yup.string()
            .matches(
                /^[A-Za-z0-9]{6,11}$/,
                "Password must be 6-11 characters, letters or numbers only"
            )
            .required("password is required"),
        rePassword: Yup.string().oneOf(
            [Yup.ref("password")],
            "rePassword must be just like password"
        ),
    });

    async function handleRegister(values) {
        setLoading(true);
        try {
            const { data } = await axios.post(
                "https://ecommerce.routemisr.com/api/v1/auth/signup",
                values
            );
            console.log(data);
            setTimeout(() => {
                navigate("/login");
            }, 5000);
        } catch (error) {
            console.log(
                "Error during registration:",
                error.response?.data?.message || error.message
            );
        } finally {
            setLoading(false);
        }
    }

    let formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: "",
        },
        validationSchema,
        onSubmit: handleRegister,
    });

    // console.log(formik.values.name !== "" ? formik.values.name : " Not ");

    return (
        <>
            <Helmet>
                <title>CategoriesProducts</title>
                <meta
                    name="description"
                    content="Welcome to our AllOrders page! Here, you'll find an extensive range of high-quality items carefully curated for your shopping pleasure."
                />
            </Helmet>
            <div>
                <div className="w-8/12 mx-auto py-6 space-y-6">
                    <h1 className="text-2xl italic font-bold text-maincolor">
                        Register Now
                    </h1>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="flex flex-col gap-8">
                            {/* Name input */}
                            <div className="relative h-14">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className={`w-full h-full px-3 py-2 border rounded-lg peer focus:outline-none 
                                    ${
                                        formik.errors.name &&
                                        formik.touched.name
                                            ? "border-red-500 focus:border-red-500"
                                            : formik.values.name &&
                                              !formik.errors.name
                                            ? "border-green-400 focus:border-green-500 shadow-[0_0_0_1px_rgba(74,222,128,0.5)]"
                                            : "border-gray-300 focus:border-maincolor"
                                    }`}
                                    placeholder=" "
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    required
                                />

                                <label
                                    htmlFor="name"
                                    className={`rounded-2xl absolute text-gray-400
                                    peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-lg peer-focus:text-maincolor
                                    transition-all duration-400 ease-in-out bg-white px-1 peer-focus:px-3 pointer-events-none
                                    ${
                                        formik.values.name == ""
                                            ? `left-3 top-1/2 -translate-y-1/2`
                                            : `top-0 -translate-y-1/2 text-lg px-3 left-3 ${
                                                  formik.errors.name
                                                      ? "text-red-500"
                                                      : "text-green-500"
                                              }`
                                    }`}
                                >
                                    Name
                                </label>

                                {/* Success indicator (only shows when valid) */}
                                {formik.values.name && !formik.errors.name && (
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                                        <svg
                                            className="w-5 h-5 text-green-500 animate-checkmark"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={3}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </div>

                            {formik.errors.name && formik.touched.name ? (
                                <div className="animate-bounce bg-red-500 text-white px-4 py-3 rounded-lg shadow-md border-l-4 border-red-700 flex items-center font-sans font-bold">
                                    {/* Cart icon with exclamation mark */}
                                    <div className="relative mr-3">
                                        <svg
                                            className="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                        </svg>
                                    </div>
                                    <span>{formik.errors.name}</span>
                                    <button
                                        onClick={() =>
                                            formik.setFieldTouched(
                                                "name",
                                                false
                                            )
                                        }
                                        className="ml-auto bg-white/20 hover:bg-white/30 rounded-full w-5 h-5 flex items-center justify-center text-xs font-black transition-colors cursor-pointer"
                                        aria-label="Dismiss"
                                    >
                                        ×
                                    </button>
                                </div>
                            ) : null}

                            {/* Email input */}
                            <div className="relative h-14">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className={`w-full h-full px-3 py-2 border rounded-lg peer focus:outline-none 
                                    ${
                                        formik.errors.email &&
                                        formik.touched.email
                                            ? "border-red-500 focus:border-red-500"
                                            : formik.values.email &&
                                              !formik.errors.email
                                            ? "border-green-400 focus:border-green-500 shadow-[0_0_0_1px_rgba(74,222,128,0.5)]"
                                            : "border-gray-300 focus:border-maincolor"
                                    }`}
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
                                        formik.values.email == ""
                                            ? `left-3 top-1/2 -translate-y-1/2`
                                            : `top-0 -translate-y-1/2 text-lg px-3 left-3 ${
                                                  formik.errors.email
                                                      ? "text-red-500"
                                                      : "text-green-500"
                                              }`
                                    }`}
                                >
                                    Email
                                </label>
                                {formik.values.email &&
                                    !formik.errors.email && (
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                                            <svg
                                                className="w-5 h-5 text-green-500 animate-checkmark"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={3}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        </div>
                                    )}
                            </div>
                            {formik.errors.email && formik.touched.email ? (
                                <div className="animate-bounce bg-red-500 text-white px-4 py-3 rounded-lg shadow-md border-l-4 border-red-700 flex items-center font-sans font-bold">
                                    <div className="relative mr-3">
                                        <svg
                                            className="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                        </svg>
                                    </div>
                                    <span>{formik.errors.email}</span>
                                    <button
                                        onClick={() =>
                                            formik.setFieldTouched(
                                                "email",
                                                false
                                            )
                                        }
                                        className="ml-auto bg-white/20 hover:bg-white/30 rounded-full w-5 h-5 flex items-center justify-center text-xs font-black transition-colors cursor-pointer"
                                        aria-label="Dismiss"
                                    >
                                        ×
                                    </button>
                                </div>
                            ) : null}

                            {/* Password input */}
                            <div className="relative h-14">
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className={`w-full h-full px-3 py-2 border rounded-lg peer focus:outline-none 
                                    ${
                                        formik.errors.password &&
                                        formik.touched.password
                                            ? "border-red-500 focus:border-red-500"
                                            : formik.values.password &&
                                              !formik.errors.password
                                            ? "border-green-400 focus:border-green-500 shadow-[0_0_0_1px_rgba(74,222,128,0.5)]"
                                            : "border-gray-300 focus:border-maincolor"
                                    }`}
                                    placeholder=" "
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    required
                                />
                                <label
                                    htmlFor="password"
                                    className={`rounded-2xl absolute text-gray-400
                                    peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-lg peer-focus:text-maincolor
                                    transition-all duration-400 ease-in-out bg-white px-1 peer-focus:px-3 pointer-events-none
                                    ${
                                        formik.values.password == ""
                                            ? `left-3 top-1/2 -translate-y-1/2`
                                            : `top-0 -translate-y-1/2 text-lg px-3 left-3 ${
                                                  formik.errors.password
                                                      ? "text-red-500"
                                                      : "text-green-500"
                                              }`
                                    }`}
                                >
                                    Password
                                </label>
                                {formik.values.password &&
                                    !formik.errors.password && (
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                                            <svg
                                                className="w-5 h-5 text-green-500 animate-checkmark"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={3}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        </div>
                                    )}
                            </div>
                            {formik.errors.password &&
                            formik.touched.password ? (
                                <div className="animate-bounce bg-red-500 text-white px-4 py-3 rounded-lg shadow-md border-l-4 border-red-700 flex items-center font-sans font-bold">
                                    <div className="relative mr-3">
                                        <svg
                                            className="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                        </svg>
                                    </div>
                                    <span>{formik.errors.password}</span>
                                    <button
                                        onClick={() =>
                                            formik.setFieldTouched(
                                                "password",
                                                false
                                            )
                                        }
                                        className="ml-auto bg-white/20 hover:bg-white/30 rounded-full w-5 h-5 flex items-center justify-center text-xs font-black transition-colors cursor-pointer"
                                        aria-label="Dismiss"
                                    >
                                        ×
                                    </button>
                                </div>
                            ) : null}

                            {/* Re-password input */}
                            <div className="relative h-14">
                                <input
                                    type="password"
                                    id="rePassword"
                                    name="rePassword"
                                    className={`w-full h-full px-3 py-2 border rounded-lg peer focus:outline-none 
                                    ${
                                        formik.errors.rePassword &&
                                        formik.touched.rePassword
                                            ? "border-red-500 focus:border-red-500"
                                            : formik.values.rePassword &&
                                              !formik.errors.rePassword
                                            ? "border-green-400 focus:border-green-500 shadow-[0_0_0_1px_rgba(74,222,128,0.5)]"
                                            : "border-gray-300 focus:border-maincolor"
                                    }`}
                                    placeholder=" "
                                    value={formik.values.rePassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    required
                                />
                                <label
                                    htmlFor="rePassword"
                                    className={`rounded-2xl absolute text-gray-400
                                    peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-lg peer-focus:text-maincolor
                                    transition-all duration-400 ease-in-out bg-white px-1 peer-focus:px-3 pointer-events-none
                                    ${
                                        formik.values.rePassword == ""
                                            ? `left-3 top-1/2 -translate-y-1/2`
                                            : `top-0 -translate-y-1/2 text-lg px-3 left-3 ${
                                                  formik.errors.rePassword
                                                      ? "text-red-500"
                                                      : "text-green-500"
                                              }`
                                    }`}
                                >
                                    Re-password
                                </label>
                                {formik.values.rePassword &&
                                    !formik.errors.rePassword && (
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                                            <svg
                                                className="w-5 h-5 text-green-500 animate-checkmark"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={3}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        </div>
                                    )}
                            </div>
                            {formik.errors.rePassword &&
                            formik.touched.rePassword ? (
                                <div className="animate-bounce bg-red-500 text-white px-4 py-3 rounded-lg shadow-md border-l-4 border-red-700 flex items-center font-sans font-bold">
                                    <div className="relative mr-3">
                                        <svg
                                            className="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                        </svg>
                                    </div>
                                    <span>{formik.errors.rePassword}</span>
                                    <button
                                        onClick={() =>
                                            formik.setFieldTouched(
                                                "rePassword",
                                                false
                                            )
                                        }
                                        className="ml-auto bg-white/20 hover:bg-white/30 rounded-full w-5 h-5 flex items-center justify-center text-xs font-black transition-colors cursor-pointer"
                                        aria-label="Dismiss"
                                    >
                                        ×
                                    </button>
                                </div>
                            ) : null}

                            {/* Phone input */}
                            <div className="relative h-14">
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    className={`w-full h-full px-3 py-2 border rounded-lg peer focus:outline-none 
                                    ${
                                        formik.errors.phone &&
                                        formik.touched.phone
                                            ? "border-red-500 focus:border-red-500"
                                            : formik.values.phone &&
                                              !formik.errors.phone
                                            ? "border-green-400 focus:border-green-500 shadow-[0_0_0_1px_rgba(74,222,128,0.5)]"
                                            : "border-gray-300 focus:border-maincolor"
                                    }`}
                                    placeholder=" "
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    required
                                />
                                <label
                                    htmlFor="phone"
                                    className={`rounded-2xl absolute text-gray-400
                                    peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-lg peer-focus:text-maincolor
                                    transition-all duration-400 ease-in-out bg-white px-1 peer-focus:px-3 pointer-events-none
                                    ${
                                        formik.values.phone == ""
                                            ? `left-3 top-1/2 -translate-y-1/2`
                                            : `top-0 -translate-y-1/2 text-lg px-3 left-3 ${
                                                  formik.errors.phone
                                                      ? "text-red-500"
                                                      : "text-green-500"
                                              }`
                                    }`}
                                >
                                    Phone
                                </label>
                                {formik.values.phone &&
                                    !formik.errors.phone && (
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                                            <svg
                                                className="w-5 h-5 text-green-500 animate-checkmark"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={3}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        </div>
                                    )}
                            </div>
                            {formik.errors.phone && formik.touched.phone ? (
                                <div className="animate-bounce bg-red-500 text-white px-4 py-3 rounded-lg shadow-md border-l-4 border-red-700 flex items-center font-sans font-bold">
                                    <div className="relative mr-3">
                                        <svg
                                            className="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                        </svg>
                                    </div>
                                    <span>{formik.errors.phone}</span>
                                    <button
                                        onClick={() =>
                                            formik.setFieldTouched(
                                                "phone",
                                                false
                                            )
                                        }
                                        className="ml-auto bg-white/20 hover:bg-white/30 rounded-full w-5 h-5 flex items-center justify-center text-xs font-black transition-colors cursor-pointer"
                                        aria-label="Dismiss"
                                    >
                                        ×
                                    </button>
                                </div>
                            ) : null}
                            <button
                                type="submit"
                                className="w-fit bg-maincolor cursor-pointer text-white py-2 px-6 rounded-lg hover:bg-maincolor-dark transition-colors duration-200"
                            >
                                {loading ? (
                                    <LoaderCircle className="animate-spin" />
                                ) : (
                                    "Register"
                                )}
                            </button>
                            <span>
                                Already have an account{" "}
                                <Link
                                    to={"/login"}
                                    className="text-xl text-maincolor font-bold"
                                >
                                    Login Now
                                </Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
