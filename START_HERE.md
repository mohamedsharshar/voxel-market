# 🚀 ابدأ من هنا - Voxel Market

## 👋 مرحباً!

تم نقل الفرونت إند من React إلى Laravel بنجاح! 🎉

---

## ⚡ تشغيل سريع (5 دقائق)

### 1️⃣ تثبيت Dependencies

```bash
cd backend
composer install
```

### 2️⃣ إعداد البيئة

```bash
cp .env.example .env
php artisan key:generate
```

### 3️⃣ إعداد Database

**افتح `.env` وعدل:**
```env
DB_CONNECTION=mysql
DB_DATABASE=voxel_market
DB_USERNAME=root
DB_PASSWORD=
```

**أنشئ Database:**
```sql
CREATE DATABASE voxel_market;
```

### 4️⃣ تشغيل Migrations & Seeder

```bash
php artisan migrate
php artisan db:seed --class=VoxelMarketSeeder
```

### 5️⃣ تشغيل السيرفر

```bash
php artisan serve
```

**افتح المتصفح:** http://127.0.0.1:8000

---

## 🎯 ما تم إنجازه

### ✅ الصفحات الجاهزة
- ✅ **Home** (`/`) - صفحة رئيسية تفاعلية كاملة
- ✅ **Browse** (`/browse`) - تصفح النماذج مع فلاتر

### ✅ الميزات الجاهزة
- ✅ Navbar تفاعلي مع Search
- ✅ Cart System (Session-based)
- ✅ Category Filters
- ✅ Responsive Design
- ✅ HCI Principles مطبقة
- ✅ Database مع 9 نماذج و 6 مبدعين

---

## 📋 الصفحات المتبقية

### ⏳ قيد الإنشاء
1. **Model Detail** (`/model/{id}`) - مع عارض 3D
2. **Creators** (`/creators`) - قائمة المبدعين
3. **Creator Profile** (`/creator/{name}`) - صفحة المبدع
4. **Cart** (`/cart`) - سلة المشتريات
5. **Login** (`/login`) - تسجيل الدخول
6. **Register** (`/register`) - التسجيل
7. **About** (`/about`) - عن الموقع
8. **Support** (`/support`) - الدعم
9. **Settings** (`/settings`) - الإعدادات
10. **Admin Dashboard** (`/admin/dashboard`) - لوحة الإدارة

---

## 👤 بيانات الدخول

### Admin
```
Email: admin@voxelmarket.com
Password: password
```

### User
```
Email: user@voxelmarket.com
Password: password
```

---

## 📚 الملفات المهمة

### للقراءة أولاً
1. **`SUMMARY.md`** - ملخص شامل للمشروع
2. **`backend/QUICK_START.md`** - دليل التشغيل السريع
3. **`backend/README_AR.md`** - دليل شامل بالعربية

### للمطورين
4. **`backend/MIGRATION_GUIDE.md`** - دليل النقل التفصيلي
5. **`PROJECT_STATUS.md`** - حالة المشروع

### للمرجع
6. **`backend/resources/views/home.blade.php`** - مثال صفحة كاملة
7. **`backend/resources/views/browse.blade.php`** - مثال الفلاتر
8. **`backend/resources/views/layouts/app.blade.php`** - Layout رئيسي

---

## 🎨 التصميم

### الألوان
```css
--bg-primary: hsl(220, 20%, 4%)      /* خلفية رئيسية */
--bg-secondary: hsl(220, 15%, 12%)   /* خلفية ثانوية */
--cyan: hsl(190, 100%, 50%)          /* لون أساسي */
--text-primary: hsl(0, 0%, 95%)      /* نص رئيسي */
```

### الخطوط
```css
font-family: 'Inter', sans-serif;
```

### التفاعلية
```javascript
Alpine.js 3.x - للتفاعلية من جانب العميل
Livewire 4.3 - للتفاعلية من جانب السيرفر
```

---

## 🛠️ الأدوات المستخدمة

### Backend
- Laravel 11
- Livewire 4.3
- MySQL
- Laravel Sanctum

### Frontend
- Blade Templates
- Alpine.js 3.x
- Custom CSS
- Three.js (قيد الإضافة)

---

## 🎯 الخطوة التالية

### أولوية عالية ⭐⭐⭐
1. **إنشاء صفحة Model Detail** مع عارض 3D
   - استخدم Three.js
   - أضف معلومات الموديل
   - أضف زر Add to Cart
   - أضف Related models

### كيفية البدء
```bash
# 1. أنشئ الملف
touch backend/resources/views/model-detail.blade.php

# 2. انسخ التصميم من home.blade.php
# 3. أضف Three.js للعارض 3D
# 4. اختبر الصفحة
```

---

## 💡 نصائح

### 1. استخدم نفس الأسلوب
```
✅ نفس التصميم من home.blade.php
✅ نفس الـ Alpine.js patterns
✅ نفس الـ CSS classes
```

### 2. للعارض 3D
```html
<script type="importmap">
{
  "imports": {
    "three": "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js"
  }
}
</script>
```

### 3. للـ Cart
```php
// في Controller
session(['cart' => $cart]);

// في Blade
{{ count(session('cart', [])) }}
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

### إذا واجهت مشكلة:
1. راجع `backend/QUICK_START.md`
2. راجع `backend/README_AR.md`
3. راجع `SUMMARY.md`
4. تحقق من `PROJECT_STATUS.md`

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

## 🚀 ابدأ الآن!

```bash
cd backend
php artisan serve
```

**افتح:** http://127.0.0.1:8000

---

**استمتع بالتطوير! 🎮✨**

**Made with ❤️ by Kiro AI**
