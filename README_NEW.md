# 🎮 Voxel Market - 3D Models Marketplace

سوق إلكتروني متطور لبيع وشراء نماذج 3D للألعاب والمشاريع الإبداعية، مع **عارض 3D تفاعلي** مبني بتقنيات حديثة ومصمم وفقاً لمبادئ **HCI**.

## 🎉 تم نقل الفرونت إند إلى Laravel بنجاح!

المشروع الآن يعمل بـ **Laravel + Livewire + Alpine.js** بدلاً من React!

---

## ⚡ تشغيل سريع (5 دقائق)

```bash
# 1. الانتقال للمجلد
cd backend

# 2. تثبيت Dependencies
composer install

# 3. إعداد البيئة
cp .env.example .env
php artisan key:generate

# 4. إعداد Database (في .env)
DB_DATABASE=voxel_market
DB_USERNAME=root
DB_PASSWORD=

# 5. إنشاء Database
CREATE DATABASE voxel_market;

# 6. تشغيل Migrations & Seeder
php artisan migrate
php artisan db:seed --class=VoxelMarketSeeder

# 7. تشغيل السيرفر
php artisan serve
```

**افتح المتصفح:** http://127.0.0.1:8000

---

## 👤 بيانات الدخول

**Admin:**
- Email: `admin@voxelmarket.com`
- Password: `password`

**User:**
- Email: `user@voxelmarket.com`
- Password: `password`

---

## ✅ ما تم إنجازه

### الصفحات الجاهزة
- ✅ **Home** (`/`) - صفحة رئيسية تفاعلية كاملة
- ✅ **Browse** (`/browse`) - تصفح النماذج مع فلاتر متقدمة

### الميزات الجاهزة
- ✅ Navbar تفاعلي مع Search و Dropdowns
- ✅ Cart System (Session-based)
- ✅ Category Filters (Alpine.js)
- ✅ Responsive Design
- ✅ HCI Principles مطبقة
- ✅ Database مع 9 نماذج و 6 مبدعين

---

## ⏳ الصفحات المتبقية

1. **Model Detail** (`/model/{id}`) - مع عارض 3D
2. **Creators** (`/creators`) - قائمة المبدعين
3. **Creator Profile** (`/creator/{name}`) - صفحة المبدع
4. **Cart** (`/cart`) - سلة المشتريات
5. **Login/Register** - صفحات التسجيل
6. **About/Support/Settings** - صفحات إضافية
7. **Admin Dashboard** - لوحة الإدارة

---

## 🛠️ التقنيات المستخدمة

### Backend
- **Laravel 11** - PHP Framework
- **Livewire 4.3** - Interactive Components
- **MySQL** - Database
- **Laravel Sanctum** - Authentication

### Frontend
- **Blade Templates** - Templating Engine
- **Alpine.js 3.x** - JavaScript Framework
- **Custom CSS** - Dark Theme
- **Three.js** - 3D Viewer (قيد الإضافة)

---

## 📚 الدليل الشامل

### للبدء السريع
- **`START_HERE.md`** - ابدأ من هنا (5 دقائق)
- **`backend/QUICK_START.md`** - دليل التشغيل السريع

### للمطورين
- **`SUMMARY.md`** - ملخص شامل للمشروع
- **`backend/README_AR.md`** - دليل شامل بالعربية
- **`backend/MIGRATION_GUIDE.md`** - دليل النقل التفصيلي
- **`PROJECT_STATUS.md`** - حالة المشروع

---

## 📁 هيكل المشروع

```
voxel-market/
├── backend/                          ✅ Laravel Application
│   ├── app/Http/Controllers/
│   │   ├── WebController.php         ✅ Web Pages
│   │   ├── AuthController.php        ✅ Authentication
│   │   └── VoxelModelController.php  ✅ Models API
│   ├── resources/views/
│   │   ├── layouts/app.blade.php     ✅ Main Layout
│   │   ├── home.blade.php            ✅ Home Page
│   │   ├── browse.blade.php          ✅ Browse Page
│   │   └── ...                       ⏳ More pages
│   ├── database/
│   │   ├── migrations/               ✅ 6 Tables
│   │   └── seeders/                  ✅ Sample Data
│   └── routes/
│       ├── web.php                   ✅ Web Routes
│       └── api.php                   ✅ API Routes
├── src/                              📦 React (للمرجع فقط)
├── START_HERE.md                     ✅ ابدأ من هنا
├── SUMMARY.md                        ✅ ملخص المشروع
└── README.md                         ✅ هذا الملف
```

---

## 🎨 مبادئ HCI المطبقة

### 1. Feedback (التغذية الراجعة) ✅
- Toast notifications
- Loading states
- Hover effects
- Button states

### 2. Consistency (الاتساق) ✅
- نظام ألوان موحد
- Typography متناسق
- Button styles متشابهة

### 3. Visibility (الوضوح) ✅
- Cart badge
- Clear labels
- Icons + Text

### 4. Affordance (القابلية للاستخدام) ✅
- Buttons تبدو قابلة للضغط
- Links تتغير عند hover
- Cursor changes

### 5. Error Prevention (منع الأخطاء) ✅
- Validation
- Disabled states
- Clear error messages

---

## 🎯 الخطوة التالية

### أولوية عالية ⭐⭐⭐
إنشاء صفحة **Model Detail** مع عارض 3D تفاعلي باستخدام Three.js

```bash
# إنشاء الملف
touch backend/resources/views/model-detail.blade.php

# استخدم نفس التصميم من home.blade.php
# أضف Three.js للعارض 3D
```

---

## 🐛 حل المشاكل

### خطأ: Class not found
```bash
composer dump-autoload
```

### خطأ: Database not found
```sql
CREATE DATABASE voxel_market;
```

### خطأ: 419 Page Expired
```html
<meta name="csrf-token" content="{{ csrf_token() }}">
```

---

## 📞 الدعم

إذا واجهت مشكلة:
1. راجع `START_HERE.md`
2. راجع `backend/QUICK_START.md`
3. راجع `SUMMARY.md`

---

## 🎉 الخلاصة

```
┌─────────────────────────────────────────┐
│  ✅ المشروع جاهز للاستخدام!             │
│                                         │
│  🏠 Home Page: جاهزة                    │
│  🔍 Browse Page: جاهزة                  │
│  🛒 Cart System: جاهز                   │
│  🎨 Design: كامل ومتجاوب                │
│  💾 Database: كاملة مع بيانات           │
│                                         │
│  🎯 الخطوة التالية:                    │
│     Model Detail + 3D Viewer            │
└─────────────────────────────────────────┘
```

---

**استمتع بالتطوير! 🚀✨**

**Made with ❤️ by Kiro AI**
