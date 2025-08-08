// import React from "react";
// import { Helmet } from "react-helmet-async";
// import { Button } from "@/components/ui/button";
// import { useSelector } from "react-redux";
// import { logout, selectUser } from "@/entities/user";
// import { useAppDispatch } from "@/app/store";

// const Profile: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const user = useSelector(selectUser);

//   return (
//     <main className="container py-8">
//       <Helmet>
//         <title>Моя игра — Профиль</title>
//         <meta
//           name="description"
//           content="Профиль пользователя в игре 'Моя игра'"
//         />
//         <link rel="canonical" href={window.location.href} />
//       </Helmet>

//       <h1 className="text-3xl font-bold mb-4">Профиль</h1>
//       {user ? (
//         <section className="max-w-md rounded-lg border p-6">
//           <p className="mb-4">
//             Здравствуйте, <span className="font-semibold">{user.name}</span>!
//           </p>
//           <div className="flex gap-2">
//             <Button onClick={() => dispatch(logout())} variant="destructive">
//               Выйти
//             </Button>
//             <Button variant="secondary" asChild>
//               <a href="/game">Играть</a>
//             </Button>
//           </div>
//         </section>
//       ) : (
//         <p>Вы не авторизованы. Пожалуйста, войдите через кнопку в навбаре.</p>
//       )}
//     </main>
//   );
// };

// export default Profile;
