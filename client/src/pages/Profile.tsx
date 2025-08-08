import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { useAppSelector } from "@/shared/hooks/hooks";
import { Button } from "@/shared/components/ui/button";
import { useNavigate } from "react-router-dom";

function Profile(): React.JSX.Element {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  const {score} = useAppSelector((state) => state.user);

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl">Профиль</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Имя</p>
              <p className="text-lg font-semibold">{user?.name || "Не указано"}</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p className="text-lg font-semibold">{user?.email || "Не указан"}</p>
            </div>

            <div className="pt-4 border-t">
              <Card className="bg-accent">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium">Ваш счет:</p>
                    <p className="text-2xl font-bold text-primary">{score || 0}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col space-y-2">
          <Button variant="outline" onClick={() => navigate("/game")}>
            Вернуться к игре
          </Button>
          <Button variant="destructive" onClick={handleLogout}>
            Выйти из аккаунта
          </Button>
        </div>
      </div>
    </main>
  );
}

export default Profile;