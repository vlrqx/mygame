import React from "react";
import { useForm } from "react-hook-form";
import type { UserRegister } from "@/entities/user/types/schema";
import { UserRegisterSchema } from "@/entities/user/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/shared/hooks/hooks";
import { registerUser } from "@/entities/user/model/userThunk";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Link } from "react-router-dom";

function Register(): React.JSX.Element {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserRegister>({
    resolver: zodResolver(UserRegisterSchema),
  });

  const dispatch = useAppDispatch();

  const onSubmit = (data: UserRegister): void => {
    void dispatch(registerUser(data));
    reset();
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Регистрация</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Имя</Label>
              <Input
                id="name"
                type="text"
                placeholder="Введите ваше имя"
                {...register("name")}
                // error={errors.name?.message}
              />
              {errors.name && (
                <p className="text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@mail.com"
                {...register("email")}
                // error={errors.email?.message}
              />
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="Не менее 6 символов"
                {...register("password")}
                // error={errors.password?.message}
              />
              {errors.password && (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Регистрация..." : "Зарегистрироваться"}
            </Button>
            <div className="text-center text-sm mt-4">
              Есть аккаунт?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Войти
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

export default Register;
