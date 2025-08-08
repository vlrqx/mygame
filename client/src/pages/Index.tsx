import { Helmet } from "react-helmet-async";
import { Button } from "@/shared/components/ui/button";
import { Link } from "react-router-dom";
import logo from "@/assets/logo-moya-igra.png";

const Index = () => {
  return (
    <main>
      <Helmet>
        <title>Моя игра — Главная</title>
        <meta name="description" content="Викторина 'Моя игра' — играй, набирай очки и соревнуйся с друзьями!" />
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      <section className="relative overflow-hidden">
        <div className="container py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 h-20 w-20 rounded-full border shadow-sm grid place-items-center">
              <img src={logo} alt="Логотип Моя игра" width={64} height={64} loading="eager" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Моя игра</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Классическая таблица из 6 тем и 5 вопросов в каждой. Правильные ответы приносят очки!
            </p>
            <div className="flex items-center justify-center gap-3">
              <Button asChild size="lg">
                <Link to="/game">Играть</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/profile">Профиль</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
