import React from "react";
import { useForm } from "react-hook-form";
import type { UserLogin } from "@/entities/user/types/schema";
import { UserLoginSchema } from "@/entities/user/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/shared/hooks/hooks";
import { loginUser } from "@/entities/user/model/userThunk";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Link } from "react-router-dom";

function Login(): React.JSX.Element {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserLogin>({
    resolver: zodResolver(UserLoginSchema),
  });

  const dispatch = useAppDispatch();

  const onSubmit = async (data: UserLogin): Promise<void> => {
    await dispatch(loginUser(data));
    reset();
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Вход в аккаунт</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@mail.com"
                {...register("email")}
      
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="Введите ваш пароль"
                {...register("password")}
                />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Вход..." : "Войти"}
            </Button>

            <div className="text-center text-sm mt-4">
              Нет аккаунта?{" "}
              <Link 
                to="/register" 
                className="text-primary hover:underline"
              >
                Зарегистрироваться
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

export default Login;