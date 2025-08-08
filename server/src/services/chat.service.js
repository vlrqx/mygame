const axios = require('axios');
const { sequelize } = require('../../db/models');
require('dotenv').config();

class ChatService {
  constructor() {
    this.accessToken = '';
    this.messages = [
      {
        role: 'system',
        content: `Ты — персональный ассистент в блоге. Предлагай только короткие (1-2 предложения) и конкретные идеи. Формат:

1. Активность: [что сделать] → [польза/причина]
2. Еда: [что приготовить] → [ключевой ингредиент]
3. Место: [куда сходить] → [фишка места]

Примеры:
1. Активность: Сделай 15-минутную растяжку → улучшит гибкость и снимет стресс
2. Еда: Приготовь пасту с лимоном и шпинатом → быстрый ужин за 20 минут
3. Место: Сходи в парк Горького → там сейчас цветут магнолии

Правила:
- Только реально выполнимые идеи
- Максимум 3 предложения в пункте
- Избегай общих фраз
- Добавляй местный колорит (если знаешь город пользователя)
- Варианты на сегодняшний день/сезон

Оставайся в контексте диалога,не забывай отвечать пользователю на его сообщения `,
      },
    ];
    this.client = axios.create({
      baseURL: 'https://gigachat.devices.sberbank.ru/api/v1',
      headers: {
        'Content-Type': ' application/json',
        Accept: ' application/json',
      },
    });

    this.client.interceptors.response.use(
      (res) => res,
      async (err) => {
        const prev = err.config;
        if (err.status === 401 && !prev.sent) {
          await this.#refresh();
          prev.sent = true;
          prev.headers.Authorization = `Bearer ${this.accessToken}`;
          return this.client(prev);
        }
        return Promise.reject(err);
      },
    );
  }

  async #refresh() {
    const response = await axios.post(
      'https://ngw.devices.sberbank.ru:9443/api/v2/oauth',
      'scope=GIGACHAT_API_PERS',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
          RqUID: '27976a97-d4cc-498a-8d10-b9a5c5ad89ba',
          Authorization: `Basic ${process.env.GIGACHAT_AUTH_KEY}`,
        },
      },
    );

    this.accessToken = response.data.access_token;
  }

  async invoke(message) {
    this.messages.push({ role: 'user', content: message });

    const response = await this.client.post(
      '/chat/completions',
      {
        model: 'GigaChat-Pro',
        messages: this.messages,
        stream: false,
      },
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      },
    );

    this.messages.push(response.data.choices[0].message);

    return response.data.choices[0].message;
  }
}

const chatService = new ChatService();

module.exports = chatService;