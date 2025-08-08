import React from "react";
import { useForm } from "react-hook-form";
// import styles from './Login.module.scss';
import type { UserLogin } from "@/entities/user/types/schema";
import { UserLoginSchema } from "@/entities/user/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/shared/hooks/hooks";
import { loginUser } from "@/entities/user/model/userThunk";

function Login(): React.JSX.Element {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserLogin>({
    resolver: zodResolver(UserLoginSchema),
  });

  const dispatch = useAppDispatch();

  const onSubmit = async (data: UserLogin): Promise<void> => {
    await dispatch(loginUser(data));
    reset();
  };

  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="email" {...register("email")} placeholder="chiki@puki.com" />
        {errors.email && <p>{errors.email.message}</p>}

        <input
          type="password"
          {...register("password")}
          placeholder="your password"
        />
        {errors.password && <p>{errors.password.message}</p>}

        <button type="submit">Вход</button>
      </form>
    </main>
  );
}

export default Login;
