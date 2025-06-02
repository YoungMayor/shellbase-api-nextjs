# 👐 Contributing to Cheatography

Thanks for your interest in contributing to **Cheatography** – a simple and powerful cheatsheet API for command-line tools!

We welcome all contributions: adding new commands, improving documentation, fixing bugs, or suggesting features.

## 🚀 Getting Started

1. **Fork** this repository
2. **Clone** it to your machine
3. Create a new branch:
   ```bash
   git checkout -b your-feature-name
   ```
4. Make your changes (see below)
5. Push your branch and open a Pull Request

## 📦 Adding New Commands or Categories

Cheatography is structured around categories (like Git, Bash, Docker) and subcommands. Here's how to contribute:

### ➕ Add a New Command (If Category exists)

- Open `src/data/subcommands/{category}.ts` and add your new command entry.
- Create a matching markdown file in: `src/data/markdowns/{category}/{command}.md`
   ##### This file should contain:
   - What the command does
   - Example usage
   - Flags/options
   - Additional notes

### 🗂 Add a New Category (If it doesn't exist yet)

- Add the category to: `src/data/categories-data.ts`
- Create a new file: `src/data/subcommands/{category}.ts`
- Create a folder for markdowns: `src/data/markdowns/{category}/`

## 💡 Suggestions & Issues

- Have a feature in mind? Open an issue!
- Found a bug? Please report it.
- Want to integrate something like a new CLI category? We’d love to hear from you.

## 🤝 Code Style & Conventions

Please follow the existing code style and naming conventions. If unsure, just do your best — we'll guide you in the PR review!

## ✅ Pull Request Checklist

- Added or updated command data
- Included a markdown file for explanation
- Tested that your changes do not break the build
- Opened a descriptive PR with what you’ve done

_Thanks again for your contribution! 🚀_
