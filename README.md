# Portfolio Template

A modern, customizable portfolio website built with **Next.js 16** and **Tailwind CSS 4**. Designed to be fully managed through JSON files — no cloning, no local setup, no code changes required. Just edit JSON content directly on GitHub and let the CI/CD pipeline deploy your site automatically.

## ✨ Features

- **Zero-code content management** — everything is driven by JSON files
- **Static export** — deploys as a fast, static website via GitHub Pages
- **Built-in content generator** — a visual UI (`/generator`) to create valid JSON without writing it by hand
- **Markdown support** — bio, descriptions, and article content support Markdown (with math via KaTeX)
- **Customizable theming** — choose fonts, primary/secondary colors, section order
- **Responsive design** — works on desktop, tablet, and mobile
- **10 font options** — Monaspace Neon, Montserrat, Roboto, Open Sans, Lato, Poppins, Inter, Raleway, Nunito, Playfair Display

## 📁 Project Structure

All your content lives in `src/contents/`:

```
src/contents/
├── metadata.json            # Site title, logo, colors, font, section order
├── profile.json             # Your name, bio, picture, social links
├── resume.json              # Work & education experiences
├── talks.json               # Talks and presentations
└── articles/
    ├── my-first-article.json
    └── another-article.json
```

> **That's it.** To update your portfolio, you only need to edit these JSON files. Each commit triggers the GitHub Actions pipeline which rebuilds and deploys automatically.

---

## 🚀 Quick Start (No Cloning Required)

### 1. Fork or use this template

Click **"Use this template"** (or Fork) on GitHub to create your own copy.

### 2. Enable GitHub Pages

Go to your repo **Settings → Pages → Source** and select **GitHub Actions**.

### 3. Edit your content

Go to your deployed site and navigate to `/generator`. Use the visual editors to create or update your content (profile, resume, articles, talks, metadata). Click **"Copy ..."** to grab the generated JSON, then paste it into the corresponding file in `src/contents/` on GitHub. Commit — the site rebuilds and deploys automatically.

---

## 📝 Content Files Reference

### `metadata.json` — Site Configuration

Controls global settings: site title, logo, colors, font, and which sections appear on the homepage. Use the `/generator/metadata` page to configure visually.

| Field | Type | Description |
|---|---|---|
| `title` | `string` | Site title displayed in the header |
| `logo` | `string?` | Logo as a base64 data URI or image URL |
| `primaryColor` | `string` | Primary accent color (hex) |
| `secondaryColor` | `string` | Secondary accent color (hex) |
| `font` | `string` | Font family (see options below) |
| `sectionOrder` | `string[]` | Order of homepage sections. Use any combination of: `profile`, `articles`, `resume`, `talks` |

**Available fonts:** `monaspace-neon`, `montserrat`, `roboto`, `open-sans`, `lato`, `poppins`, `inter`, `raleway`, `nunito`, `playfair-display`

---

### `profile.json` — About You

Your personal information displayed in the profile section. Use the `/generator/profile` page to edit visually.

| Field | Type | Description |
|---|---|---|
| `title` | `string` | Heading / greeting |
| `bio` | `string?` | Biography (Markdown supported) |
| `picture` | `string?` | Profile picture URL or base64 data URI |
| `socialLinks` | `array?` | List of social links |

**Supported platforms:** `twitter`, `linkedin`, `github`, `youtube`, `twitch`, `medium`, `scholar`, `huggingface`, `facebook`, `instagram`, `mail`

---

### `resume.json` — Experience & Education

Your work and education history. Use the `/generator/resume` page to manage visually.

| Field | Type | Description |
|---|---|---|
| `centered` | `boolean` | If `true`, uses a centered timeline layout splitting education (left) and work (right) |
| `experiences[].company` | `string` | Company or institution name |
| `experiences[].position` | `string` | Job title or degree |
| `experiences[].startDate` | `string` | Start date (`YYYY-MM-DD`) |
| `experiences[].endDate` | `string?` | End date (`YYYY-MM-DD`). Omit for current positions |
| `experiences[].description` | `string?` | Description (Markdown supported) |
| `experiences[].education` | `boolean` | `true` for education entries, `false` for work |

---

### `talks.json` — Talks & Presentations

Your talks and presentations. Use the `/generator/talk` page to manage visually.

| Field | Type | Description |
|---|---|---|
| `title` | `string` | Talk title |
| `description` | `string` | Talk description (Markdown supported) |
| `date` | `string` | Date (`YYYY-MM-DD`) |
| `flag` | `string?` | Badge label (e.g. conference name) |
| `links` | `array?` | Related links (slides, video, etc.) |

---

### `articles/*.json` — Articles & Publications

Each article is a separate JSON file in `src/contents/articles/`. The filename becomes the URL slug (e.g. `my-paper.json` → `/article/my-paper`). Use the `/generator/article` page to create articles visually.

| Field | Type | Description |
|---|---|---|
| `title` | `string` | Article title |
| `flag` | `string` | Badge (e.g. venue, status) |
| `date` | `string` | Publication date (`YYYY-MM-DD`) |
| `authors` | `string?` | Authors (Markdown & KaTeX supported for superscripts) |
| `tags` | `string[]?` | Tags for categorization |
| `content` | `string?` | Full article body in Markdown. If provided, the article gets its own page |
| `picture` | `string?` | Cover image URL |
| `links` | `array?` | External links (paper, code, demo, etc.) |

> **Tip:** Articles without `content` are displayed as preview cards only (no dedicated page). Articles with `content` get a full page at `/article/<slug>`.

---

## 🛠️ Content Generator (`/generator`)

Don't want to write JSON by hand? The site includes a full **visual content generator** at `/generator` with dedicated sub-pages for every content type. Each page provides a form, a **live preview** of how your content will look on the actual site, and a **"Copy" button** that puts the valid JSON on your clipboard — ready to paste into the corresponding file.

### Available Generator Pages

| Route | Purpose |
|---|---|
| `/generator` | Dashboard — links to all generators below |
| `/generator/profile` | Edit your name, bio (Markdown), picture, and social links. Pre-fills from current `profile.json` |
| `/generator/resume` | Add/remove/reorder work & education experiences, toggle centered layout. Pre-fills from current `resume.json` |
| `/generator/article` | Create an article with title, flag, date, authors, tags, links, cover image, and full Markdown content. Shows both the article preview card and the full article page |
| `/generator/talk` | Add/remove talks with title, date, flag, description, and links. Pre-fills from current `talks.json` |
| `/generator/metadata` | Configure site title, logo, primary/secondary colors, font picker, and section order. Shows a full homepage preview with your real data |

### How to use it

1. Open your deployed site (or run locally with `npm run dev`) and go to `/generator`
2. Pick the content type you want to create or edit
3. Fill in the form — a **live preview** updates in real-time as you type
4. Click the **"Copy ..."** button at the top of the page
5. Go to the corresponding JSON file on GitHub (`src/contents/profile.json`, `src/contents/articles/my-article.json`, etc.)
6. Paste the copied JSON, commit — the site rebuilds automatically

### Key details

- **Article generator** — articles are _not_ pre-filled (since each article is a new file). After copying the JSON, create a new file in `src/contents/articles/` with any name ending in `.json`. The filename becomes the URL slug.
- **Client-side only** — the generator runs entirely in the browser. No backend, no API calls. It's included in the static export so it works on your deployed GitHub Pages site too.

> **Workflow summary:** `/generator` → fill form → copy JSON → paste into `src/contents/` file on GitHub → commit → site auto-deploys.

---

## 🏗️ Local Development

If you want to run the site locally:

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build static export
npm run build
# Output is in the `out/` directory
```

---

## 🔧 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Build static export to `out/` |
| `npm run start` | Start production server |
| `npm run lint` | Run Biome linter |
| `npm run format` | Auto-format code with Biome |
| `npm run gen:schema` | Generate JSON schemas for validation |

---

## 📄 License

MIT
