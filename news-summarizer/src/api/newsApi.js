export async function fetchNews({ country, category, topic, page = 1 }) {
  const params = new URLSearchParams()
  if (country && country !== 'worldwide') params.set('country', country)
  if (category) params.set('category', category)
  if (topic) params.set('topic', topic)
  params.set('page', String(page))

  const url = `/api/news?${params.toString()}`
  const res = await fetch(url)
  if (!res.ok) {
    const msg = await res.text()
    throw new Error(msg || 'Error fetching news')
  }
  const data = await res.json()
  return data.articles || []
}