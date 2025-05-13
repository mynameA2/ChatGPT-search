<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-[#202A60] text-white px-4">
    <div class="w-full max-w-xl text-center space-y-6">
      <div class="text-5xl font-bold">Hi there!</div>
      <div class="text-2xl font-semibold">What would you like to know?</div>
      <p class="text-blue-200 text-base">
        Use one of the most common prompts below<br />
        or ask your own question
      </p>
      <div class="bg-white rounded-full flex items-center px-4 py-3 shadow-md w-full">
        <button
          @click="startRecognition"
          class="text-blue-900 hover:text-blue-600 mr-2"
          title="Speak"
        >
          🎤
        </button>
        <input
          v-model="input"
          @keyup.enter="sendMessage"
          class="flex-1 bg-transparent outline-none text-blue-900 placeholder-blue-500"
          type="text"
          placeholder="Ask whatever you want"
        />
        <button
          @click="sendMessage"
          class="text-blue-900 hover:text-blue-600 ml-2"
          title="Send"
        >
          ➤
        </button>
      </div>
      <div v-if="response" class="mt-6 text-left text-white bg-blue-800 p-4 rounded-lg">
        <strong>AI:</strong> {{ response }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const input = ref('')
const loading = ref(false)
const response = ref('')
const isRecognizing = ref(false)

let recognition: SpeechRecognition | null = null

if ('webkitSpeechRecognition' in window) {
  const SpeechRecognition = (window as any).webkitSpeechRecognition
  recognition = new SpeechRecognition()
  recognition.lang = 'en-US'
  recognition.interimResults = false

  recognition.onstart = () => {
    isRecognizing.value = true
  }

  recognition.onend = () => {
    isRecognizing.value = false
  }

  recognition.onresult = (event: SpeechRecognitionEvent) => {
    const transcript = event.results[0][0].transcript
    input.value = transcript
  }

  recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
    console.error('Speech recognition error:', event.error)
    isRecognizing.value = false
  }
}

function startRecognition() {
  if (!recognition) {
    alert('Speech recognition is not supported in this browser.')
    return
  }

  if (isRecognizing.value) {
    console.warn('Recognition already in progress')
    return
  }

  recognition.start()
  isRecognizing.value = true
}

async function sendMessage() {
  if (!input.value.trim()) return

  loading.value = true
  try {
    const res = await fetch('https://chatgpt-search-9j0p.onrender.com/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input.value }),
    })

    const data = await res.json()
    response.value = data.reply
  } catch (error) {
    console.error('Error:', error)
  } finally {
    input.value = ''
    loading.value = false
  }
}
</script>