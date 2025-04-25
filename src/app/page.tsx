import Image from "next/image";
import LoginForm from "@/components/Login";
import { getCurrentUser } from "@/auth/nextjs/currentUser";
import { LogOutButton } from "@/components/LogoutButton";


export default async function Home() {
  const user = await getCurrentUser()
  return (
    <main className="h-full w-full bg-gray-50">
      {user == null ? (
        <div>
          login signup
        </div>
      ) : (
        <div>
          {user.name}
          <LogOutButton/>
        </div>
      )}
    </main>
  );
}
