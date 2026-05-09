# ⚡ Quick Start - Voxel Market Laravel

## 🚀 تشغيل سريع (5 دقائق)

### الخطوة 1: تثبيت Dependencies

```bash
cd backend
composer install
```

### الخطوة 2: إعداد البيئة

```bash
cp .env.example .env
php artisan key:generate
```

### الخطوة 3: إعداد Database

**في `.env`:**
```env
DB_CONNECTION=mysql
DB_DATABASE=voxel_market
DB_USERNAME=root
DB_PASSWORD=
```

**إنشاء Database:**
```sql
CREATE DATABASE voxel_market;
```

### الخطوة 4: Migrations & Seeder

```bash
php artisan migrate
php artisan db:seed --class=VoxelMarketSeeder
```

### الخطوة 5: تشغيل السيرفر

```bash
php artisan serve
```

**افتح:** http://127.0.0.1:8000

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

- ✅ Home Page (صفحة رئيسية كاملة)
- ✅ Browse Page (تصفح مع فلاتر)
- ✅ Cart System (سلة مشتريات)
- ✅ Search (بحث)
- ✅ Responsive Design
- ✅ Interactive UI (Alpine.js)
- ✅ Database Seeder (9 models, 6 creators)

---

## 📋 الصفحات المتاحة

| الصفحة | الرابط | الحالة |
|--------|--------|--------|
| Home | `/` | ✅ جاهز |
| Browse | `/browse` | ✅ جاهز |
| Model Detail | `/model/{id}` | ⏳ قيد الإنشاء |
| Creators | `/creators` | ⏳ قيد الإنشاء |
| Creator Profile | `/creator/{name}` | ⏳ قيد الإنشاء |
| Cart | `/cart` | ⏳ قيد الإنشاء |
| Login | `/login` | ⏳ قيد الإنشاء |
| Register | `/register` | ⏳ قيد الإنشاء |
| About | `/about` | ⏳ قيد الإنشاء |
| Support | `/support` | ⏳ قيد الإنشاء |
| Settings | `/settings` | ⏳ قيد الإنشاء |
| Admin Dashboard | `/admin/dashboard` | ⏳ قيد الإنشاء |

---

## 🎯 الخطوات التالية

1. **إنشاء صفحة Model Detail** مع عارض 3D
2. **إنشاء صفحات Creators**
3. **إنشاء صفحة Cart**
4. **إنشاء صفحات Auth**
5. **إنشاء Admin Panel**

---

## 📚 الملفات المهمة

```
backend/
├── app/Http/Controllers/WebController.php    # جميع وظائف الويب
├── routes/web.php                            # Routes الويب
├── resources/views/
│   ├── layouts/app.blade.php                 # Layout رئيسي
│   ├── home.blade.php                        # الصفحة الرئيسية
│   └── browse.blade.php                      # صفحة التصفح
├── database/seeders/VoxelMarketSeeder.php    # بيانات تجريبية
├── README_AR.md                              # دليل شامل بالعربية
└── MIGRATION_GUIDE.md                        # دليل النقل
```

---

## 🔧 أوامر مفيدة

```bash
# تشغيل السيرفر
php artisan serve

# إعادة تشغيل Migrations
php artisan migrate:fresh --seed

# مسح Cache
php artisan cache:clear
php artisan config:clear
php artisan view:clear

# إنشاء Controller جديد
php artisan make:controller ControllerName

# إنشاء Model جديد
php artisan make:model ModelName -m

# إنشاء Livewire Component
php artisan livewire:make ComponentName
```

---

## 💡 نصائح

1. **استخدم Alpine.js** للتفاعلية البسيطة
2. **استخدم Livewire** للتفاعلية المعقدة
3. **استخدم Session** للـ Cart
4. **استخدم Eager Loading** للأداء

---

## 🐛 مشاكل شائعة

**خطأ: Class not found**
```bash
composer dump-autoload
```

**خطأ: Database not found**
```sql
CREATE DATABASE voxel_market;
```

**خطأ: 419 Page Expired**
```html
<meta name="csrf-token" content="{{ csrf_token() }}">
```

---

## 📞 الدعم

راجع الملفات التالية للمزيد من المعلومات:
- `README_AR.md` - دليل شامل بالعربية
- `MIGRATION_GUIDE.md` - دليل النقل من React

---

**استمتع بالتطوير! 🚀**
