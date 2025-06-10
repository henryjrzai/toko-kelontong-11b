"use client";
import { useState } from "react";
import Layout from "../ui/components/Layout";
import Link from "next/link";

export default function Page() {
     const handleRegister = async(e) => {
        e.preventDefault();
    }

    return (
        <Layout>
            <section className="bg-gray-50 ">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div
                        className="w-full bg-white rounded-lg shadowmd:mt-0 sm:max-w-md xl:p-0 ">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                                Buat Akun Anda
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                    <input type="email" name="email" id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        required/>
                                </div>
                                <div>
                                    <label for="username" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
                                    <input type="text" name="username" id="username"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        required/>
                                </div>
                                <div>
                                    <label for="name" className="block mb-2 text-sm font-medium text-gray-900">Nama Lengkap</label>
                                    <input type="text" name="name" id="name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        required/>
                                </div>
                                <div>
                                    <label for="password"
                                        className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                    <input type="password" name="password" id="password"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        required/>
                                </div>
                                <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 w-full">Buat Akun</button>
                                <p className="text-sm text-center font-light text-gray-500 ">
                                    sudah punya akun? 
                                    <Link href="/login" className="font-medium text-primary-600 hover:underline"> Login</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
        
    );
}