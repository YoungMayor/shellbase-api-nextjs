# Cheatography

**Your one-stop cheatsheet API for command-line power tools.**

Cheatography is a modern, developer-friendly API and admin console that powers command-line cheatsheets for tools like `git`, `bash`, `docker`, and more — complete with an OpenAPI-like tester, markdown-based documentation, and Gemini AI-powered command help.

---

## 🚀 Features

- ✅ **Flat-file JSON + Markdown structure** (no DB, lightning fast)
- 🛠️ **REST API** for fetching categories, subcommands, and command explanations
- 🧠 **Gemini AI integration** for natural language Q&A (e.g., _"How do I list remote git branches?"_) (Coming Soon)
- 🧪 **Swagger-like API tester** baked into the admin console
- 🖥️ **Web-based admin UI** to manage categories and commands
- 🔍 **Search support** (local, fast, extensible)
- 📱 Built with a **Flutter app client** in mind (coming soon)

---

## 📚 API Endpoints

| Method | Endpoint                | Description                                            |
| ------ | ----------------------- | ------------------------------------------------------ |
| `GET`  | `/api/categories`       | List all top-level categories                          |
| `GET`  | `/api/commands`         | List all commands                                      |
| `GET`  | `/api/commands/:slug`   | Fetch a command + markdown                             |
| `GET`  | `/api/search?query=...` | Search across commands                                 |
| `POST` | `/api/ask`              | Ask a natural language question (powered by Gemini AI) |

## 🔧 Tech Stack

- Next.js (App Router)
- Gemini Pro (via Vertex AI) - for AI command assistant
- Markdown - for command documentation
- TypeScript - everything typed and structured

## 🤖 Example Use Case

```json
# GET /api/commands/tag
{
  "slug": "tag",
  "category": "git",
  "name": "tag",
  "shortDescription": "Create or manage Git tags",
  "markdown": "# Git Tag\n\nTags mark specific points in history...\n"
}
```

## 📲 Coming Soon

- ✅ Flutter mobile app powered by this API
- 🔤 Multilingual support

## 🧠 Why Cheatography?

> _Because the command line is powerful — but remembering every flag, parameter, or obscure tool? That's what we're here for._

Cheatography helps developers become more productive without switching contexts, Googling every other minute, or digging through man pages.

## 👐 Contributing

Want to contribute more commands or categories?

- Fork this repo
- Add to data/commands.json and drop a markdown file into data/markdowns
- Add new command categories to `src/data/categories-data.ts` (if category doesn't exist) commands to `src/data/subcommands/{category}.ts` and markdowns to `src/data/markdowns/{category}/{command}.ts`
- Open a PR!

Feel free to suggest features, add new integrations, or report bugs.

[Read More About Contributing](CONTRIBUTING.md)

## 🧾 License

[MIT](LICENSE) — feel free to fork, remix, and use in your own stack.

---

![MIT](https://img.shields.io/badge/license-MIT-green)
![Gemini](https://img.shields.io/badge/powered_by-Gemini-blue)
![Nextjs](https://img.shields.io/badge/built_with-NextJS-black)

🙌 Made with 🫶🏾 by [@youngmayor](https://github.com/youngmayor) under **MayR Labs**
