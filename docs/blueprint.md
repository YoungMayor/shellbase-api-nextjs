# **App Name**: Cheatography API

## Core Features:

- Categories Endpoint: Serve a list of command categories (e.g. Git, Bash, Docker) via GET /api/categories.
- Subcommands Endpoint: Serve subcommands for a given category (e.g. branch, tag for Git) via GET /api/categories/:categorySlug.
- Command Detail Endpoint: Serve markdown-rich explanation (flags, examples, usage) via GET /api/commands/:commandSlug.
- Search Endpoint: Enable fuzzy searching across categories, subcommands, and explanations via GET /api/search?q=command.

## Style Guidelines:

- Primary color: Saturated blue (#4285F4) for a professional and trustworthy feel.
- Background color: Light gray (#F5F5F5), providing a clean and neutral backdrop for content.
- Accent color: A vibrant purple (#7952B3), used sparingly for interactive elements.
- Body and headline font: 'Inter' for a modern, clean and easily readable interface. (sans-serif)
- Use clear, simple icons from Lucide to represent categories and actions.
- Maintain a clean and consistent layout with ample white space to enhance readability.