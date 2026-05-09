# نشر المشروع على Cloudflare

هذا المشروع مبني على **TanStack Start** ويُحزَّم تلقائياً كـ **Cloudflare Worker** مع أصول ثابتة (Static Assets). هذا الأسلوب الحديث المعتمد من Cloudflare ويحل محل Cloudflare Pages للتطبيقات التي تحتاج SSR / Server Functions.

## الخيار 1: النشر التلقائي عبر GitHub (موصى به)

1. ادخل إلى [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Workers** → **Import a repository**.
2. اختر مستودع GitHub الخاص بالمشروع وفوّض Cloudflare.
3. إعدادات البناء:
   - **Build command:** `npm install && npm run build`
     > ⚠️ لا تستخدم `bun install --frozen-lockfile` — نسخة bun على Cloudflare قديمة وقد تفشل مع لوكفايل المشروع. استخدم npm أو `bun install --no-frozen-lockfile`.
   - **Deploy command:** `npx wrangler deploy` (افتراضي)
   - **Root directory:** `/`
4. أضف متغيرات البيئة في **Settings → Variables and Secrets**:

   | المتغير | القيمة |
   |---|---|
   | `VITE_SUPABASE_URL` | `https://ralzzfemcjsbbsrhnffa.supabase.co` |
   | `VITE_SUPABASE_PUBLISHABLE_KEY` | (من ملف `.env`) |
   | `VITE_SUPABASE_PROJECT_ID` | `ralzzfemcjsbbsrhnffa` |
   | `SUPABASE_URL` | نفس قيمة `VITE_SUPABASE_URL` |
   | `SUPABASE_PUBLISHABLE_KEY` | نفس قيمة `VITE_SUPABASE_PUBLISHABLE_KEY` |

   > ملاحظة: متغيرات `VITE_*` للمتصفح (build-time)، والبقية للسيرفر.
   > لا تضع `SUPABASE_SERVICE_ROLE_KEY` إلا إذا كنت تستخدمه فعلياً، واحفظه كـ **Secret** وليس متغيراً عادياً.

5. اضغط **Deploy**. سيُربَط المشروع بدومين `tanstack-start-app.<your-subdomain>.workers.dev`.

## الخيار 2: النشر اليدوي من جهازك

```bash
# 1. سجّل الدخول إلى Cloudflare
bunx wrangler login

# 2. أضف الأسرار (مرة واحدة)
bunx wrangler secret put VITE_SUPABASE_URL
bunx wrangler secret put VITE_SUPABASE_PUBLISHABLE_KEY
bunx wrangler secret put VITE_SUPABASE_PROJECT_ID

# 3. ابنِ وانشر
bun run deploy
```

## ربط دومين خاص

من **Workers & Pages → اختر مشروعك → Settings → Domains & Routes → Add Custom Domain**.
أضف الدومين، وسيُحدَّث DNS تلقائياً إن كان دومينك على Cloudflare.

## ملاحظات

- ✅ جميع الصفحات (الرئيسية، الخدمات، الأعمال، عنّا، التواصل، الأدمن) ستعمل بما فيها SSR والـ server functions.
- ✅ شارة Lovable لن تظهر على نسخة Cloudflare.
- ✅ أي تحديث تدفعه إلى GitHub سيُنشر تلقائياً.
- البناء يُخرِج `dist/client` (أصول ثابتة) و `dist/server` (Worker). إعدادات `wrangler.jsonc` تربطهما تلقائياً.
