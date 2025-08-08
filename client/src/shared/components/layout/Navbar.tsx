import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooks";


const Navbar: React.FC = () => {

  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();


  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <Link 
            to="/" 
            className="flex items-center font-bold text-lg hover:opacity-80 transition-opacity"
          >
            Моя игра
          </Link>
        </div>

        {/* Правая часть - меняется в зависимости от авторизации */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link
                to="/profile"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Профиль
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Регистрация
              </Link>
              <button
                onClick={handleLogin}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
              >
                Войти
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;