import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { OpenAI } from 'openai'

dotenv.config()

if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is required')
}

const app = express()
app.set('trust proxy', 1)
app.use(cors())
app.use(express.json())

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const CANDIDATE_PROFILE = `
Имя: A2.
Роль: frontend-разработчик с коммерческим опытом.
Позиционирование: создаёт понятные современные digital-продукты, уделяет внимание деталям,
аккуратному коду и ясной структуре.
Навыки: Vue.js, Nuxt.js, TypeScript, JavaScript, Pinia, Bootstrap, Axios, REST API,
WebSocket, PHP, Docker Compose, FSD, ESLint, Git, Tailwind CSS, Node.js и Express.

Опыт работы:
1. Вайти — Junior+ Frontend Developer, ноябрь 2024 — настоящее время.
Работает над приложением Olhar. Разрабатывает и поддерживает переиспользуемые UI-компоненты
для работы с серверными данными на Vue.js, Pinia и Bootstrap. Реализовал и рефакторил
авторизацию и ролевую логику доступа, интеграцию с JSON API и WebSocket. Разрабатывал
универсальные компоненты форм и модальных окон для создания и редактирования сущностей.
Участвовал в доработке серверной логики на PHP: подготовка данных для таблиц, настройка
контроллеров и передача дефолтных значений на frontend. Рефакторил модули клиентской части,
сокращал дублирование и участвовал в оптимизации производительности интерфейса при работе
с большим объёмом данных.

2. Trucker — стажёр Frontend-разработчик, октябрь 2023 — ноябрь 2024.
Проектировал и разрабатывал frontend-части веб-приложений на Vue.js и Nuxt.js. Создавал
независимые компоненты на основе FSD, участвовал в проектировании архитектуры и оптимизации
производительности. Использовал Pinia, Docker Compose, WebSocket и Axios для взаимодействия
с RESTful API. Интегрировал и настраивал ESLint.

Проекты:
1. Olhar — рабочее приложение в компании Вайти. Описано в опыте работы.
2. Криптосоциальная сеть — текущий проект в разработке. Дополнительные детали и технологии
пока не указаны в профиле.
3. AI Voice Assistant — эта AI-визитка: голосовой HR-ассистент на Vue 3 с Web Speech API,
backend-прокси на Node.js и Express, интеграцией OpenAI API, обработкой состояний интерфейса,
валидацией запросов и rate limit.
Интересы: современная frontend-разработка, применение AI в веб-приложениях и разработка
криптосоциальной сети.
GitHub: https://github.com/mynameA2.
Статус: открыт к новым проектам.
`

const ASSISTANT_INSTRUCTIONS = `
Ты карьерный AI-ассистент frontend-разработчика A2 на его сайте-визитке.
Отвечай рекрутерам и представителям команд на русском языке, кратко и профессионально.
Используй только данные профиля ниже. Не придумывай опыт работы, образование, город,
контакты, уровень английского, зарплатные ожидания или другие отсутствующие сведения.
Если данных для ответа нет, прямо скажи, что информация пока не указана в профиле,
и предложи связаться с кандидатом через GitHub.

Профиль кандидата:
${CANDIDATE_PROFILE}
`

const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX_REQUESTS = 20
const requestCounts = new Map()

function rateLimit(req, res, next) {
    const now = Date.now()
    const entry = requestCounts.get(req.ip)

    if (!entry || now - entry.startedAt >= RATE_LIMIT_WINDOW_MS) {
        requestCounts.set(req.ip, { count: 1, startedAt: now })
        return next()
    }

    if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
        return res.status(429).json({ error: 'Too many requests. Please try again later.' })
    }

    entry.count += 1
    next()
}

setInterval(() => {
    const expiresBefore = Date.now() - RATE_LIMIT_WINDOW_MS

    for (const [ip, entry] of requestCounts) {
        if (entry.startedAt < expiresBefore) requestCounts.delete(ip)
    }
}, RATE_LIMIT_WINDOW_MS).unref()

app.post('/api/chat', rateLimit, async (req, res) => {
    const { message } = req.body ?? {}
    if (typeof message !== 'string' || !message.trim()) {
        return res.status(400).json({ error: 'Message is required' })
    }

    if (message.length > 4000) {
        return res.status(400).json({ error: 'Message is too long' })
    }

    try {
        const chatResponse = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: ASSISTANT_INSTRUCTIONS },
                { role: 'user', content: message.trim() },
            ],
        })
        const reply = chatResponse.choices[0]?.message?.content

        if (!reply) {
            return res.status(502).json({ error: 'The AI returned an empty response' })
        }

        res.json({ reply })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
