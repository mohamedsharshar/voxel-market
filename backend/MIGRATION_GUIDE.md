# 🚀 دليل نقل الفرونت إند إلى Laravel

## ✅ ما تم إنجازه

### 1. البنية الأساسية
- ✅ تثبيت Livewire 4.3
- ✅ إنشاء Layout رئيسي (`layouts/app.blade.php`)
- ✅ إنشاء WebController مع جميع الوظائف
- ✅ إعداد Routes للويب
- ✅ صفحة Home كاملة مع Alpine.js
- ✅ صفحة Browse مع الفلاتر

### 2. الميزات التفاعلية (HCI)
- ✅ Navbar تفاعلي مع Dropdowns
- ✅ Search functionality
- ✅ Cart system (Session-based)
- ✅ Toast notifications (جاهز في Layout)
- ✅ Alpine.js للتفاعلية
- ✅ Responsive design
- ✅ Accessibility (ARIA labels)

## 📋 الخطوات المتبقية

### 1. إنشاء صفحة Model Detail مع 3D Viewer

```bash
# في backend/resources/views/
touch model-detail.blade.php
```

**محتوى model-detail.blade.php:**
- استخدام Three.js CDN
- عارض 3D تفاعلي
- معلومات الموديل
- زر Add to Cart
- Related models

### 2. إنشاء باقي الصفحات

```bash
# في backend/resources/views/
touch creators.blade.php
touch creator-profile.blade.php
touch cart.blade.php
touch about.blade.php
touch support.blade.php
touch settings.blade.php
```

### 3. صفحات Auth

```bash
# في backend/resources/views/auth/
mkdir -p auth
touch auth/login.blade.php
touch auth/register.blade.php
```

### 4. Admin Panel

```bash
# في backend/resources/views/admin/
mkdir -p admin
touch admin/dashboard.blade.php
```

## 🎨 إضافة Three.js للعارض 3D

### في `model-detail.blade.php`:

```html
@push('scripts')
<script type="importmap">
{
  "imports": {
    "three": "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js",
    "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/"
  }
}
</script>

<script type="module">
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Initialize 3D viewer
const container = document.getElementById('model-viewer');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setClearColor(0x0a0d10);
container.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 10, 5);
scene.add(directionalLight);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.autoRotate = true;

// Load Model
const loader = new GLTFLoader();
loader.load('{{ $model->model_url }}', (gltf) => {
    scene.add(gltf.scene);
    // Center and scale model
    const box = new THREE.Box3().setFromObject(gltf.scene);
    const center = box.getCenter(new THREE.Vector3());
    gltf.scene.position.sub(center);
}, undefined, (error) => {
    console.error('Error loading model:', error);
});

camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// Handle resize
window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});
</script>
@endpush
```

## 🔧 إعداد قاعدة البيانات

### 1. تشغيل Migrations

```bash
cd backend
php artisan migrate
```

### 2. إنشاء Seeder للبيانات التجريبية

```bash
php artisan make:seeder VoxelMarketSeeder
```

**في `database/seeders/VoxelMarketSeeder.php`:**

```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Creator;
use App\Models\VoxelModel;
use App\Models\User;

class VoxelMarketSeeder extends Seeder
{
    public function run()
    {
        // Create admin user
        User::create([
            'name' => 'Admin',
            'email' => 'admin@voxelmarket.com',
            'password' => bcrypt('password'),
            'role' => 'admin'
        ]);

        // Create creators
        $creators = [
            ['name' => 'Alex Chen', 'verified' => true, 'bio' => 'Professional 3D artist'],
            ['name' => 'Sarah Miller', 'verified' => true, 'bio' => 'Game asset creator'],
            // Add more...
        ];

        foreach ($creators as $creatorData) {
            $creator = Creator::create($creatorData);

            // Create models for each creator
            VoxelModel::create([
                'name' => 'Low Poly Dragon',
                'description' => 'High-quality dragon model',
                'price' => 38.00,
                'category' => 'Creatures',
                'image' => 'https://images.unsplash.com/photo-1578632767115-351597cf2477',
                'model_url' => 'https://threejs.org/examples/models/gltf/LittlestTokyo.glb',
                'creator_id' => $creator->id,
                'featured' => true,
                'likes' => 234,
                'views' => 1520,
                'polygons' => 15000,
                'vertices' => 8500,
                'textures' => '2K PBR',
                'formats' => '.GLB, .FBX',
                'rigged' => true,
                'animated' => false
            ]);
        }
    }
}
```

### 3. تشغيل Seeder

```bash
php artisan db:seed --class=VoxelMarketSeeder
```

## 🎯 Cart System (Session-based)

### في WebController (تم إنشاؤه):

```php
// Add to cart
public function addToCart(Request $request, $id)
{
    $model = VoxelModel::findOrFail($id);
    $cart = session('cart', []);
    
    if (isset($cart[$id])) {
        return response()->json(['success' => false, 'message' => 'Already in cart!']);
    }
    
    $cart[$id] = [
        'id' => $model->id,
        'name' => $model->name,
        'price' => $model->price,
        'image' => $model->image,
        'quantity' => 1
    ];
    
    session(['cart' => $cart]);
    return response()->json(['success' => true, 'message' => 'Added to cart!']);
}
```

### في Blade (استخدام Alpine.js):

```html
<button 
    @click="addToCart({{ $model->id }})"
    x-data="{ loading: false }"
    :disabled="loading"
    class="btn-primary"
>
    <span x-show="!loading">Add to Cart</span>
    <span x-show="loading" class="spinner"></span>
</button>

<script>
function addToCart(modelId) {
    this.loading = true;
    fetch(`/cart/add/${modelId}`, {
        method: 'POST',
        headers: {
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
            'Accept': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        showToast(data.message, data.success ? 'success' : 'error');
        if (data.success) {
            // Update cart badge
            document.querySelector('.cart-badge').textContent = data.cartCount;
        }
    })
    .finally(() => {
        this.loading = false;
    });
}
</script>
```

## 📱 Toast Notifications

### إضافة Toast Component:

```html
<!-- في layouts/app.blade.php قبل </body> -->
<div 
    x-data="{ 
        show: false, 
        message: '', 
        type: 'info',
        showToast(msg, t = 'info') {
            this.message = msg;
            this.type = t;
            this.show = true;
            setTimeout(() => this.show = false, 3000);
        }
    }"
    @toast.window="showToast($event.detail.message, $event.detail.type)"
    class="toast-container"
>
    <div 
        x-show="show"
        x-transition
        class="toast"
        :class="type"
    >
        <span x-text="message"></span>
    </div>
</div>

<script>
// Global toast function
window.showToast = function(message, type = 'info') {
    window.dispatchEvent(new CustomEvent('toast', {
        detail: { message, type }
    }));
};
</script>
```

## 🔐 Authentication

### تفعيل Laravel Sanctum للويب:

في `config/sanctum.php`:

```php
'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', sprintf(
    '%s%s',
    'localhost,localhost:3000,127.0.0.1,127.0.0.1:8000,::1',
    env('APP_URL') ? ','.parse_url(env('APP_URL'), PHP_URL_HOST) : ''
))),
```

### Login Form:

```html
<form method="POST" action="{{ route('login') }}" x-data="{ loading: false }">
    @csrf
    <input type="email" name="email" required>
    <input type="password" name="password" required>
    <button type="submit" :disabled="loading">
        <span x-show="!loading">Login</span>
        <span x-show="loading">Loading...</span>
    </button>
</form>
```

## 🎨 مبادئ HCI المطبقة

### 1. Feedback (التغذية الراجعة)
- ✅ Toast notifications
- ✅ Loading states
- ✅ Hover effects
- ✅ Button states (disabled, loading)

### 2. Consistency (الاتساق)
- ✅ نظام ألوان موحد
- ✅ Typography متناسق
- ✅ Button styles متشابهة

### 3. Visibility (الوضوح)
- ✅ Cart badge
- ✅ Clear labels
- ✅ Icons + Text

### 4. Affordance (القابلية للاستخدام)
- ✅ Buttons تبدو قابلة للضغط
- ✅ Links تتغير عند hover
- ✅ Cursor changes

### 5. Error Prevention (منع الأخطاء)
- ✅ تعطيل زر Add to Cart بعد الإضافة
- ✅ Validation
- ✅ Clear error messages

## 🚀 تشغيل المشروع

### 1. تثبيت Dependencies

```bash
cd backend
composer install
```

### 2. إعداد البيئة

```bash
cp .env.example .env
php artisan key:generate
```

### 3. إعداد Database

```bash
# في .env
DB_CONNECTION=mysql
DB_DATABASE=voxel_market
DB_USERNAME=root
DB_PASSWORD=

# تشغيل migrations
php artisan migrate
php artisan db:seed
```

### 4. تشغيل السيرفر

```bash
php artisan serve
```

افتح: `http://127.0.0.1:8000`

## 📦 الملفات المطلوبة

### Views المتبقية:
1. `model-detail.blade.php` - صفحة تفاصيل الموديل مع 3D viewer
2. `creators.blade.php` - قائمة المبدعين
3. `creator-profile.blade.php` - صفحة المبدع
4. `cart.blade.php` - سلة المشتريات
5. `about.blade.php` - عن الموقع
6. `support.blade.php` - الدعم
7. `settings.blade.php` - الإعدادات
8. `auth/login.blade.php` - تسجيل الدخول
9. `auth/register.blade.php` - التسجيل
10. `admin/dashboard.blade.php` - لوحة الإدارة

## 🎯 الخطوات التالية

1. ✅ إنشاء باقي صفحات الـ Views
2. ✅ إضافة Three.js للعارض 3D
3. ✅ إنشاء Seeder للبيانات
4. ✅ اختبار جميع الوظائف
5. ✅ تحسين الـ Responsive Design
6. ✅ إضافة المزيد من التفاعلية

## 📚 المراجع

- [Laravel Documentation](https://laravel.com/docs)
- [Livewire Documentation](https://livewire.laravel.com)
- [Alpine.js Documentation](https://alpinejs.dev)
- [Three.js Documentation](https://threejs.org/docs)

---

**ملاحظة:** جميع الملفات الأساسية تم إنشاؤها. يمكنك الآن إكمال باقي الصفحات باستخدام نفس النمط والأسلوب.
