// /Users/yash/Desktop/agents/news-summarizer/server.js
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const API_BASE = 'https://newsapi.org/v2'
const API_KEY = process.env.NEWS_API_KEY || process.env.VITE_NEWS_API_KEY

app.get('/api/news', async (req, res) => {
  try {
    const { country, category, topic, page = '1' } = req.query
    const params = new URLSearchParams()
    let endpoint = 'everything'

    if (country || category) {
      endpoint = 'top-headlines'
      if (country && country !== 'worldwide') params.set('country', country)
      if (category) params.set('category', category)
      if (topic) params.set('q', topic)
    } else {
      params.set('q', topic || 'news')
      params.set('language', 'en')
      params.set('sortBy', 'publishedAt')
    }

    params.set('pageSize', '20')
    params.set('page', String(page))

    const url = `${API_BASE}/${endpoint}?${params.toString()}`
    const resp = await fetch(url, { headers: { 'X-Api-Key': API_KEY } })
    if (!resp.ok) return res.status(resp.status).send(await resp.text())
    const data = await resp.json()
    res.json({ articles: data.articles || [] })
  } catch (e) {
    res.status(500).send(e.message || 'Server error')
  }
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`)
})