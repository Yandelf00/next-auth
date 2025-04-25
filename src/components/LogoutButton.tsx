"use client"
import { logOut } from "@/auth/nextjs/actions"

export function LogOutButton() {
  return (
    <button className="bg-red-600 text-white" onClick={async () => await logOut()}>
      Log Out
    </button>
  )
}