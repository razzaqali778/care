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
├─ components/
│  ├─ application-form.tsx          # Multi-step form (Stepper, validation, navigation)
│  ├─ header.tsx                    # App header + language switch
│  ├─ steps/
│  │  ├─ personal-info-step.tsx     # Step 1: personal fields + auto-translate on lang toggle
│  │  ├─ family-financial-step.tsx  # Step 2: family/financial fields
│  │  └─ situation-description-step.tsx # Step 3: textareas + AI Assist + error gating
│  └─ ui/                           # Shadcn UI primitives (typed, local)
│
├─ contexts/
│  └─ language-context.tsx          # Global language state ("en" | "ar"), RTL/LTR direction
│
├─ i18n/
│  └─ translations.ts               # English/Arabic translation dictionaries
│
├─ lib/
│  ├─ text-direction.ts              # RTL/LTR helpers
│  ├─ utils.ts                       # Shared helpers
│  └─ validations.ts                 # zod schemas (per-step + full form)
│
├─ pages/
│  ├─ Index.tsx                     # Landing page
│  ├─ Application.tsx               # Main form page (persist state)
│  └─ Submissions.tsx               # Saved submissions (localStorage)
│
├─ services/
│  └─ ai-assist.ts                  # OpenAI API chat + offline fallback & translators
│
├─ types/
│  └─ types.ts                      # Shared types (ApplicationState, AssistFieldKey, Lang)
│
├─ App.tsx / main.tsx               # Router + Providers (QueryClient, Tooltip, Language)
├─ index.css / App.css              # Tailwind base + custom styles
└─ vite.config.ts                   # Vite config
```

---

## 3. Key Concepts

### 📝 Multi-step Form

- Step 1: Personal Info
- Step 2: Family & Financial Info
- Step 3: Situation Description (AI Assist + auto-translation)
- Step validation is schema-driven (zod).

### 🌐 i18n & RTL

- `language-context.tsx` manages language (`en` / `ar`).
- Text direction auto-switches (LTR/RTL).
- Placeholders + labels update instantly.

### 🤖 AI Assist

- `ai-assist.ts` calls OpenAI Chat Completions API.
- If no API key → offline template-based fallback.
- Supports refine vs generate prompts.
- Integrated via `AiAssist` button in Step 3.

### ✅ Validation

- Step-level schemas in `validations.ts`.
- Errors only show if field touched or after submit attempt.

### 💾 Persistence

- Submissions stored in localStorage.
- Can be listed on `Submissions.tsx`.

---

## 4. Data Flow Diagram (Mermaid)

```mermaid
flowchart TD
  User -->|fills form| Form[ApplicationForm]
  Form --> Step1[Personal Info Step]
  Form --> Step2[Family & Financial Step]
  Form --> Step3[Situation Description]

  Step3 -->|AI Assist| AiService[ai-assist.ts]
  AiService -->|OpenAI API| OpenAI[(ChatGPT)]
  AiService -->|fallback| Offline[Offline Draft]

  Form --> Validation[Zod Schemas]
  Validation --> Errors[Field Errors]

  Form --> Storage[localStorage]
```

---

## 5. Development Guidelines

- **Types first** → always extend `types.ts`.
- **Validation** → all new fields require zod schema.
- **Translations** → add both `en` and `ar` entries.
- **UI** → prefer `ui/` primitives, follow Tailwind design.

---

## 6. Troubleshooting

- **Form shows errors immediately?** → ensure `shouldValidate` is `false` in auto-translations.
- **Arabic not detected?** → check regex in `isArabic()`.
- **AI Assist fails?** → verify `REACT_APP_OPENAI_API_KEY`.

---

## 7. Future Improvements

- Add tests for auto-translation and AI Assist.
- Export/import submissions (JSON).
- Multi-user profiles.

## 📸 Screenshots

<details>
  <summary><strong>Open gallery (1–14)</strong></summary>

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
