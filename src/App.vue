<script setup lang="ts">
import ChatBox from './components/ChatBox.vue'

const skills = [
  'Vue.js',
  'Nuxt.js',
  'TypeScript',
  'JavaScript',
  'Pinia',
  'Bootstrap',
  'Axios',
  'REST API',
  'WebSocket',
  'PHP',
  'Docker Compose',
  'FSD',
  'ESLint',
  'Git',
]

const experience = [
  {
    company: 'Вайти',
    role: 'Junior+ Frontend Developer',
    period: 'Ноябрь 2024 — настоящее время',
    description:
      'Разрабатываю и поддерживаю приложение Olhar: переиспользуемые UI-компоненты, формы, модальные окна, авторизация и ролевая модель доступа.',
    details: [
      'Интегрирую frontend с JSON API и WebSocket, настраиваю получение, отображение и обновление данных.',
      'Участвую в доработке серверной логики на PHP: подготовка данных для таблиц, контроллеры и дефолтные значения.',
      'Рефакторю ключевые модули, сокращаю дублирование и оптимизирую сценарии работы с большим объёмом данных.',
    ],
    tags: ['Vue.js', 'Pinia', 'Bootstrap', 'Axios', 'WebSocket', 'PHP'],
  },
  {
    company: 'Trucker',
    role: 'Junior Frontend-разработчик',
    period: 'Октябрь 2023 — ноябрь 2024',
    description:
      'Проектировал и разрабатывал frontend-части веб-приложений, создавал независимые компоненты и участвовал в развитии архитектуры.',
    details: [
      'Работал с Vue.js, Nuxt.js и Pinia, взаимодействовал с RESTful API через Axios.',
      'Использовал FSD, Docker Compose и WebSocket, участвовал в оптимизации производительности.',
      'Интегрировал и настраивал ESLint для повышения качества кода.',
    ],
    tags: ['Vue.js', 'Nuxt.js', 'FSD', 'Docker Compose', 'REST API', 'ESLint'],
  },
]

const projects = [
  {
    number: '01',
    title: 'Olhar',
    description:
      'Рабочее приложение с серверными данными: переиспользуемые компоненты, формы, модальные окна, авторизация, роли пользователей и оптимизация интерфейса.',
    tags: ['Vue.js', 'Pinia', 'Bootstrap', 'Axios', 'WebSocket', 'PHP'],
    link: '#experience',
    linkLabel: 'Опыт',
  },
  {
    number: '02',
    title: 'Криптосоциальная сеть',
    description:
      'Текущий проект: разрабатываю социальную сеть для криптосообщества. Подробности и технологические решения будут добавляться по мере развития продукта.',
    tags: ['In progress', 'Crypto', 'Social network'],
    link: '#assistant',
    linkLabel: 'Спросить AI',
  },
  {
    number: '03',
    title: 'AI Voice Assistant',
    description:
      'Эта AI-визитка: голосовой HR-ассистент на Vue 3 с распознаванием речи, backend-прокси и ответами по профилю кандидата.',
    tags: ['Vue 3', 'OpenAI API', 'Web Speech API', 'Express'],
    link: '#assistant',
    linkLabel: 'Попробовать',
  },
]
</script>

<template>
  <div class="site-shell">
    <header class="site-header">
      <a class="logo" href="#top" aria-label="A2 home">
        <span>A</span><strong>2</strong>
      </a>

      <nav class="desktop-nav" aria-label="Основная навигация">
        <a href="#about">Обо мне</a>
        <a href="#experience">Опыт</a>
        <a href="#projects">Проекты</a>
        <a href="#assistant">Спросить AI</a>
      </nav>

      <a class="header-link" href="#assistant">
        HR-поиск
        <span aria-hidden="true">↓</span>
      </a>
    </header>

    <main>
      <section id="top" class="hero section-grid">
        <div class="hero-copy">
          <p class="eyebrow"><span class="status-dot"></span> Открыт к новым проектам</p>
          <h1>
            Привет, я <span>A2.</span><br />
            Создаю понятные<br />
            digital-продукты.
          </h1>
          <p class="hero-text">
            Frontend-разработчик с коммерческим опытом. Создаю переиспользуемые компоненты,
            интегрирую API и превращаю сложные сценарии в понятные интерфейсы.
          </p>
          <div class="hero-actions">
            <a class="button button-primary" href="#projects">
              Смотреть проекты
              <span aria-hidden="true">↓</span>
            </a>
            <a class="text-link" href="https://github.com/mynameA2" target="_blank" rel="noreferrer">
              GitHub
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div class="hero-card-wrap" aria-hidden="true">
          <div class="hero-orbit orbit-one"></div>
          <div class="hero-orbit orbit-two"></div>
          <div class="hero-card">
            <p class="hero-card-label">Frontend developer</p>
            <div class="avatar-mark">A2</div>
            <div class="hero-card-footer">
              <span>Vue / TypeScript</span>
              <span>2026</span>
            </div>
          </div>
          <div class="floating-note note-top">API</div>
          <div class="floating-note note-bottom">UI</div>
        </div>

        <div class="hero-meta">
          <p>Scroll to explore</p>
          <span></span>
        </div>
      </section>

      <section id="about" class="about section-grid section-block">
        <p class="section-kicker">01 / Обо мне</p>
        <div class="section-content about-content">
          <h2>Делаю интерфейсы,<br /><span>которыми приятно пользоваться.</span></h2>
          <div class="about-columns">
            <p>
              Люблю аккуратный код, ясную структуру и продукты, которые решают задачу без
              лишнего шума. Быстро погружаюсь в контекст и довожу идеи до работающего результата.
            </p>
            <p>
              Работал с приложениями на Vue.js и Nuxt.js, клиент-серверным взаимодействием,
              авторизацией и ролевым доступом. Сейчас также разрабатываю криптосоциальную сеть.
            </p>
          </div>
          <div class="skill-list" aria-label="Технологии">
            <span v-for="skill in skills" :key="skill">{{ skill }}</span>
          </div>
        </div>
      </section>

      <section id="experience" class="experience section-block">
        <div class="section-heading section-grid">
          <p class="section-kicker">02 / Опыт</p>
          <div class="section-content">
            <h2>Коммерческая разработка<span>.</span></h2>
          </div>
        </div>

        <div class="experience-list">
          <article v-for="job in experience" :key="job.company" class="experience-card section-grid">
            <p class="experience-period">{{ job.period }}</p>
            <div class="experience-main">
              <p class="experience-company">{{ job.company }}</p>
              <h3>{{ job.role }}</h3>
              <p>{{ job.description }}</p>
              <ul>
                <li v-for="detail in job.details" :key="detail">{{ detail }}</li>
              </ul>
              <div class="project-tags">
                <span v-for="tag in job.tags" :key="tag">{{ tag }}</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section id="projects" class="projects section-block">
        <div class="section-heading section-grid">
          <p class="section-kicker">03 / Проекты</p>
          <div class="section-content">
            <h2>Избранные работы<span>.</span></h2>
          </div>
        </div>

        <div class="project-list">
          <article v-for="project in projects" :key="project.number" class="project-card section-grid">
            <p class="project-number">{{ project.number }}</p>
            <div class="project-main">
              <h3>{{ project.title }}</h3>
              <p>{{ project.description }}</p>
              <div class="project-tags">
                <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
              </div>
            </div>
            <a class="project-link" :href="project.link">
              {{ project.linkLabel }}
              <span aria-hidden="true">↗</span>
            </a>
          </article>
        </div>
      </section>

      <section id="assistant" class="assistant-section section-block">
        <div class="assistant-intro section-grid">
          <p class="section-kicker">04 / Для HR</p>
          <div class="section-content">
            <h2>Узнай обо мне больше<span>.</span></h2>
            <p>
              AI-помощник ответит на вопросы о моих навыках, проектах и рабочем подходе.
              Можно написать вопрос или использовать голосовой ввод.
            </p>
          </div>
        </div>
        <ChatBox />
      </section>
    </main>

    <footer id="contact" class="site-footer section-grid">
      <p class="section-kicker">05 / Контакты</p>
      <div class="footer-main">
        <p class="eyebrow"><span class="status-dot"></span> Давай сделаем что-нибудь классное</p>
        <h2>Есть идея?<br /><span>Напиши мне.</span></h2>
        <a class="button button-primary" href="https://github.com/mynameA2" target="_blank" rel="noreferrer">
          Связаться через GitHub
          <span aria-hidden="true">↗</span>
        </a>
        <div class="footer-bottom">
          <a href="#top">A2 / Portfolio</a>
          <p>Designed & built with Vue 3</p>
        </div>
      </div>
    </footer>
  </div>
</template>
