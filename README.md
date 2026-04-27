# 🎮 Voxel Market - 3D Models Marketplace

سوق إلكتروني متطور لبيع وشراء نماذج 3D للألعاب والمشاريع الإبداعية، مع **عارض 3D تفاعلي** مبني بتقنيات حديثة ومصمم وفقاً لمبادئ **HCI**.

---

## 🚀 التشغيل السريع

```bash
# 1. تثبيت المكتبات
npm install

# 2. تشغيل المشروع
npm run dev

# 3. افتح المتصفح
http://localhost:5173
```

---

## ✨ الميزات الرئيسية

### 🎮 عارض 3D تفاعلي (جديد!)
- **عرض النماذج 3D** بشكل تفاعلي كامل
- **دوران 360 درجة** - اسحب بالماوس
- **تكبير وتصغير** - مرر العجلة
- **تحريك الكاميرا** - زر الماوس الأيمن
- **وضع ملء الشاشة** - للعرض الكامل
- **إعادة تعيين العرض** - زر Reset
- **إضاءة احترافية** - متعددة الاتجاهات

### 📦 نماذج 3D حقيقية مجانية
- 9 نماذج من **Three.js Examples**
- نماذج من **Ready Player Me**
- صيغة **GLB/GLTF** محسنة
- مع **Textures** و **Materials**

### 🏠 الصفحات
1. **Home** - Hero section + Featured models + Top creators
2. **Browse** - بحث وفلاتر متقدمة + Quick Add
3. **Model Detail** - تفاصيل كاملة + **عارض 3D** + معرض صور
4. **Creator Profile** - معلومات المبدع + أعماله
5. **Creators** - دليل المبدعين
6. **Cart** - سلة المشتريات

### 🎯 التفاعلية
- ✅ Cart System (إضافة، حذف، عرض)
- ✅ Like System (إعجاب/إلغاء)
- ✅ Quick Add (إضافة سريعة)
- ✅ Search & Filters (بحث وتصفية)
- ✅ Toast Notifications (إشعارات)
- ✅ Loading States (حالات التحميل)
- ✅ Animations (رسوم متحركة)

---

## 🎮 استخدام عارض 3D

### الخطوات:
1. افتح أي منتج: `http://localhost:5173/model/1`
2. اضغط على زر **"3D View"**
3. تفاعل مع النموذج:
   - 🖱️ **اسحب** للدوران
   - 📜 **مرر** للتكبير/التصغير
   - 🖱️ **زر الماوس الأيمن** للتحريك
   - 🔄 **Reset View** - إعادة تعيين
   - ⛶ **Fullscreen** - ملء الشاشة

### التحكم:
```
[Images] [3D View] ← التبديل بين الأوضاع
🔄 Reset View      ← إعادة الكاميرا
⛶ Fullscreen       ← وضع ملء الشاشة
```

---

## 🛠️ التقنيات المستخدمة

### Frontend
- **React 18** - مكتبة UI
- **React Router v6** - التنقل
- **Vite** - Build tool سريع
- **Lucide React** - Icons

### 3D Viewer
- **Three.js 0.160.0** - محرك 3D
- **React Three Fiber 8.15.0** - React wrapper
- **React Three Drei 9.96.0** - Helpers

### State Management
- **Context API** - إدارة الحالة

---

## 📁 هيكل المشروع

```
voxel-market/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ModelCard.jsx
│   │   ├── CreatorCard.jsx
│   │   ├── AuthModal.jsx
│   │   ├── Toast.jsx
│   │   └── Model3DViewer.jsx    ← جديد!
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Browse.jsx
│   │   ├── Creators.jsx
│   │   ├── ModelDetail.jsx       ← محدث!
│   │   ├── CreatorProfile.jsx
│   │   └── Cart.jsx
│   ├── context/
│   │   └── AppContext.jsx
│   ├── data.js                   ← محدث!
│   ├── index.css
│   ├── App.jsx
│   └── main.jsx
├── public/
├── package.json
└── README.md
```

---

## 🎨 مبادئ HCI المطبقة

### 1. Feedback (التغذية الراجعة)
- Toast notifications لكل إجراء
- Loading states واضحة
- Hover effects على جميع العناصر
- Visual feedback للأزرار

### 2. Consistency (الاتساق)
- نظام ألوان موحد
- Typography متناسق
- Button styles متشابهة
- Layout patterns متكررة

### 3. Visibility (الوضوح)
- Cart badge يظهر عدد المنتجات
- Status indicators واضحة
- Clear labels لجميع الحقول
- Icons + Text للوضوح

### 4. Affordance (القابلية للاستخدام)
- Buttons تبدو قابلة للضغط
- Links تتغير عند hover
- Cards تبدو قابلة للنقر
- Cursor changes مناسب

### 5. Error Prevention (منع الأخطاء)
- تعطيل زر Add to Cart بعد الإضافة
- Prevent duplicate additions
- Validation للحقول
- Clear error messages

---

## 📦 النماذج 3D المتوفرة

| ID | الاسم | الفئة | السعر | المصدر |
|----|-------|-------|-------|--------|
| 1 | Low Poly Dragon | Creatures | $38 | Ready Player Me |
| 2 | Medieval Castle | Environment | $45 | Littlest Tokyo |
| 3 | Sci-Fi Spaceship | Vehicles | $32 | Soldier |
| 4 | Fantasy Sword | Weapons | $12 | Damaged Helmet |
| 5 | Racing Car | Vehicles | $26 | Ferrari |
| 6 | Knight Character | Characters | $24 | Ready Player Me |
| 7 | Robot Companion | Characters | $28 | Robot Expressive |
| 8 | Fantasy Tree | Environment | $8 | Parrot |
| 9 | Laser Gun | Weapons | $9 | Damaged Helmet |

---

## 🌐 مصادر النماذج المجانية

### للاستخدام الحالي:
- **Three.js Examples** - https://threejs.org/examples/
- **Ready Player Me** - https://readyplayer.me/

### لإضافة نماذج جديدة:
- **Sketchfab** - https://sketchfab.com/ (CC0, CC-BY)
- **Poly Haven** - https://polyhaven.com/ (CC0)
- **Quaternius** - http://quaternius.com/ (CC0)
- **Kenney** - https://kenney.nl/ (CC0)
- **Free3D** - https://free3d.com/ (Various)

---

## 🔧 إضافة نماذج جديدة

### 1. احصل على نموذج
```
- حمل من المصادر المجانية
- تأكد من الترخيص (CC0 أو CC-BY)
- صيغة GLB مفضلة
```

### 2. استضف النموذج
```
- Supabase Storage (مجاني)
- Cloudinary (مجاني)
- GitHub (مجاني)
```

### 3. أضف للبيانات
```javascript
// في src/data.js
{
  id: 10,
  name: 'اسم النموذج',
  price: '$XX.00',
  category: 'الفئة',
  image: 'رابط الصورة',
  modelUrl: 'رابط النموذج GLB',
  description: 'وصف...',
  polygons: 0000,
  vertices: 0000,
  textures: '2K PBR',
  formats: '.GLB, .FBX',
  rigged: false,
  animated: false,
}
```

---

## 🐛 حل المشاكل

### النموذج 3D لا يظهر
```
✓ تحقق من رابط النموذج
✓ تحقق من صيغة الملف (.glb/.gltf)
✓ تحقق من الاتصال بالإنترنت
✓ افتح Console للأخطاء
```

### خطأ LinearEncoding
```bash
# احذف المكتبات القديمة
npm uninstall @react-three/drei @react-three/fiber three

# ثبت الإصدارات المتوافقة
npm install three@0.160.0 @react-three/fiber@8.15.0 @react-three/drei@9.96.0 --legacy-peer-deps

# أعد تشغيل السيرفر
npm run dev
```

### Port مستخدم
```
Vite سيختار port آخر تلقائياً
أو أغلق التطبيق الآخر
```

---

## 📱 Responsive Design

- 📱 **Mobile** (< 600px) - عرض مناسب
- 📱 **Tablet** (600-900px) - عرض متوسط
- 💻 **Desktop** (> 900px) - عرض كامل
- 🖥️ **Large** (> 1280px) - عرض واسع

---

## 🎨 نظام الألوان

```css
--bg-primary: hsl(220, 20%, 4%)      /* خلفية رئيسية */
--bg-secondary: hsl(220, 15%, 12%)   /* خلفية ثانوية */
--cyan: hsl(190, 100%, 50%)          /* لون أساسي */
--green: #22c55e                      /* نجاح */
--text-primary: hsl(0, 0%, 95%)      /* نص رئيسي */
--text-secondary: hsl(220, 10%, 65%) /* نص ثانوي */
```

---

## 🔮 التطويرات المستقبلية

### Phase 1
- [ ] Auto-rotate للنماذج
- [ ] Animation playback
- [ ] Screenshot feature
- [ ] Lighting presets

### Phase 2
- [ ] User authentication
- [ ] Payment integration
- [ ] Reviews & ratings
- [ ] Wishlist

### Phase 3
- [ ] AR view (WebXR)
- [ ] VR support
- [ ] 3D model editor
- [ ] Creator dashboard

---

## 📄 الترخيص

هذا المشروع تعليمي ومفتوح المصدر.

### النماذج 3D:
- Three.js Examples: MIT License
- Ready Player Me: Free for commercial use
- تحقق من ترخيص كل نموذج قبل الاستخدام التجاري

---

## 🙏 شكر خاص

- **Three.js** - محرك 3D رائع
- **React Three Fiber** - React wrapper ممتاز
- **Unsplash** - صور عالية الجودة
- **Lucide** - أيقونات جميلة

---

## 📞 الدعم

إذا واجهت مشكلة:
1. تحقق من Console للأخطاء
2. راجع قسم حل المشاكل
3. تأكد من الإصدارات الصحيحة

---

**استمتع بالتصفح والتطوير! 🎮✨**

```bash
npm run dev
```

**افتح: http://localhost:5173**
