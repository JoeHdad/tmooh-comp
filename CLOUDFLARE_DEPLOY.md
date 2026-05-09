# نشر المشروع على Cloudflare Workers

هذا المشروع مبني على **TanStack Start** ويُحزَّم تلقائياً كـ **Cloudflare Worker** مع أصول ثابتة (Static Assets).

## كيف يعمل البناء

عند تشغيل `npm run build`، ينتج مجلد `dist/` بهذا الهيكل:

```
dist/
├── client/          ← أصول ثابتة (JS, CSS, صور، خطوط)
└── server/
    ├── index.js     ← حزمة الـ Worker المُجمَّعة
    ├── wrangler.json← إعدادات wrangler المُولَّدة تلقائياً بعد البناء
    └── assets/      ← نسخة سيرفر من الأصول
```

> ⚠️ **مهم:** ملف `wrangler.jsonc` في الجذر مخصص لـ `vite dev` فقط. للنشر دائماً استخدم: `--config dist/server/wrangler.json`

---

## الخيار 1: النشر عبر GitHub Actions (موصى به)

أنشئ ملف `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloudflare Workers

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Deploy to Cloudflare
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          command: deploy --config dist/server/wrangler.json
```

أضف `CLOUDFLARE_API_TOKEN` في **GitHub → Settings → Secrets and Variables → Actions**.

---

## الخيار 2: النشر عبر Cloudflare Dashboard (Workers → Import a repository)

1. اذهب إلى [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Workers** → **Import a repository**
2. اختر مستودع GitHub الخاص بالمشروع
3. إعدادات البناء:

   | الإعداد | القيمة |
   |---|---|
   | **Build command** | `npm install && npm run build` |
   | **Deploy command** | `npx wrangler deploy --config dist/server/wrangler.json` |
   | **Root directory** | `/` |

4. أضف متغيرات البيئة في **Settings → Variables and Secrets**:

   | المتغير | القيمة |
   |---|---|
   | `VITE_SUPABASE_URL` | `https://ralzzfemcjsbbsrhnffa.supabase.co` |
   | `VITE_SUPABASE_PUBLISHABLE_KEY` | (من ملف `.env`) |
   | `VITE_SUPABASE_PROJECT_ID` | `ralzzfemcjsbbsrhnffa` |
   | `SUPABASE_URL` | نفس قيمة `VITE_SUPABASE_URL` |
   | `SUPABASE_PUBLISHABLE_KEY` | نفس قيمة `VITE_SUPABASE_PUBLISHABLE_KEY` |

   > متغيرات `VITE_*` للمتصفح (build-time)، والبقية للـ Worker (runtime).
   > احفظ أي مفاتيح حساسة كـ **Secret** وليس متغيراً عادياً.

5. اضغط **Deploy**. سيُربَط المشروع بدومين `tanstack-start-app.<your-subdomain>.workers.dev`

---

## الخيار 3: النشر اليدوي من جهازك

```bash
# 1. سجّل الدخول إلى Cloudflare
npx wrangler login

# 2. أضف الأسرار (مرة واحدة فقط)
npx wrangler secret put SUPABASE_URL
npx wrangler secret put SUPABASE_PUBLISHABLE_KEY

# 3. ابنِ وانشر دفعة واحدة
npm run deploy
# يعادل: npm run build && wrangler deploy --config dist/server/wrangler.json
```

---

## ربط دومين خاص

من **Workers & Pages → اختر مشروعك → Settings → Domains & Routes → Add Custom Domain**.

---

## ملاحظات

- ✅ جميع الصفحات (الرئيسية، الخدمات، الأعمال، عنّا، التواصل، الأدمن) تعمل بما فيها SSR
- ✅ `dist/client/` يُرفع كأصول ثابتة، و`dist/server/index.js` يعمل كـ Worker
- ✅ أي تحديث تدفعه إلى `main` يُنشر تلقائياً (مع GitHub Actions)
- ⚠️ لا تستخدم `npm ci` إذا تغيّر `package-lock.json`، استخدم `npm install` بدلاً منه
