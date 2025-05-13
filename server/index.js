import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { OpenAI } from 'openai'

dotenv.config()

// Проверим, читается ли ключ
console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY)

const app = express()
app.use(cors())
app.use(express.json())

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

app.post('/api/chat', async (req, res) => {
    const { message } = req.body
    if (!message) return res.status(400).json({ error: 'Message is required' })

    try {
        const chatResponse = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: message }],
        })
        const reply = chatResponse.choices[0]?.message?.content
        res.json({ reply })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))