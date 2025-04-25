import { Role } from "@/generated/prisma";
import  crypto from "crypto"
import prisma from "@/lib/prisma"


const SESSION_EXPIRATION_SECONDS = 1000 * 60 * 60 * 24 * 7
const COOKIE_SESSION_KEY = "session-id"

export type Cookies = {
  set: (
    key: string,
    value: string,
    options: {
      secure?: boolean
      httpOnly?: boolean
      sameSite?: "strict" | "lax"
      expires?: number
    }
  ) => void
  get: (key: string) => { name: string; value: string } | undefined
  delete: (key: string) => void
}

export function getUserFromSession(cookies : Pick<Cookies, "get">){
    const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value    
    if (sessionId == null) return null
    
    return getUserSessionById(sessionId)

}

async function getUserSessionById(sessionId : string){
    const session = await prisma.session.findUnique({
        where : {
            id : sessionId 
        }
    })
    if (!session) {
        return null
    }

    const user = await prisma.user.findUnique({
        where : {
            id : session.userId
        }
    })

    return user;
} 

export async function createUserSession(id: number, role : Role, cookies: Pick<Cookies, "set">){
    try {
        const sessionId = crypto.randomBytes(512).toString("hex").normalize()
        const session = await prisma.session.create({
            data : {
                id : sessionId,
                userId : id,
                role : role,
                expiresAt : new Date(Date.now() + SESSION_EXPIRATION_SECONDS),
            }
        })
        
        setCookie(sessionId, cookies)
    } catch (error) {
        console.error("Failed to create session", error)
        throw new Error("session creation failed") 
    }
}

export async function removeUserFromSession(cookies : Pick<Cookies, "get" | "delete">){
    const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value    
    if (sessionId == null) return null
   
    await prisma.session.delete({
        where : {
            id : sessionId
        }
    })
    cookies.delete(COOKIE_SESSION_KEY)
}

function setCookie(sessionId : string, cookies : Pick<Cookies, "set">){
    cookies.set(COOKIE_SESSION_KEY, sessionId, {
        secure : true,
        httpOnly : true,
        sameSite : "lax",
        expires : Date.now() + SESSION_EXPIRATION_SECONDS,
    })
}

