# 🧩 تولیدکننده Icon Pack برای Svelte

این ابزار یک اسکریپت ساده است که فایل‌های SVG خام را به کامپوننت‌های قابل استفاده مجدد Svelte تبدیل می‌کند و به‌صورت خودکار یک **خروجی barrel export** نیز ایجاد می‌کند تا ایمپورت آیکون‌ها راحت‌تر شود.

> ✨ ساخته‌شده توسط [پیمان نادری](https://github.com/peymanath)  
> 📢 کانال تلگرام: [https://t.me/svelte_ch](https://t.me/svelte_ch)

---

## 📁 ساختار دایرکتوری

شما باید این پوشه را در مسیر زیر قرار دهید:

```
src/lib/icon-pack/
```

ساختار پیشنهادی:

```
icon-pack/
├── svg/              # فایل‌های SVG خام (ورودی)
├── icons/            # کامپوننت‌های تولیدشده .svelte (خروجی)
├── index.ts          # Barrel export (تولید خودکار)
├── script/
│   ├── convert-svgs-to-svelte.ts
│   └── tsconfig.scripts.json
```

---

## ⚙️ تنظیمات در `package.json`

اسکریپت زیر را به `package.json` روت پروژه اضافه کنید:

```json
"scripts": {
  "generate:icon-pack": "tsc --project src/lib/icon-pack/script/tsconfig.scripts.json && node src/lib/icon-pack/script/convert-svgs-to-svelte.js"
}
```

برای اجرا:

```bash
pnpm generate:icon-pack
```

این اسکریپت کارهای زیر را انجام می‌دهد:
- پاک کردن فولدر `icons/`
- تبدیل فایل‌های `.svg` به کامپوننت‌های `.svelte`
- ساخت فایل خروجی `index.ts` (برل اکسپورت)
- فرمت کردن خروجی با استفاده از Prettier

---

## 🛠️ اضافه کردن alias (اختیاری ولی پیشنهادی)

برای ساده‌تر کردن ایمپورت آیکون‌ها، این مورد را به `svelte.config.js` اضافه کنید:

```ts
kit: {
  alias: {
    $icons: './src/lib/icon-pack'
  }
}
```

سپس می‌توانید آیکون‌ها را این‌طور ایمپورت کنید:

```svelte
<script>
  import { ArrowLeft, PlusCircle } from '$icons';
</script>
```

---

## 🧼 Prettier

این اسکریپت از `pnpm prettier` برای فرمت خودکار فایل‌های تولید شده استفاده می‌کند.  
مطمئن شوید که Prettier در محیط شما نصب شده است.

---

> **توجه**
>
> دایرکتوری `icons` و فایل `icon-pack/index.ts` در مخزن گیت قرار نگرفته‌اند چون در هر اجرای `generate:icon-pack` به‌صورت خودکار ساخته می‌شوند.
> برای جلوگیری از ترک شدن این فایل‌ها در گیت، این مسیرها در `.gitignore` قرار داده شده‌اند.
> هر زمان که آیکونی اضافه یا آپدیت کردید، مجدد این اسکریپت را اجرا کنید.

---

## ✅ اعتبار

ساخته‌شده توسط **پیمان نادری**  
- GitHub: [@peymanath](https://github.com/peymanath)  
- کانال تلگرام: [https://t.me/svelte_ch](https://t.me/svelte_ch)

آزاد برای استفاده یا اشتراک‌گذاری — **ذکر منبع باعث خوشحالیه** 🙏
