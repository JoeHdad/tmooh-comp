# نشر المشروع على Netlify

## خطوات النشر

1. ادخل إلى [app.netlify.com](https://app.netlify.com) → **Add new site → Import from Git**.
2. اختر مستودع GitHub الذي ربطته للتو.
3. تأكد من إعدادات البناء (مقروءة تلقائياً من `netlify.toml`):
   - **Build command:** `bun run build`
   - **Publish directory:** `.output/public`
4. أضف متغيرات البيئة في **Site settings → Environment variables**:

   | Key | Value |
   |---|---|
   | `VITE_SUPABASE_URL` | `https://ralzzfemcjsbbsrhnffa.supabase.co` |
   | `VITE_SUPABASE_PUBLISHABLE_KEY` | (انسخها من ملف `.env`) |
   | `VITE_SUPABASE_PROJECT_ID` | `ralzzfemcjsbbsrhnffa` |

5. اضغط **Deploy site**.

## ملاحظات مهمة

- **شارة Lovable لن تظهر** على نسخة Netlify.
- جميع صفحات الموقع العامة (الرئيسية، الخدمات، الأعمال، عنّا، التواصل) ولوحة الأدمن تعمل لأنها تتصل بـ Supabase مباشرة من المتصفح.
- إذا أردت ربط دومين خاص، استخدم **Domain settings** في Netlify.
- أي تحديث تدفعه إلى GitHub (سواء من Lovable أو يدوياً) سيُنشر تلقائياً على Netlify.
