# 📁 بنية المشروع - Voxel Market

## 🗂️ نظرة عامة على الملفات

```
voxel-market/
│
├── 📄 index.html                    # HTML الرئيسي
├── 📄 package.json                  # Dependencies والـ scripts
├── 📄 vite.config.js                # إعدادات Vite
├── 📄 README.md                     # توثيق المشروع
├── 📄 HCI_PRINCIPLES.md             # شرح مبادئ HCI
├── 📄 FEATURES.md                   # دليل الميزات
├── 📄 PROJECT_STRUCTURE.md          # هذا الملف
│
├── 📁 public/                       # ملفات ثابتة
│
└── 📁 src/                          # الكود المصدري
    │
    ├── 📄 main.jsx                  # نقطة الدخول
    ├── 📄 App.jsx                   # المكون الرئيسي
    ├── 📄 index.css                 # Styles رئيسية
    ├── 📄 data.js                   # بيانات النماذج والمبدعين
    │
    ├── 📁 components/               # المكونات القابلة لإعادة الاستخدام
    │   ├── 📄 Navbar.jsx           # شريط التنقل
    │   ├── 📄 Footer.jsx           # تذييل الموقع
    │   ├── 📄 ModelCard.jsx        # بطاقة النموذج
    │   ├── 📄 CreatorCard.jsx      # بطاقة المبدع
    │   ├── 📄 AuthModal.jsx        # نافذة تسجيل الدخول
    │   └── 📄 Toast.jsx            # نظام الإشعارات
    │
    ├── 📁 pages/                    # صفحات التطبيق
    │   ├── 📄 Home.jsx             # الصفحة الرئيسية
    │   ├── 📄 Browse.jsx           # صفحة التصفح
    │   ├── 📄 Creators.jsx         # صفحة المبدعين
    │   ├── 📄 ModelDetail.jsx      # تفاصيل النموذج
    │   ├── 📄 CreatorProfile.jsx   # بروفايل المبدع
    │   └── 📄 Cart.jsx             # سلة المشتريات
    │
    └── 📁 context/                  # Context API
        └── 📄 AppContext.jsx       # الحالة العامة للتطبيق
```

---

## 📄 شرح الملفات الرئيسية

### 🎯 Root Files

#### `index.html`
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Voxel Market</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

**الغرض:** HTML الأساسي للتطبيق

#### `package.json`
```json
{
  "name": "voxel-market",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.23.1",
    "lucide-react": "^0.383.0"
  }
}
```

**الغرض:** إدارة المكتبات والأوامر

#### `vite.config.js`
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

**الغرض:** إعدادات Vite

---

## 📁 src/ Directory

### 🚀 Entry Point

#### `main.jsx`
```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

**الغرض:** نقطة دخول التطبيق

**المسؤوليات:**
- تحميل React
- تحميل الـ CSS
- Render المكون الرئيسي

---

#### `App.jsx`
```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
// ... imports

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          {/* ... more routes */}
        </Routes>
        <Footer />
        <Toast />
      </BrowserRouter>
    </AppProvider>
  )
}
```

**الغرض:** المكون الرئيسي

**المسؤوليات:**
- إعداد الـ routing
- تغليف التطبيق بـ Context
- عرض المكونات الثابتة (Navbar, Footer)
- إدارة الـ modals

---

#### `data.js`
```javascript
export const MODELS = [
  {
    id: 1,
    name: 'Embergaze Dragon',
    price: '$38.00',
    category: 'Creatures',
    // ... more fields
  },
  // ... more models
]

export const CREATORS = [
  {
    id: 1,
    name: 'Kenji Makes',
    handle: '@kenjimakes',
    // ... more fields
  },
  // ... more creators
]
```

**الغرض:** بيانات التطبيق

**المحتوى:**
- MODELS: قائمة النماذج
- CREATORS: قائمة المبدعين
- CATEGORIES: الفئات

---

## 🧩 Components

### `Navbar.jsx`
**الغرض:** شريط التنقل العلوي

**الميزات:**
- Logo وروابط التنقل
- حقل البحث
- Cart badge مع العدد
- أزرار Login/Signup

**Props:**
- `onLoginClick`: callback لفتح modal تسجيل الدخول
- `onSignupClick`: callback لفتح modal التسجيل

**State:**
- `q`: نص البحث
- `cart`: من Context

---

### `Footer.jsx`
**الغرض:** تذييل الموقع

**المحتوى:**
- معلومات الشركة
- روابط مهمة
- روابط قانونية
- Copyright

---

### `ModelCard.jsx`
**الغرض:** بطاقة عرض النموذج

**الميزات:**
- صورة النموذج
- السعر
- نظام الإعجاب
- Quick Add button
- معلومات المبدع
- عدد المشاهدات

**Props:**
- `model`: بيانات النموذج
- `nameWhite`: boolean لتغيير لون الاسم

**State:**
- `liked`: حالة الإعجاب
- `likes`: عدد الإعجابات
- `showQuickAdd`: إظهار زر Quick Add

**Interactions:**
- Click: الذهاب لصفحة التفاصيل
- Like button: إضافة/إزالة الإعجاب
- Quick Add: إضافة للسلة

---

### `CreatorCard.jsx`
**الغرض:** بطاقة عرض المبدع

**الميزات:**
- Avatar مع الحرف الأول
- Verified badge
- الاسم والـ handle
- Bio
- إحصائيات (Models, Sales)

**Props:**
- `creator`: بيانات المبدع

**Interactions:**
- Click: الذهاب لصفحة البروفايل

---

### `AuthModal.jsx`
**الغرض:** نافذة تسجيل الدخول/التسجيل

**الميزات:**
- تبديل بين Login/Signup
- تسجيل دخول بـ Google
- حقول Email/Password
- زر إغلاق

**Props:**
- `mode`: 'login' أو 'signup'
- `onClose`: callback للإغلاق
- `onSwitch`: callback للتبديل

---

### `Toast.jsx`
**الغرض:** نظام الإشعارات

**الميزات:**
- ثلاثة أنواع (success, info, error)
- Icons مناسبة
- زر إغلاق
- Animation

**State:**
- `toast`: من Context

**Types:**
```javascript
{
  id: number,
  message: string,
  type: 'success' | 'info' | 'error'
}
```

---

## 📄 Pages

### `Home.jsx`
**الغرض:** الصفحة الرئيسية

**الأقسام:**
1. Hero Section
2. Browse by Category
3. Featured Models
4. Top Creators

**State:**
- `activeCategory`: الفئة المحددة

**Data:**
- `featured`: النماذج المميزة
- `topCreators`: أفضل المبدعين

---

### `Browse.jsx`
**الغرض:** صفحة تصفح النماذج

**الميزات:**
- Sidebar للفلاتر
- Grid للنماذج
- بحث وتصفية متقدمة

**State:**
- `search`: نص البحث
- `category`: الفئة المحددة
- `sort`: طريقة الترتيب
- `verifiedOnly`: عرض المعتمدين فقط

**Computed:**
- `filtered`: النماذج المفلترة

---

### `Creators.jsx`
**الغرض:** صفحة المبدعين

**الميزات:**
- بحث بالاسم/handle
- فلتر للمعتمدين
- Grid للمبدعين

**State:**
- `search`: نص البحث
- `verifiedOnly`: عرض المعتمدين فقط

**Computed:**
- `filtered`: المبدعين المفلترين

---

### `ModelDetail.jsx`
**الغرض:** صفحة تفاصيل النموذج

**الأقسام:**
1. Image Gallery
2. Model Info
3. Creator Info
4. Statistics
5. Add to Cart
6. Description
7. Specifications
8. Tags
9. Related Models

**State:**
- `liked`: حالة الإعجاب
- `likes`: عدد الإعجابات
- `selectedImage`: الصورة المحددة
- `loading`: حالة التحميل

**Params:**
- `id`: معرف النموذج من URL

---

### `CreatorProfile.jsx`
**الغرض:** صفحة بروفايل المبدع

**الأقسام:**
1. Header (Avatar, Info, Stats)
2. Published Models

**Params:**
- `name`: اسم المبدع من URL

**Data:**
- `creator`: بيانات المبدع
- `creatorModels`: نماذج المبدع

---

### `Cart.jsx`
**الغرض:** صفحة سلة المشتريات

**الأقسام:**
1. Cart Items
2. Order Summary

**State:**
- `cart`: من Context

**Computed:**
- `subtotal`: مجموع الأسعار
- `tax`: الضرائب (10%)
- `total`: المجموع النهائي

**Features:**
- حذف منتج
- مسح السلة
- Checkout
- Empty state

---

## 🔄 Context

### `AppContext.jsx`
**الغرض:** إدارة الحالة العامة

**State:**
```javascript
{
  cart: [],              // سلة المشتريات
  notifications: [],     // الإشعارات
  toast: null,          // Toast الحالي
  user: null            // المستخدم
}
```

**Functions:**
```javascript
addToCart(model)           // إضافة للسلة
removeFromCart(modelId)    // حذف من السلة
clearCart()                // مسح السلة
showToast(message, type)   // عرض toast
addNotification(notif)     // إضافة إشعار
clearNotification(id)      // حذف إشعار
```

**Usage:**
```javascript
import { useApp } from '../context/AppContext'

function MyComponent() {
  const { cart, addToCart, showToast } = useApp()
  // ...
}
```

---

## 🎨 Styles

### `index.css`
**الغرض:** جميع الـ styles

**الأقسام:**
1. CSS Variables
2. Reset & Base
3. Navbar
4. Hero
5. Page Layout
6. Components
7. Pages
8. Animations
9. Responsive

**CSS Variables:**
```css
:root {
  --bg-primary: hsl(220, 20%, 4%);
  --cyan: hsl(190, 100%, 50%);
  --text-primary: hsl(0, 0%, 95%);
  /* ... more */
}
```

---

## 🔀 Routing

### Routes Structure
```
/                    → Home
/browse              → Browse
/creators            → Creators
/model/:id           → ModelDetail
/creator/:name       → CreatorProfile
/cart                → Cart
```

### Navigation Flow
```
Home
├── Browse → ModelDetail → Cart
├── Creators → CreatorProfile → ModelDetail
└── Cart → Checkout (قريباً)
```

---

## 📊 Data Flow

### Cart Flow
```
ModelCard/ModelDetail
    ↓ addToCart()
AppContext
    ↓ update cart
Navbar (badge)
Cart Page
    ↓ removeFromCart()
AppContext
    ↓ update cart
Navbar (badge)
```

### Toast Flow
```
Any Component
    ↓ showToast()
AppContext
    ↓ set toast
Toast Component
    ↓ display
Auto hide (3s)
    ↓ clear toast
AppContext
```

---

## 🔧 Build & Development

### Development
```bash
npm run dev
# → Vite dev server
# → Hot reload
# → http://localhost:5173
```

### Build
```bash
npm run build
# → Vite build
# → Output: dist/
# → Optimized & minified
```

### Preview
```bash
npm run preview
# → Preview production build
# → http://localhost:4173
```

---

## 📦 Dependencies

### Production
```json
{
  "react": "^18.2.0",           // UI library
  "react-dom": "^18.2.0",       // React DOM
  "react-router-dom": "^6.23.1", // Routing
  "lucide-react": "^0.383.0"    // Icons
}
```

### Development
```json
{
  "@vitejs/plugin-react": "^4.2.1", // Vite React plugin
  "vite": "^5.2.11"                  // Build tool
}
```

---

## 🎯 Key Concepts

### Component Hierarchy
```
App
├── AppProvider (Context)
├── BrowserRouter
│   ├── Navbar
│   ├── Routes
│   │   ├── Home
│   │   ├── Browse
│   │   ├── Creators
│   │   ├── ModelDetail
│   │   ├── CreatorProfile
│   │   └── Cart
│   ├── Footer
│   ├── AuthModal
│   └── Toast
```

### State Management
- **Local State**: useState في المكونات
- **Global State**: Context API
- **URL State**: React Router params

### Styling Approach
- **CSS Variables**: للألوان والقيم المشتركة
- **BEM-like**: تسمية الـ classes
- **Mobile First**: responsive design
- **Animations**: CSS transitions & keyframes

---

## 📚 Best Practices

### Code Organization
✅ مكونات صغيرة ومركزة
✅ فصل المنطق عن العرض
✅ استخدام Context للحالة المشتركة
✅ Props واضحة ومحددة

### Performance
✅ Lazy loading للصور
✅ Memoization عند الحاجة
✅ Optimistic UI updates
✅ Code splitting (مستقبلاً)

### Accessibility
✅ Semantic HTML
✅ Keyboard navigation
✅ ARIA labels
✅ Color contrast

### Maintainability
✅ تسمية واضحة
✅ تعليقات عند الحاجة
✅ توثيق شامل
✅ هيكل منظم

---

**هذا الدليل يساعدك على فهم بنية المشروع والتنقل فيه بسهولة! 🚀**
