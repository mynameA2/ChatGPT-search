# ChatGPT Voice UI 🎤🧠

Веб-приложение на Vue 3 + Tailwind CSS с голосовым вводом, использующее ChatGPT API через Node.js backend.

## 🚀 Функции

- 💬 Текстовый ввод и отправка вопросов к ChatGPT
- 🎙 Голосовой ввод (Web Speech API, работает в Chrome/Edge)
- 📦 Backend-прокси на Node.js с OpenAI API
- 🌀 Стилизация с Tailwind CSS

## 🖥️ Скриншот

![screenshot](./screenshot.png)

## 🛠 Установка

```bash
# Клонировать репозиторий
git clone https://github.com/mynameA2/ChatGPT-search.git
cd ChatGPT-search

# Установить frontend
cd chatgpt-voice-ui
npm install
```

## 🌐 Запуск frontend

```bash
npm run dev
```

## 🧠 Запуск backend

```bash
cd server
npm install
# Создай файл .env с ключом OpenAI:
# OPENAI_API_KEY=sk-...
node index.js
```

## ⚙️ .env пример

```env
OPENAI_API_KEY=sk-...
```

## 📦 Стек

- [Vue 3](https://vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Node.js + Express](https://expressjs.com/)
- [OpenAI SDK](https://www.npmjs.com/package/openai)

## ⚠️ Важно

🔒 Никогда не коммить `.env` или секретные ключи в репозиторий.  
✅ Используйте `.env.example` и добавьте `.env` в `.gitignore`.

