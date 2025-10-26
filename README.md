# Care Fund – README & Architecture

## 1. Project Setup

```bash
# Install deps
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Environment:

```env
VITE_OPENAI_API_KEY==sk-xxxx   # optional, for AI Assist
VITE_OPENAI_MODEL=gpt-4o-mini # default fallback model
```

Without a key, AI features fall back to safe offline behavior.

---

## 2. Architecture Overview

```text
src/
  components/
    ApplicationForm.tsx        # Multi-step form shell (re-exported feature component)
    Header.tsx                 # App header + language switch
    steps/                     # Step-specific inputs
    ui/                        # Local shadcn/ui primitives
  features/
    application/               # Stepper hook, form constants, utilities
    assist/                    # AI Assist prompts, dialog, services
  contexts/                    # Global providers (Language, etc.)
  hooks/                       # Shared hooks (drafts, translations, toasts)
  lib/                         # API client, validation helpers, misc utils
  pages/                       # Route-level screens (Index, Application, Submissions)
  constants/                   # Routes, form config, enums, labels
  styles/                      # Tailwind configuration and global CSS
  App.tsx / main.tsx           # Router + providers bootstrap
  vite.config.ts               # Vite configuration
```

---

## 3. Key Concepts

### Multi-step Form

- Step 1: Personal info
- Step 2: Family & financial details
- Step 3: Situation description (AI Assist + translation)
- Zod schemas gate each step and the full payload before submission.

### i18n & RTL

- `LanguageContext` manages the locale (`en` / `ar`) and direction.
- Layout flips automatically; labels and placeholders re-render instantly.

### AI Assist

- `features/assist/services/aiAssist.ts` wraps OpenAI Chat Completions.
- Offline templates guarantee deterministic copy when no API key exists.
- Prompt builders support both generate and refine flows.

### Validation & Persistence

- Shared zod schemas enforce constraints.
- Drafts live in `localStorage` so users can resume work.
- Submissions listing reads/writes from the same storage key.

---

## 5. Development Guidelines

- **Types first** - extend the shared types module before wiring new data.
- **Validation** - every new field belongs in the zod schemas.
- **Translations** - always add both `en` and `ar` entries.
- **UI** - prefer `components/ui` primitives for consistent styling.

---

## 6. Troubleshooting

- **Form shows errors immediately?** Ensure translation hooks do not trigger validation.
- **Arabic not detected?** Double-check language helpers in `constants/lang.ts`.
- **AI Assist fails?** Verify `VITE_OPENAI_API_KEY` or rely on the offline fallback.

## 7. Future Improvements

- Add tests for auto-translation and AI Assist.
- Export/import submissions (JSON).
- Multi-user profiles.

## Screenshots

<details>
  <summary><strong>Open gallery (1-14)</strong></summary>

  <p align="center">
    <img src="imgs/1.png"  alt="Screenshot 1"  width="260" />
    <img src="imgs/2.png"  alt="Screenshot 2"  width="260" />
    <img src="imgs/3.png"  alt="Screenshot 3"  width="260" />
    <img src="imgs/4.png"  alt="Screenshot 4"  width="260" />
  </p>
  <p align="center">
    <img src="imgs/5.png"  alt="Screenshot 5"  width="260" />
    <img src="imgs/6.png"  alt="Screenshot 6"  width="260" />
    <img src="imgs/7.png"  alt="Screenshot 7"  width="260" />
    <img src="imgs/8.png"  alt="Screenshot 8"  width="260" />
  </p>
  <p align="center">
    <img src="imgs/9.png"  alt="Screenshot 9"  width="260" />
    <img src="imgs/10.png" alt="Screenshot 10" width="260" />
    <img src="imgs/11.png" alt="Screenshot 11" width="260" />
    <img src="imgs/12.png" alt="Screenshot 12" width="260" />
  </p>
  <p align="center">
    <img src="imgs/13.png" alt="Screenshot 13" width="260" />
    <img src="imgs/14.png" alt="Screenshot 14" width="260" />
  </p>
</details>
