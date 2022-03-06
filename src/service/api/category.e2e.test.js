"use strict";

const express = require(`express`);
const request = require(`supertest`);
const Sequelize = require(`sequelize`);
const initDB = require(`../lib/init-db`);
const category = require(`./category`);
const {HttpCode} = require(`../../constants`);

const {
  CategoryService,
} = require(`../data-service`);

const mockCategories = [`Кино`, `Железо`, `Музыка`, `IT`];

const mockData = [
  {
    title: `Разработка плагина брендирования`,
    createdDate: `2021-08-15 00:40:28`,
    announce: `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Уже не помню в чем были причины, но это уже и не важно. Собрать камни бесконечности легко, если вы прирожденный герой.`,
    fullText: `Внешне сайт работает нормально, но в админке сыплет такими нотисами... очень неприятно. Это один из лучших рок-музыкантов. Золотое сечение — соотношение двух величин, гармоническая пропорция. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Собрать камни бесконечности легко, если вы прирожденный герой. Google сейчас активно форсит AMP, подробней здесь.Разработчики Wordpress реализовали поддерку через плагин, но с ним пока все печально. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Он написал больше 30 хитов. Готов заплатить за такое, как вероятно и другие вебмастера ориентировнные на получение трафика с гугла. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Простые ежедневные упражнения помогут достичь успеха. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Предложение — почему бы в момент подписки на конкретный блог не сделать возможность выбора: получать уведомления о новых топиках в данном блоге на e-mail/просто следить за блогом в Ленте без писем на мыло. Программировать не настолько сложно, как об этом говорят. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Хочется чтобы вместо этого меню была тупо ссылка на профиль и выход.. Такое можно реализовать? Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Ёлки — это не просто красивое дерево. Это прочная древесина.`,
    category: [`Кино`],
    comments: [
      {
        text: `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Плюсую, но слишком много буквы!`,
      },
    ],
  },
  {
    title: `Самый лучший музыкальный альбом этого года`,
    createdDate: `2021-09-20 14:17:43`,
    announce: `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Программировать не настолько сложно, как об этом говорят. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Это один из лучших рок-музыкантов.`,
    fullText: `Ёлки — это не просто красивое дерево. Это прочная древесина. Google сейчас активно форсит AMP, подробней здесь.Разработчики Wordpress реализовали поддерку через плагин, но с ним пока все печально. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Достичь успеха помогут ежедневные повторения. Это один из лучших рок-музыкантов. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Внешне сайт работает нормально, но в админке сыплет такими нотисами... очень неприятно. Готов заплатить за такое, как вероятно и другие вебмастера ориентировнные на получение трафика с гугла. Возможно остались единицы сайтостроителей, которые надеются на чудо:)) Но чуда не будет. Как начать действовать? Для начала просто соберитесь. Он написал больше 30 хитов. Хочется чтобы вместо этого меню была тупо ссылка на профиль и выход.. Такое можно реализовать? Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Собрать камни бесконечности легко, если вы прирожденный герой. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Золотое сечение — соотношение двух величин, гармоническая пропорция. Простые ежедневные упражнения помогут достичь успеха.`,
    category: [`Музыка`],
    comments: [
      {
        text: `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Хочу такую же футболку :-)`,
      },
      {
        text: `Планируете записать видосик на эту тему? Совсем немного...`,
      },
      {
        text: `Хочу такую же футболку :-) Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Это где ж такие красоты?`,
      },
    ],
  },
  {
    title: `Как начать программировать`,
    createdDate: `2021-09-14 04:10:33`,
    announce: `Это один из лучших рок-музыкантов. Первая большая ёлка была установлена только в 1938 году. Ёлки — это не просто красивое дерево. Это прочная древесина. Предложение — почему бы в момент подписки на конкретный блог не сделать возможность выбора: получать уведомления о новых топиках в данном блоге на e-mail/просто следить за блогом в Ленте без писем на мыло.`,
    fullText: `Внешне сайт работает нормально, но в админке сыплет такими нотисами... очень неприятно. Он написал больше 30 хитов. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Собрать камни бесконечности легко, если вы прирожденный герой. Уже не помню в чем были причины, но это уже и не важно. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Хочется чтобы вместо этого меню была тупо ссылка на профиль и выход.. Такое можно реализовать? Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Как начать действовать? Для начала просто соберитесь. Программировать не настолько сложно, как об этом говорят. Готов заплатить за такое, как вероятно и другие вебмастера ориентировнные на получение трафика с гугла. Золотое сечение — соотношение двух величин, гармоническая пропорция. Ёлки — это не просто красивое дерево. Это прочная древесина. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Простые ежедневные упражнения помогут достичь успеха. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
    category: [`Железо`],
    comments: [
      {
        text: `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`,
      },
      {text: `Совсем немного...`},
    ],
  },
  {
    title: `Как начать программировать`,
    createdDate: `2021-08-18 02:41:37`,
    announce: `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Золотое сечение — соотношение двух величин, гармоническая пропорция. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
    fullText: `Уже не помню в чем были причины, но это уже и не важно. Google сейчас активно форсит AMP, подробней здесь.Разработчики Wordpress реализовали поддерку через плагин, но с ним пока все печально. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Он написал больше 30 хитов. Простые ежедневные упражнения помогут достичь успеха. Внешне сайт работает нормально, но в админке сыплет такими нотисами... очень неприятно. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Это один из лучших рок-музыкантов. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Готов заплатить за такое, как вероятно и другие вебмастера ориентировнные на получение трафика с гугла. Первая большая ёлка была установлена только в 1938 году. Хочется чтобы вместо этого меню была тупо ссылка на профиль и выход.. Такое можно реализовать? Как начать действовать? Для начала просто соберитесь. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Собрать камни бесконечности легко, если вы прирожденный герой. Золотое сечение — соотношение двух величин, гармоническая пропорция. Ёлки — это не просто красивое дерево. Это прочная древесина. Программировать не настолько сложно, как об этом говорят.`,
    category: [`Музыка`],
    comments: [
      {text: `"Мне кажется или я уже читал это где-то?`},
      {text: `Это где ж такие красоты?`},
      {
        text: `Плюсую, но слишком много буквы! Хочу такую же футболку :-) Совсем немного...`,
      },
    ],
  },
  {
    title: `Вниманию всех, у кого возникли проблемы с авторизацией`,
    createdDate: `2021-09-17 10:48:15`,
    announce: `Он написал больше 30 хитов. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Внешне сайт работает нормально, но в админке сыплет такими нотисами... очень неприятно. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
    fullText: `Собрать камни бесконечности легко, если вы прирожденный герой. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Программировать не настолько сложно, как об этом говорят. Он написал больше 30 хитов. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Уже не помню в чем были причины, но это уже и не важно. Внешне сайт работает нормально, но в админке сыплет такими нотисами... очень неприятно. Простые ежедневные упражнения помогут достичь успеха. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Хочется чтобы вместо этого меню была тупо ссылка на профиль и выход.. Такое можно реализовать? Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Предложение — почему бы в момент подписки на конкретный блог не сделать возможность выбора: получать уведомления о новых топиках в данном блоге на e-mail/просто следить за блогом в Ленте без писем на мыло. Возможно остались единицы сайтостроителей, которые надеются на чудо:)) Но чуда не будет. Ёлки — это не просто красивое дерево. Это прочная древесина. Первая большая ёлка была установлена только в 1938 году. Из под его пера вышло 8 платиновых альбомов. Google сейчас активно форсит AMP, подробней здесь.Разработчики Wordpress реализовали поддерку через плагин, но с ним пока все печально.`,
    category: [`IT`],
    comments: [
      {
        text: `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Планируете записать видосик на эту тему? Это где ж такие красоты?`,
      },
      {
        text: `Хочу такую же футболку :-) "Мне кажется или я уже читал это где-то? Плюсую, но слишком много буквы!`,
      },
      {text: `Планируете записать видосик на эту тему?`},
    ],
  },
];

const mockAuthors = [
  {
    email: `ivanov@example.com`,
    firstname: `Иван`,
    lastname: `Иванов`,
    password: `5f4dcc3b5aa765d61d8327deb882cf99`,
    avater: `'avatar1.jpg`,
  },
  {
    email: `petrov@example.com`,
    firstname: `Пётр`,
    lastname: `Петров`,
    password: `5f4dcc3b5aa765d61d8327deb882cf99`,
    avater: `'avatar2.jpg`,
  },
];

const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});
const app = express();
app.use(express.json());

beforeAll(async () => {
  await initDB(mockDB, {categories: mockCategories, authors: mockAuthors, articles: mockData});
  category(app, new CategoryService(mockDB));
});


describe(`API reutrns category list`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/categories`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns list of 4 categories`, () =>
    expect(response.body.length).toBe(4));

  test(`Category names are "Кино", "Музыка", "Железо","IT"`, () =>
    expect(response.body.map((it) => it.title)).toEqual(
        expect.arrayContaining([`Кино`, `Музыка`, `Железо`, `IT`])
    ));


});
