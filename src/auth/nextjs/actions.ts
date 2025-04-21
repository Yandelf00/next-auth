"use server"
import { loginSchema, signUpSchema } from "./schemas"
import { z } from "zod"

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
    console.log(result.data.name)
    return { message : "", errors : {}};
}
