"use client"

import React from 'react'
import { useActionState } from 'react'
import { signUpUser } from '@/auth/nextjs/actions'

export default function SignUp() {
  const [state, formAction] = useActionState(signUpUser, null)
  return (
    <section className="h-full w-full flex justify-center items-center">
      <div className="h-full w-[500px] flex flex-col justify-center items-center ">
        <div className="w-full flex justify-center">
          <h1 className="text-[30px] font-bold ">
            Create an account
          </h1>
        </div>
        <div className="w-full flex justify-center ">
          <p className="text-[13px] text-gray-600 ">sign up to get started</p>
        </div>
        <div className="mt-5 w-[450px] h-[530px] p-5 bg-white border-1 border-gray-200 rounded-md">
          <h2 className="text-[20px] font-semibold ">Sign Up</h2> 
          <form action={formAction} className="flex flex-col mt-6 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="fullname" className="font-semibold text-[15px] ">Full Name</label>
              <input 
              type="text" 
              className="border-1 border-gray-300 rounded-sm
              h-[35px] p-2 " 
              name="fullname" 
              placeholder='John Doe'/> 
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-semibold text-[15px] ">Email</label>
              <input 
              type="text" 
              className="border-1 border-gray-300 rounded-sm
              h-[35px] p-2" 
              name="email" 
              placeholder='name@example.com'/> 
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="font-semibold text-[15px] ">Password</label>
              <input 
              type="text" 
              className="border-1 border-gray-300 rounded-sm
              h-[35px] p-2" 
              name="password" /> 
              <p className='text-gray-500 text-[12px] '>Must be at least 8 characters long</p>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="cpassword" className="font-semibold text-[15px] ">Confirm Password</label>
              <input 
              type="text" 
              className="border-1 border-gray-300 rounded-sm
              h-[35px] p-2" 
              name="cpassword" /> 
            </div>
            <button className="w-full h-[35px] bg-black text-white rounded-sm mt-2 ">Create account</button>
          </form>
          <div className="w-full mt-5 flex justify-center items-center">
            <p className="text-gray-500 text-[13px] ">Already have an account?<span className="text-gray-600 font-bold "> Sign In</span></p>
          </div>
        </div>
      </div>
    </section>
  )
}
