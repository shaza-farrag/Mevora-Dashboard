# دليل الشغل الجماعي (عشان مفيش Conflicts)

## هيكل المشروع
```
src/
├── components/
│   ├── layout/      ← Sidebar / Navbar / DashboardLayout  (شخص واحد بس يعدل فيهم)
│   ├── users/       ← مكونات صفحة Users بس
│   ├── ui/          ← مكونات مشتركة (button...)
│   └── <feature>/   ← اعمل فولدر لكل صفحة (products/, orders/, carts/ ...)
├── pages/           ← كل صفحة ملف لوحده (Users.jsx, Orders.jsx ...)
├── config/navLinks.js   ← روابط السايدبار (سطر لكل لينك)
├── data/            ← بيانات تجريبية (mockUsers.js ...)
├── api/ context/ routes/ utils/
```

## قواعد ذهبية
1. **كل واحد يشتغل في صفحته + فولدر مكوناتها بس** (مثلاً `pages/Orders.jsx` و `components/orders/`).
2. **متعدلش في ملفات غيرك.** الملفات المشتركة (`AppRouter.jsx`, `navLinks.js`, `main.jsx`, `index.css`, `package.json`) لو محتاج تعدل فيها: عدّل سطر واحد بس واعمل commit صغير وادفعه بسرعة.
3. **كل واحد على branch لوحده**: `git checkout -b feature/orders` ثم Pull Request على `main`.
4. قبل ما تبدأ كل يوم: `git pull origin main`، وقبل الـ push: `git pull --rebase origin main`.
5. لو ضفت مكتبة جديدة: `npm install <pkg>` وابعت لباقي الفريق يعملوا `npm install` (ملف `package.json` و`package-lock.json` أكتر حاجة بتعمل conflicts).
6. الألوان/الـ dark mode: استخدم نفس كلاسات `dark:` المستخدمة في صفحة Users كمرجع.
