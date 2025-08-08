import React, { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { useToast } from "@/hooks/use-toast";

// Типы для вопросов
interface QA {
  value: number;
  question: string;
  answer: string; // Правильный ответ в простом виде
  taken?: boolean;
}

interface Category {
  name: string;
  questions: QA[]; // 5 штук
}

const makeSampleData = (): Category[] => [
  {
    name: "История",
    questions: [
      { value: 100, question: "Столица Древнего Рима?", answer: "рим" },
      { value: 200, question: "Год крещения Руси?", answer: "988" },
      { value: 300, question: "Кто открыл Америку?", answer: "колумб" },
      { value: 400, question: "Первая мировая: годы?", answer: "1914-1918" },
      { value: 500, question: "Имя Петра I?", answer: "пётр" },
    ],
  },
  {
    name: "Наука",
    questions: [
      { value: 100, question: "H2O — это?", answer: "вода" },
      { value: 200, question: "Единица силы тока?", answer: "ампер" },
      { value: 300, question: "Скорость света ~? км/с", answer: "300000" },
      { value: 400, question: "Кто открыл пенициллин?", answer: "флеминг" },
      { value: 500, question: "Формула Эйнштейна?", answer: "e=mc^2" },
    ],
  },
  {
    name: "Спорт",
    questions: [
      { value: 100, question: "Сколько игроков в команде футбола на поле?", answer: "11" },
      { value: 200, question: "NBA — вид спорта?", answer: "баскетбол" },
      { value: 300, question: "Самый быстрый бегун (имя/фамилия)?", answer: "усэйн болт" },
      { value: 400, question: "Гренд-слэм — это в...", answer: "теннис" },
      { value: 500, question: "Олимпиада проводится раз в ... года", answer: "4" },
    ],
  },
  {
    name: "Кино",
    questions: [
      { value: 100, question: "Автор фильма 'Титаник' (фамилия)?", answer: "камэрон" },
      { value: 200, question: "Актер Нео (фамилия)?", answer: "ривз" },
      { value: 300, question: "Оскар — это ... премия", answer: "кино" },
      { value: 400, question: "Студия с логотипом горы?", answer: "парамаунт" },
      { value: 500, question: "Режиссёр 'Интерстеллара' (фамилия)", answer: "нолан" },
    ],
  },
  {
    name: "Музыка",
    questions: [
      { value: 100, question: "До-ре-ми — это...", answer: "гамма" },
      { value: 200, question: "Бетховен — композитор или художник?", answer: "композитор" },
      { value: 300, question: "Queen — страна или группа?", answer: "группа" },
      { value: 400, question: "Скрипка — струнный или духовой?", answer: "струнный" },
      { value: 500, question: "DJ — это дисковый ...", answer: "жокей" },
    ],
  },
  {
    name: "Техно",
    questions: [
      { value: 100, question: "OS от Apple для телефонов?", answer: "ios" },
      { value: 200, question: "JS — это ... язык", answer: "программирования" },
      { value: 300, question: "HTTP — протокол ...", answer: "передачи" },
      { value: 400, question: "Linux — это ... (ядро/браузер)", answer: "ядро" },
      { value: 500, question: "AI по-русски — ... интеллект", answer: "искусственный" },
    ],
  },
];

const normalize = (s: string) => s.trim().toLowerCase();

const Game: React.FC = () => {
  const [cats, setCats] = useState<Category[]>(makeSampleData());
  const [score, setScore] = useState(0);
  const [active, setActive] = useState<{ c: number; q: number } | null>(null);
  const [answer, setAnswer] = useState("");
  const { toast } = useToast();

  const current = useMemo(() => {
    if (!active) return null;
    const item = cats[active.c].questions[active.q];
    return { ...item, cIndex: active.c, qIndex: active.q };
  }, [active, cats]);

  const openQA = (ci: number, qi: number) => {
    const q = cats[ci].questions[qi];
    if (q.taken) return;
    setActive({ c: ci, q: qi });
    setAnswer("");
  };

  const submit = () => {
    if (!current) return;
    const ok = normalize(answer) === normalize(current.answer);
    setCats((prev) => {
      const copy = prev.map((c) => ({ ...c, questions: c.questions.map((q) => ({ ...q })) }));
      copy[current.cIndex].questions[current.qIndex].taken = true;
      return copy;
    });
    if (ok) {
      setScore((s) => s + current.value);
      toast({ title: "Верно!", description: `+${current.value} очков` });
    } else {
      toast({ title: "Неверно", description: `Правильный ответ: ${current.answer}` });
    }
    setActive(null);
  };

  const allTaken = cats.every((c) => c.questions.every((q) => q.taken));

  return (
    <main className="container py-8">
      <Helmet>
        <title>Моя игра — Играть</title>
        <meta name="description" content="Игровое поле: 6 тем, 5 вопросов, единая таблица и подсчёт очков." />
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      <section className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Игровое поле</h1>
        <div className="rounded-md border px-4 py-2 font-semibold">Очки: {score}</div>
      </section>

      <section aria-label="Таблица вопросов" className="overflow-x-auto">
        <table className="w-full border-collapse text-center">
          <thead>
            <tr>
              {cats.map((c) => (
                <th key={c.name} className="border px-3 py-2 bg-secondary text-secondary-foreground">
                  {c.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, row) => (
              <tr key={row}>
                {cats.map((c, ci) => {
                  const q = c.questions[row];
                  return (
                    <td key={c.name + row} className="border p-0">
                      <Button
                        variant={q.taken ? "outline" : "default"}
                        className="w-full h-16 rounded-none"
                        onClick={() => openQA(ci, row)}
                        disabled={!!q.taken}
                        aria-label={`Вопрос на ${q.value} по теме ${c.name}`}
                      >
                        {q.taken ? "—" : q.value}
                      </Button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {allTaken && (
        <section className="mt-6 text-center">
          <p className="text-lg">Игра окончена. Ваш результат: <span className="font-semibold">{score}</span></p>
        </section>
      )}

      <Dialog open={!!current} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Вопрос на {current?.value}</DialogTitle>
            <DialogDescription>{current?.question}</DialogDescription>
          </DialogHeader>
          <div className="py-2">
            <Input
              placeholder="Ваш ответ"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button onClick={submit}>Ответить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default Game;
