"use server"
import { loginSchema, signUpSchema } from "./schemas"
import { z } from "zod"
import prisma from "@/lib/prisma"
import { generateSalt, hashPassword } from "../core/passwordHasher"
import { redirect } from "next/navigation"
import { createUserSession } from "../core/session"
import { cookies } from "next/headers"

type logResType = z.infer<typeof loginSchema>
type sigResType = z.infer<typeof signUpSchema>

interface loginInterface {
    res? : logResType;
    message : string;
    errors : Record<string, string[]>
}

interface signUpInterface {
    res? : sigResType;
    message : string;
    errors : Record<string, string[]>
}



export async function loginUser(prevState: loginInterface | null, formdata : FormData) : Promise<loginInterface>{
    const rawFormData = {
        email : formdata.get("email"),
        password : formdata.get("password"),
    }
    const result = loginSchema.safeParse(rawFormData)

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
            message: "Validation failed",
        };
    }
    console.log(result.data.email)
    return { message : "", errors : {}};
}


// this function signs up the user.
// it checks if the user exists, and if it doesn't 
// it creates a new user and logs them in.
export async function signUpUser(prevState: signUpInterface | null, formdata : FormData) : Promise<signUpInterface>{
    const rawFormData = {
        name : formdata.get("fullname"),
        email : formdata.get("email"),
        password : formdata.get("password"),
        confirmation : formdata.get("cpassword"),
    }
    const result = signUpSchema.safeParse(rawFormData)

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
            message: "Validation failed",
        };
    }

    if (result.data.password != result.data.confirmation){
        return {
            errors : {},
            message : "your confirmation doesn't match your password",
        }
    }

    const existingUser = await prisma.user.findUnique({
        where : {
            email : result.data.email,
        }
    })

    if (existingUser != null) {
        return {
            errors : {}, 
            message : "account already exists",
        }
    }

    try {
        const salt = generateSalt()
        const hashedPassword = await hashPassword(result.data.password, salt)
        const user = await prisma.user.create({
            data : {
                name : result.data.name,
                email : result.data.email,
                password : hashedPassword,
                salt : salt,
            }
        })

        if (user == null) return {errors : {}, message : "unable to create account"}

        await createUserSession(user.id, user.role, await cookies())
    } catch {
        return {
            errors : {},
            message : "unable to create account",
        }
    }

    redirect("/")
}

