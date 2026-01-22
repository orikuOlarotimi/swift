// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
// import axios from "axios";

// export default async function ProtectedLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("accessToken");

//   if (!token) {
//     redirect("/");
//   }

//   try {
//     const res = await axios.post(
//       `${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/me`,
//       {},
//       {
//         headers: {
//           Cookie: `accessToken=${token.value}`,
//         },
//         withCredentials: true,
//       },
//     );

//     if (!res.data?.success) {
//       redirect("/");
//     }
//   } catch (err) {
//     redirect("/");
//   }

//   return <>{children}</>;
// }
