# אתר ישיבת מערבא – מכון רובין

Astro + [EmDash CMS](https://github.com/emdash-cms/emdash), מותאם ל-Cloudflare Workers (D1 + R2).
כל התוכן ניתן לעריכה בפאנל הניהול, בלי לגעת בקוד.

## הרצה מקומית
```bash
npm install
npm run dev          # http://localhost:4321
```
בכניסה הראשונה פותחים את האשף: `POST /_emdash/api/setup` (או דרך `http://localhost:4321/_emdash/admin`)
וטוענים את תוכן ההתחלה מ-`seed/seed.json`.
פאנל ניהול: `/_emdash/admin` (בפיתוח אפשר להיכנס עם `/_emdash/api/setup/dev-bypass?redirect=/_emdash/admin`).

## מה ניתן לערוך
- **אזורי האתר** (`sections`): כותרות וטקסטים של כל חלק + תמונה (ראש הישיבה, רקע ראשי).
- **פריטים** (`items`): כרטיסי מוח/נפש/גוף, מסלולי לימוד, שעות סדר היום, בוגרינו, נקודות מסלולי בגרות, תמונות הגלריה. בשדה "סוג" בוחרים לאן הפריט שייך, ו"סדר" קובע את המיקום.
- בטקסט ארוך: שורה ריקה = פסקה חדשה, `**כך**` = מודגש.
- כתובת כפתורי "הרשמה לישיבה": `src/lib/config.ts` (`REGISTER_URL`).

## פריסה ל-Cloudflare
ה-D1 (`marava`) וה-R2 (`maarava`) כבר מוגדרים ב-`wrangler.jsonc`.

חיבור הריפו ב-Workers Builds: Build command `npm run build`, Deploy command `npx wrangler deploy`.
(או מקומית: `npm run deploy`.)

אחרי הפריסה הראשונה:
1. להגדיר משתנה `EMDASH_SITE_URL` (Settings → Variables) לכתובת האתר.
2. לפתוח `https://<האתר>/_emdash/admin`, להשלים את אשף ההתקנה (כולל "טען תוכן לדוגמה") וליצור מנהל.
