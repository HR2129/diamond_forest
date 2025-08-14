"use client"

import { useState } from "react"
import { Eye, EyeOff, Check } from "lucide-react"
import Link from "next/link"

export default function Page() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        fullName: "",
        password: "",
        agreeToTerms: false,
    })

    const handleinputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    return (
        <div className="min-h-screen bg-stone-300 py-20">


            <div className="max-w-7xl mx-auto pt-32 px-4 md:px-8 lg:px-16 ">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center bg-white p-5 rounded-2xl">
                    {/* Left side - Sign up form */}
                    <div className="max-w-md">
                        <h1 className="text-4xl font-bold text-gray-900 mb-12">Sign Up</h1>

                        <form className="space-y-8">
                            {/* Email field */}
                            <div className="relative">
                                <label className="block text-sm font-semibold text-gray-900 mb-3">EMAIL ADDRESS</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        placeholder="hello@reallygreatsite"
                                        value={formData.email}
                                        onChange={(e) => handleinputChange("email", e.target.value)}
                                        className="w-full border-0 border-b-2 border-gray-300 focus:outline-0 bg-transparent px-0 py-3 text-gray-600 placeholder:text-gray-400 focus:border-gray-600 focus:ring-0"
                                    />
                                    {formData.email && <Check className="absolute right-0 top-3 h-5 w-5 text-green-600" />}
                                </div>
                            </div>

                            {/* Full name field */}
                            <div className="relative">
                                <label className="block text-sm font-semibold text-gray-900 mb-3">FULL NAME</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        value={formData.fullName}
                                        onChange={(e) => handleinputChange("fullName", e.target.value)}
                                        className="w-full border-0 border-b-2 focus:outline-0 border-gray-300 bg-transparent px-0 py-3 text-gray-600 placeholder:text-gray-400 focus:border-gray-600 focus:ring-0"
                                    />
                                    {formData.fullName && <Check className="absolute right-0 top-3 h-5 w-5 text-green-600" />}
                                </div>
                            </div>

                            {/* Password field */}
                            <div className="relative">
                                <label className="block text-sm font-semibold text-gray-900 mb-3">PASSWORD</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••••"
                                        value={formData.password}
                                        onChange={(e) => handleinputChange("password", e.target.value)}
                                        className="w-full border-0 border-b-2  border-gray-300 focus:outline-0 bg-transparent px-0 py-3 text-gray-600 placeholder:text-gray-400 focus:border-gray-600 focus:ring-0 pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-0 top-3 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Terms checkbox */}
                            <div className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={formData.agreeToTerms}
                                    onChange={(e) => handleinputChange("agreeToTerms", e.target.checked)}
                                    className="accent-green-600"
                                />
                                <label htmlFor="terms" className="text-sm text-gray-700">
                                    I agree to the Terms & Conditions
                                </label>
                            </div>


                            {/* buttons */}
                            <div className="flex space-x-4 pt-4">
                                <button
                                    type="submit"
                                    className="bg-[#8B8B5C] hover:bg-[#7A7A50] text-white px-8 py-3 rounded-full font-medium"
                                >
                                    Sign Up
                                </button>
                                <button
                                    type="button"
                                    variant="outline"
                                    className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-full font-medium bg-transparent"
                                    
                                >
                                    <Link href="/login">Login</Link>
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Right side - Image and text */}
                    <div className="flex flex-col items-center text-center lg:text-left">
                        <div className="mb-8">
                            <p className="text-lg text-gray-600 leading-relaxed max-w-md">
                                You're choosing the world's most nature inspired diamond jewelry
                            </p>
                        </div>

                        <div className="relative">
                            <img
                                src="/ring.jpg"
                                alt="Raw diamond crystal with elegant diamond bracelet"
                                className="w-full max-w-md h-auto object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
