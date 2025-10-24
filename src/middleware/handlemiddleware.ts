import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default async function HandleMiddleware(role: string[]) {
  const cookieStore = cookies();
  const role_cookie: any = cookieStore.get("role")?.value;
  // if (role_cookie) {
  //   if (role.includes(role_cookie)) { 
  //     return true;
  //   } else {
  //     redirect("/login");
  //   }
  // } else {
  //   redirect("/login");
  // }
}
