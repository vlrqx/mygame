import React from "react";
import { useForm } from "react-hook-form";
import type { UserRegister } from "@/entities/user/types/schema";
import { UserRegisterSchema } from "@/entities/user/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/shared/hooks/hooks";
import { registerUser } from "@/entities/user/model/userThunk";

function Register(): React.JSX.Element {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserRegister>({
    resolver: zodResolver(UserRegisterSchema),
  });

  const dispatch = useAppDispatch();

  const onSubmit = (data: UserRegister): void => {
    void dispatch(registerUser(data));
    reset();
  };

  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("name")} placeholder="Bob" />
        {errors.name && <p>{errors.name.message}</p>}

        <input type="email" {...register("email")} placeholder="bob@bob.com" />
        {errors.email && <p>{errors.email.message}</p>}

        <input
          type="password"
          {...register("password")}
          placeholder="your password"
        />
        {errors.password && <p>{errors.password.message}</p>}
        <button>Зарегистрироваться</button>
      </form>
    </main>
  );
}

export default Register;
