# A2 Portfolio

Персональный сайт-визитка frontend-разработчика с AI-помощником для HR и команд.

На странице собраны навыки, коммерческий опыт, проекты и контакты кандидата. Встроенный ассистент отвечает на
вопросы о профиле текстом или через голосовой ввод и не придумывает отсутствующие данные.

## Возможности

- Адаптивная страница-портфолио с секциями «Обо мне», «Опыт», «Проекты» и «Контакты»
- Отдельный HR-поиск по профилю кандидата
- Готовые вопросы о навыках, проектах и сильных сторонах
- Голосовой ввод через Web Speech API в Chrome и Edge
- Backend-прокси для OpenAI API на Node.js и Express
- Валидация сообщений и ограничение частоты запросов

## Стек

- [Vue 3](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Node.js](https://nodejs.org/) и [Express](https://expressjs.com/)
- [OpenAI SDK](https://github.com/openai/openai-node)

## Локальный запуск

Клонируйте репозиторий и установите зависимости frontend:

```bash
git clone https://github.com/mynameA2/ChatGPT-search.git
cd ChatGPT-search/chatgpt-voice-ui
npm install
```

Запустите интерфейс:

```bash
npm run dev
```

В отдельном терминале установите зависимости и запустите backend:

```bash
cd server
npm install
node index.js
```

## Настройка OpenAI

Создайте файл `server/.env`:

```env
OPENAI_API_KEY=your_openai_api_key
```

Ключ OpenAI API и биллинг API настраиваются отдельно от подписки ChatGPT. Никогда не
добавляйте `.env` в git и не публикуйте ключ в README, логах или сообщениях.

## Деплой

Frontend можно опубликовать на Vercel, Netlify или другом статическом хостинге.

Для backend на Render:

1. Укажите корневую папку `chatgpt-voice-ui/server`.
2. Используйте команду запуска `node index.js`.
3. Добавьте переменную окружения `OPENAI_API_KEY`.
4. Убедитесь, что для проекта OpenAI API подключён биллинг.

URL backend сейчас задан в `src/components/ChatBox.vue`. При смене хостинга обновите адрес
запроса `/api/chat`.

## Изменение профиля кандидата

Тексты портфолио находятся в `src/App.vue`. Данные, которыми пользуется HR-ассистент,
находятся в константе `CANDIDATE_PROFILE` в `server/index.js`.

Обновляйте оба места одновременно, чтобы страница и ответы AI не расходились.

## Сборка

```bash
npm run build
```
