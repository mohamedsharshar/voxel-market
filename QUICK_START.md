# ⚡ دليل البدء السريع - Voxel Market

## 🚀 التشغيل في 3 خطوات

### 1️⃣ تثبيت المكتبات
```bash
npm install
```

### 2️⃣ تشغيل السيرفر
```bash
npm run dev
```

### 3️⃣ فتح المتصفح
```
http://localhost:5173
```

---

## 🎮 جرب الميزات

### ✅ الصفحة الرئيسية
1. افتح الموقع
2. شاهد Hero section
3. اضغط على فئة لتصفية النماذج
4. اضغط على "Browse Catalog"

### ✅ التصفح والبحث
1. اذهب لصفحة Browse
2. ابحث عن "Dragon"
3. جرب الفلاتر المختلفة
4. مرر على بطاقة واضغط "Quick Add"

### ✅ تفاصيل النموذج
1. اضغط على أي نموذج
2. شاهد معرض الصور
3. اضغط على القلب للإعجاب
4. اضغط "Add to Cart"
5. شاهد الإشعار

### ✅ السلة
1. اضغط على أيقونة السلة في Navbar
2. شاهد المنتجات المضافة
3. احذف منتج
4. شاهد تحديث الملخص

### ✅ المبدعين
1. اذهب لصفحة Creators
2. ابحث عن مبدع
3. اضغط على بطاقة مبدع
4. شاهد أعماله

---

## 🎯 الميزات الرئيسية

| الميزة | الوصف | الموقع |
|--------|-------|--------|
| 🔍 البحث | بحث عن النماذج | Navbar, Browse |
| 🛒 السلة | إضافة وإدارة المنتجات | جميع الصفحات |
| ❤️ الإعجاب | إضافة للمفضلة | Model Cards |
| ⚡ Quick Add | إضافة سريعة للسلة | Browse Page |
| 🔔 الإشعارات | Toast notifications | جميع الصفحات |
| 🎨 الفلاتر | تصفية وترتيب | Browse Page |
| 👤 البروفايل | معلومات المبدع | Creator Profile |
| 📱 Responsive | يعمل على جميع الأجهزة | جميع الصفحات |

---

## 🎨 مبادئ HCI المطبقة

### 1. Feedback
- ✅ Toast notifications
- ✅ Loading states
- ✅ Hover effects

### 2. Consistency
- ✅ نظام ألوان موحد
- ✅ Typography متناسق
- ✅ Button styles متشابهة

### 3. Visibility
- ✅ Cart badge
- ✅ Status indicators
- ✅ Clear labels

### 4. Affordance
- ✅ Buttons تبدو قابلة للضغط
- ✅ Links تتغير عند hover
- ✅ Cards تبدو قابلة للنقر

### 5. Error Prevention
- ✅ Disabled states
- ✅ Validation
- ✅ Confirmation messages

---

## 📱 الصفحات

### 🏠 Home (`/`)
- Hero section
- Featured models
- Top creators
- Categories

### 🔍 Browse (`/browse`)
- Search & filters
- All models
- Quick add

### 👥 Creators (`/creators`)
- All creators
- Search
- Verified filter

### 📦 Model Detail (`/model/:id`)
- Image gallery
- Full details
- Add to cart
- Related models

### 👤 Creator Profile (`/creator/:name`)
- Creator info
- Published models
- Statistics

### 🛒 Cart (`/cart`)
- Cart items
- Order summary
- Checkout

---

## 🛠️ الأوامر المتاحة

```bash
# Development
npm run dev          # تشغيل dev server

# Build
npm run build        # بناء للإنتاج

# Preview
npm run preview      # معاينة البناء
```

---

## 📚 التوثيق الكامل

- 📖 [README.md](README.md) - نظرة عامة
- 🎯 [HCI_PRINCIPLES.md](HCI_PRINCIPLES.md) - مبادئ HCI
- ✨ [FEATURES.md](FEATURES.md) - دليل الميزات
- 📁 [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) - بنية المشروع

---

## 🎓 تعلم المزيد

### React
- [React Docs](https://react.dev)
- [React Router](https://reactrouter.com)

### Vite
- [Vite Guide](https://vitejs.dev/guide)

### HCI
- Nielsen's Heuristics
- Design Principles
- User Experience

---

## 💡 نصائح

### للمطورين
1. استخدم React DevTools
2. افحص الـ Console للأخطاء
3. جرب على أجهزة مختلفة
4. اقرأ التوثيق

### للمصممين
1. لاحظ الـ animations
2. جرب الـ interactions
3. افحص الـ responsive design
4. راجع مبادئ HCI

### للمستخدمين
1. استكشف جميع الصفحات
2. جرب الميزات المختلفة
3. لاحظ الـ feedback
4. استمتع بالتجربة!

---

## 🐛 حل المشاكل

### المشكلة: Port مستخدم
```bash
# الحل: Vite سيختار port آخر تلقائياً
# أو أغلق التطبيق الآخر
```

### المشكلة: لا تظهر الصور
```bash
# الحل: تحقق من اتصال الإنترنت
# الصور من Unsplash
```

### المشكلة: خطأ في التثبيت
```bash
# الحل: احذف node_modules وأعد التثبيت
rm -rf node_modules
npm install
```

---

## 🎯 الخطوات التالية

### للتطوير
1. [ ] أضف ميزات جديدة
2. [ ] حسّن الأداء
3. [ ] أضف tests
4. [ ] Deploy للإنتاج

### للتعلم
1. [ ] ادرس الكود
2. [ ] جرب التعديلات
3. [ ] اقرأ التوثيق
4. [ ] طبق مبادئ HCI

---

## 📞 الدعم

### الموارد
- 📖 التوثيق الكامل
- 💬 GitHub Issues
- 📧 البريد الإلكتروني

### المجتمع
- 🌟 Star على GitHub
- 🔄 Fork المشروع
- 🤝 ساهم في التطوير

---

**ابدأ الآن واستمتع! 🚀✨**

```bash
npm install && npm run dev
```
