"use client"

import type React from "react"

export default function LoginForm() {
  return (
    <section className="h-full w-full flex justify-center items-center">
      <div className="h-full w-[500px] flex flex-col justify-center items-center ">
        <div className="w-full flex justify-center">
          <h1 className="text-[30px] font-bold ">
            Welcome back
          </h1>
        </div>
        <div className="w-full flex justify-center ">
          <p className="text-[13px] text-gray-600 ">Please sign in to your account</p>
        </div>
        <div className="mt-5 w-[450px] h-[350px] p-5 bg-white border-1 border-gray-200 rounded-md">
          <h2 className="text-[20px] font-semibold ">Login</h2> 
          <form action="" className="flex flex-col mt-6 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-semibold text-[15px] ">Email</label>
              <input 
              type="text" 
              className="border-1 border-gray-300 rounded-sm
              h-[35px] p-2 " 
              name="email" 
              placeholder="name@example.com"/> 
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="font-semibold text-[15px] ">Password</label>
              <input 
              type="text" 
              className="border-1 border-gray-300 rounded-sm
              h-[35px] p-2" 
              name="password" /> 
            </div>
            <button className="w-full h-[35px] bg-black text-white rounded-sm mt-2 "> Sign in</button>
          </form>
          <div className="w-full mt-5 flex justify-center items-center">
            <p className="text-gray-500 text-[13px] ">Dont have an account?<span className="text-gray-600 font-bold "> Sign Up</span></p>
          </div>
        </div>
      </div>
    </section>
  )
}
