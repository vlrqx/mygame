'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Questions',
      [
        // Тема 1: История (id=1)
        { name: 'В каком году началась Вторая мировая война?', answer: '1939', points: 100, themeId: 1},
        { name: 'Кто был первым президентом США?', answer: 'Джордж Вашингтон', points: 200, themeId: 1},
        { name: 'В каком году человек впервые полетел в космос?', answer: '1961', points: 300, themeId: 1},
        { name: 'Как звали первого царя всея Руси?', answer: 'Иван IV Грозный', points: 400, themeId: 1},
        { name: 'Какая древняя цивилизация построила пирамиды в Гизе?', answer: 'Древний Египет', points: 500, themeId: 1},

        // Тема 2: Наука (id=2)
        { name: 'Какой химический элемент обозначается символом "O"?', answer: 'Кислород', points: 100, themeId: 2},
        { name: 'Кто открыл закон всемирного тяготения?', answer: 'Исаак Ньютон', points: 200, themeId: 2},
        { name: 'Как называется самая большая часть клетки?', answer: 'Ядро', points: 300, themeId: 2},
        { name: 'Какой ученый сформулировал теорию относительности?', answer: 'Альберт Эйнштейн', points: 400, themeId: 2},
        { name: 'Как называется процесс деления клетки?', answer: 'Митоз', points: 500, themeId: 2},

        // Тема 3: Искусство (id=3)
        { name: 'Кто написал картину "Мона Лиза"?', answer: 'Леонардо да Винчи', points: 100, themeId: 3},
        { name: 'Какой художник отрезал себе ухо?', answer: 'Винсент ван Гог', points: 200, themeId: 3},
        { name: 'В каком веке жил Микеланджело?', answer: 'XV век', points: 300, themeId: 3},
        { name: 'Кто автор скульптуры "Мыслитель"?', answer: 'Огюст Роден', points: 400, themeId: 3},
        { name: 'Какое направление в искусстве основал Пикассо?', answer: 'Кубизм', points: 500, themeId: 3},

        // Тема 4: Кино (id=4)
        { name: 'Кто режиссер фильма "Крестный отец"?', answer: 'Фрэнсис Форд Коппола', points: 100, themeId: 4},
        { name: 'Какой актер играл Нео в "Матрице"?', answer: 'Киану Ривз', points: 200, themeId: 4},
        { name: 'В каком году вышел первый фильм о Гарри Поттере?', answer: '2001', points: 300, themeId: 4},
        { name: 'Кто снялся в главной роли в "Титанике"?', answer: 'Леонардо ДиКаприо', points: 400, themeId: 4},
        { name: 'Какой фильм получил больше всего Оскаров?', answer: 'Титаник', points: 500, themeId: 4},

        // Тема 5: Программирование (id=5)
        { name: 'Какой язык программирования создал Брендан Эйх?', answer: 'JavaScript', points: 100, themeId: 5},
        { name: 'Кто создал язык Python?', answer: 'Гвидо ван Россум', points: 200, themeId: 5},
        { name: 'Как называется репозиторий для хранения кода?', answer: 'Git', points: 300, themeId: 5},
        { name: 'Какой алгоритм сортировки самый быстрый в среднем случае?', answer: 'Быстрая сортировка', points: 400, themeId: 5},
        { name: 'Что означает SOLID в программировании?', answer: 'Принципы объектно-ориентированного программирования', points: 500, themeId: 5},

        // Тема 6: География (id=6)
        { name: 'Какая самая длинная река в мире?', answer: 'Нил', points: 100, themeId: 6},
        { name: 'В какой стране находится Эйфелева башня?', answer: 'Франция', points: 200, themeId: 6},
        { name: 'Какой океан самый большой по площади?', answer: 'Тихий', points: 300, themeId: 6},
        { name: 'Какая самая высокая гора в мире?', answer: 'Эверест', points: 400, themeId: 6},
        { name: 'Сколько континентов на Земле?', answer: '7', points: 500, themeId: 6}
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Questions', null, {});
  }
};