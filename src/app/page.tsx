import Image from "next/image";
import LoginForm from "@/components/Login";
import { getCurrentUser } from "@/auth/nextjs/currentUser";
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
        </div>
      )}
    </main>
  );
}
