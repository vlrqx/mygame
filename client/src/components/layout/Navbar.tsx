import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/app/providers/store";
import { login, selectUser } from "@/entities/user";
import logo from "@/assets/logo-moya-igra.png";

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!name.trim()) return;
    dispatch(login(name.trim()));
    setOpen(false);
    navigate("/profile");
  };

  return (
    <header className="border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
      <nav className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3" aria-label="Перейти на главную">
          <img src={logo} width={32} height={32} alt="Логотип Моя игра" loading="eager" />
          <span className="font-semibold text-lg">Моя игра</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button asChild variant="secondary">
            <Link to="/game">Играть</Link>
          </Button>

          {user ? (
            <Button asChild variant="outline">
              <Link to="/profile">Профиль</Link>
            </Button>
          ) : (
            <>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button variant="default">Войти</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Вход</DialogTitle>
                    <DialogDescription>
                      Введите имя, чтобы продолжить. Позже можно заменить на вашу реальную авторизацию.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-2">
                    <Input
                      placeholder="Ваше имя"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoFocus
                    />
                  </div>
                  <DialogFooter>
                    <Button onClick={handleLogin} variant="default">Продолжить</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
