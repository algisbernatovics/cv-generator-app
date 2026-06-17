# CV Generator App

A Next.js and React CV builder that lets users enter personal information and work experience, then preview the result live.

## Overview

This project focuses on client-side form state, component composition, and live preview behavior. It is a good example of CRUD-like interactions without a backend.

## Preview

![CV Generator screenshot](./screenshot.png)

The screenshot shows the split layout: form controls on one side and a live CV preview on the other.

## Features

- Controlled React form state for personal details.
- Add, edit, and delete work experience entries.
- Live preview split between input cards and output cards.
- Uses Ant Design components and a Tailwind-ready project setup.

## Tech Stack

- Next.js
- React
- TypeScript
- Ant Design
- Tailwind CSS

## Run

```bash
npm install
npm run dev
```

## Project Structure

- `src/components/CVGenerator.tsx` - main CV builder state and layout
- `src/components/` - input and output cards
- `src/app/` - Next.js app files
- `screenshot.png` - project screenshot

## License

MIT License. See [LICENSE](./LICENSE).
