<template>
  <div class="chat-shell">
    <div class="chat-topbar">
      <div class="chat-agent">
        <span class="agent-icon">AI</span>
        <div>
          <strong>A2 Career Assistant</strong>
          <p><span class="status-dot"></span> Готов ответить HR</p>
        </div>
      </div>
      <span class="chat-caption">AI-профиль кандидата</span>
    </div>

    <div class="chat-body">
      <div class="chat-welcome">
        <p class="chat-label">Для рекрутеров и команд</p>
        <h3>Что вы хотите узнать обо мне?</h3>
        <p>Выберите готовый вопрос или задайте свой. Ассистент отвечает по данным моего профиля.</p>
      </div>

      <div class="prompt-list">
        <button v-for="prompt in prompts" :key="prompt.question" type="button" @click="selectPrompt(prompt)">
          {{ prompt.question }}
          <span aria-hidden="true">↗</span>
        </button>
      </div>

      <div v-if="error" class="chat-message chat-error">
        <strong>Не удалось получить ответ</strong>
        <p>{{ error }}</p>
      </div>

      <div v-if="response" class="chat-message chat-response">
        <strong>A2 Career Assistant</strong>
        <p>{{ response }}</p>
      </div>
    </div>

    <form class="chat-form" @submit.prevent="sendMessage">
      <button
        type="button"
        class="icon-button"
        :class="{ active: isRecognizing }"
        :disabled="isRecognizing"
        title="Голосовой ввод"
        aria-label="Голосовой ввод"
        @click="startRecognition"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3Z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3" />
        </svg>
      </button>
      <input
        v-model="input"
        type="text"
        placeholder="Например: какой у кандидата стек?"
        :disabled="loading"
        aria-label="Текст вопроса"
      />
      <button
        type="submit"
        class="send-button"
        :disabled="loading || !input.trim()"
        aria-label="Отправить"
      >
        <span v-if="loading">...</span>
        <svg v-else viewBox="0 0 24 24" aria-hidden="true">
          <path d="m5 12 14-7-4 14-3-6-7-1Z" />
          <path d="m12 13 7-8" />
        </svg>
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const prompts = [
  {
    question: 'Расскажи об опыте работы',
    answer:
      'A2 работает Junior+ Frontend Developer в компании «Вайти» с ноября 2024 года. В приложении Olhar он разрабатывает переиспользуемые UI-компоненты, формы и модальные окна, занимается авторизацией, ролевым доступом, интеграцией с JSON API и WebSocket, а также участвует в PHP-задачах и оптимизации интерфейса. До этого с октября 2023 по ноябрь 2024 года проходил стажировку Frontend-разработчика в Trucker, где работал с Vue.js, Nuxt.js, FSD, Pinia, REST API, Docker Compose и ESLint.',
  },
  {
    question: 'Какой у кандидата стек?',
    answer:
      'Основной стек A2: Vue.js, Nuxt.js, TypeScript, JavaScript, Pinia, Bootstrap, Axios, REST API и WebSocket. Также есть опыт работы с PHP, Docker Compose, FSD, ESLint и Git. Для этой AI-визитки используются Vue 3, Node.js, Express и OpenAI API.',
  },
  {
    question: 'Расскажи о проектах',
    answer:
      'Ключевые проекты A2: приложение Olhar в компании «Вайти» с переиспользуемыми компонентами, формами, авторизацией и ролевой логикой; текущая криптосоциальная сеть в разработке; AI Voice Assistant — эта интерактивная визитка с голосовым вводом и HR-ассистентом.',
  },
  {
    question: 'В чём сильные стороны кандидата?',
    answer:
      'Сильные стороны A2: разработка переиспользуемых компонентов, интеграция frontend с backend API, работа с авторизацией и ролями, рефакторинг и снижение дублирования кода. Он уделяет внимание поддерживаемости интерфейсов и оптимизации сценариев работы с большим объёмом данных.',
  },
]

const input = ref('')
const loading = ref(false)
const response = ref('')
const error = ref('')
const isRecognizing = ref(false)

interface SpeechRecognitionEvent {
  results: ArrayLike<ArrayLike<{ transcript: string }>>
}

interface SpeechRecognitionErrorEvent {
  error: string
}

interface SpeechRecognition {
  lang: string
  interimResults: boolean
  onstart: (() => void) | null
  onend: (() => void) | null
  onresult: ((event: SpeechRecognitionEvent) => void) | null
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null
  start: () => void
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition
}

interface WindowWithSpeechRecognition extends Window {
  webkitSpeechRecognition?: SpeechRecognitionConstructor
}

let recognition: SpeechRecognition | null = null

const SpeechRecognition = (window as WindowWithSpeechRecognition).webkitSpeechRecognition
if (SpeechRecognition) {
  recognition = new SpeechRecognition()
  recognition.lang = 'ru-RU'
  recognition.interimResults = false

  recognition.onstart = () => {
    isRecognizing.value = true
  }

  recognition.onend = () => {
    isRecognizing.value = false
  }

  recognition.onresult = (event: SpeechRecognitionEvent) => {
    input.value = event.results[0][0].transcript
  }

  recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
    console.error('Speech recognition error:', event.error)
    error.value = 'Голосовой ввод не сработал. Попробуй написать вопрос.'
    isRecognizing.value = false
  }
}

function selectPrompt(prompt: (typeof prompts)[number]) {
  input.value = ''
  error.value = ''
  response.value = prompt.answer
}

function startRecognition() {
  if (!recognition) {
    error.value = 'Голосовой ввод не поддерживается в этом браузере.'
    return
  }

  if (!isRecognizing.value) recognition.start()
}

async function sendMessage() {
  const message = input.value.trim()
  if (!message || loading.value) return

  loading.value = true
  error.value = ''
  response.value = ''

  try {
    const res = await fetch('https://chatgpt-search-9j0p.onrender.com/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    })

    const data = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(data.error || 'Сервис временно недоступен.')
    if (typeof data.reply !== 'string') throw new Error('AI вернул некорректный ответ.')

    response.value = data.reply
    input.value = ''
  } catch (caughtError) {
    console.error('Error:', caughtError)
    error.value = caughtError instanceof Error ? caughtError.message : 'Что-то пошло не так.'
  } finally {
    loading.value = false
  }
}
</script>
