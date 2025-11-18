# News Summarizer Agent

## Overview
- Base: React (Vite) with smooth GSAP animations.
- Data: NewsAPI (`top-headlines` and `everything` endpoints).
- Filters: Topic search, Country selector, Category selector.
- Behavior: If Country and Category are chosen, results come from those filters; otherwise topic-only search uses worldwide feed.
- Summarization: Client-side extractive summarizer condenses each article.

## UX Flow
- Enter a topic in the search box.
- Choose `Country` (or leave `Worldwide`) and optionally a `Category`.
- Press `Search`; results animate in with GSAP.
- Each card shows title, source, published time, auto summary, and a link to the full article.
- Active filters are shown as chips under the search bar.

## Tech Notes
- Animations: `gsap.from` on filter controls and on the article list for a polished feel.
- API Client: `src/api/newsApi.js` builds the appropriate endpoint:
  - Country/Category present → `v2/top-headlines` with `country`, `category`, `q`.
  - Otherwise → `v2/everything` with `q`, `language=en`, `sortBy=publishedAt`.
- Summarizer: `src/utils/summarize.js` ranks sentences using topic overlap and length heuristics, selecting top 2–3 sentences.
- Country & Category data: `src/data/countries.js` provides lists for selectors.

## Environment
- Set `VITE_NEWS_API_KEY` in `.env` (see `RUN_ON_WIFI.md`).
- Key is required at runtime; the app throws a clear error if missing.

## File Map
- `src/App.jsx` — main app, state and orchestration.
- `src/components/FilterBar.jsx` — search input and filter controls.
- `src/components/NewsList.jsx` — animated article cards with summaries.
- `src/api/newsApi.js` — NewsAPI fetch logic.
- `src/utils/summarize.js` — extractive summarization utility.
- `src/data/countries.js` — country and category options.