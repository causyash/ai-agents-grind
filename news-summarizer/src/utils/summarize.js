const STOPWORDS = new Set([
  'the','is','in','at','of','a','an','to','and','or','on','for','with','as','by','from','that','this','it','are','was','were','be','has','have','had','not','but','their','his','her','they','them','you','your','our','about'
])

function tokenize(str) {
  return (str || '')
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
}

export function summarizeArticle(article, topic = '') {
  const text = [article?.description, article?.content]
    .filter(Boolean)
    .join(' ')
  if (!text) return ''

  const sentences = text.split(/(?<=[.!?])\s+/)
  const topicWords = tokenize(topic).filter(w => !STOPWORDS.has(w))

  const scores = sentences.map(s => {
    const words = tokenize(s).filter(w => !STOPWORDS.has(w))
    const freq = new Map()
    for (const w of words) freq.set(w, (freq.get(w) || 0) + 1)
    let score = 0
    for (const tw of topicWords) {
      score += (freq.get(tw) || 0) * 2
    }
    const len = words.length
    const lengthScore = 1 - Math.abs(len - 24) / 24 // prefer medium length
    score += Math.max(0, lengthScore)
    return { s, score }
  })

  const top = scores.sort((a, b) => b.score - a.score).slice(0, 3)
  let summary = top.map(t => t.s.trim()).join(' ')
  if (!summary.endsWith('.')) summary += '.'
  return summary
}