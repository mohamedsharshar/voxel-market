# 🎨 الدليل البصري - Voxel Market

## 🎯 نظرة عامة على الواجهات

هذا الدليل يوضح التصميم البصري والتفاعلات في كل صفحة.

---

## 🏠 الصفحة الرئيسية (Home)

### Layout
```
┌─────────────────────────────────────────────┐
│  Navbar                                     │
│  [Logo] [Browse] [Creators] [Search] [Cart]│
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│  Hero Section                               │
│  ┌──────────────────────────────────┐      │
│  │ [Badge] Premium Game Assets      │      │
│  │                                   │      │
│  │ Game-ready 3D models             │      │
│  │ for your next project            │      │
│  │                                   │      │
│  │ [Browse Catalog] [Meet Creators] │      │
│  └──────────────────────────────────┘      │
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│  Browse by Category                         │
│  [Characters] [Vehicles] [Weapons] ...     │
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│  ⭐ FEATURED - Curated Models               │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐              │
│  │ 🖼️ │ │ 🖼️ │ │ 🖼️ │ │ 🖼️ │              │
│  │ $$ │ │ $$ │ │ $$ │ │ $$ │              │
│  └────┘ └────┘ └────┘ └────┘              │
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│  Top Creators                               │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐              │
│  │ 👤 │ │ 👤 │ │ 👤 │ │ 👤 │              │
│  │ ✓  │ │ ✓  │ │ ✓  │ │    │              │
│  └────┘ └────┘ └────┘ └────┘              │
└─────────────────────────────────────────────┘
```

### التفاعلات
```
Hero Buttons:
  Hover → Background lighter
  Click → Navigate

Category Pills:
  Hover → Cyan border + background
  Click → Toggle active state
  Active → Cyan color

Model Cards:
  Hover → Lift up + shadow
  Click → Navigate to detail
  Like → Toggle heart color
  Quick Add → Show button on hover
```

---

## 🔍 صفحة التصفح (Browse)

### Layout
```
┌─────────────────────────────────────────────┐
│  Browse Catalog                             │
│  Discover high-quality 3D assets           │
└─────────────────────────────────────────────┘
┌──────────┬──────────────────────────────────┐
│ Filters  │  Models Grid                     │
│          │                                  │
│ 🔍 Search│  ┌────┐ ┌────┐ ┌────┐           │
│          │  │ 🖼️ │ │ 🖼️ │ │ 🖼️ │           │
│ Category │  │ $$ │ │ $$ │ │ $$ │           │
│ [Select] │  └────┘ └────┘ └────┘           │
│          │                                  │
│ Sort By  │  ┌────┐ ┌────┐ ┌────┐           │
│ [Select] │  │ 🖼️ │ │ 🖼️ │ │ 🖼️ │           │
│          │  │ $$ │ │ $$ │ │ $$ │           │
│ Verified │  └────┘ └────┘ └────┘           │
│ [Toggle] │                                  │
│          │  ┌────┐ ┌────┐ ┌────┐           │
│ [Reset]  │  │ 🖼️ │ │ 🖼️ │ │ 🖼️ │           │
│          │  │ $$ │ │ $$ │ │ $$ │           │
└──────────┴──────────────────────────────────┘
```

### التفاعلات
```
Search:
  Type → Real-time filter
  Focus → Cyan border

Category Select:
  Click → Open dropdown
  Select → Filter + close
  Active → Cyan background

Sort Select:
  Click → Open dropdown
  Select → Sort + close

Verified Toggle:
  Click → Toggle on/off
  On → Cyan background

Reset Button:
  Hover → Border lighter
  Click → Clear all filters

Model Cards:
  Hover → Show "Quick Add"
  Quick Add → Add to cart + toast
  In Cart → Show "In Cart" badge
```

---

## 📦 صفحة تفاصيل النموذج (Model Detail)

### Layout
```
┌─────────────────────────────────────────────┐
│  [← Back]                                   │
└─────────────────────────────────────────────┘
┌──────────────────────┬──────────────────────┐
│  Image Gallery       │  Model Info          │
│                      │                      │
│  ┌────────────────┐ │  [Category]          │
│  │                │ │  Model Name          │
│  │   Main Image   │ │                      │
│  │                │ │  ┌────────────────┐  │
│  │     [❤️] [📤]  │ │  │ 👤 Creator     │  │
│  └────────────────┘ │  │    @handle     │  │
│                      │  └────────────────┘  │
│  [🖼️] [🖼️] [🖼️]    │                      │
│                      │  ❤️ 123  👁️ 11.2k   │
│                      │                      │
│                      │  ┌────────────────┐  │
│                      │  │ Price: $38.00  │  │
│                      │  │ [Add to Cart]  │  │
│                      │  └────────────────┘  │
│                      │                      │
│                      │  Description...      │
│                      │                      │
│                      │  Specifications      │
│                      │  [Grid of specs]     │
│                      │                      │
│                      │  [Tags]              │
└──────────────────────┴──────────────────────┘
┌─────────────────────────────────────────────┐
│  More from this category                    │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐              │
│  │ 🖼️ │ │ 🖼️ │ │ 🖼️ │ │ 🖼️ │              │
└─────────────────────────────────────────────┘
```

### التفاعلات
```
Back Button:
  Hover → Border lighter
  Click → Navigate back

Main Image:
  Hover → Slight zoom

Like Button:
  Click → Toggle heart
  Liked → Red color + filled

Share Button:
  Click → Copy link + toast

Thumbnails:
  Click → Change main image
  Active → Cyan border

Creator Card:
  Hover → Border lighter
  Click → Navigate to profile

Add to Cart:
  Click → Show spinner
  Success → Change to "In Cart"
  In Cart → Disabled + gray

Tags:
  Hover → Cyan border + color
```

---

## 👤 صفحة بروفايل المبدع (Creator Profile)

### Layout
```
┌─────────────────────────────────────────────┐
│  [← Back]                                   │
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│  ┌────┐  Creator Name ✓                    │
│  │ 👤 │  @handle                            │
│  │    │  Bio text here...                   │
│  └────┘                                     │
│         📅 Joined  📍 Location  🔗 Link     │
│                                             │
│         ┌────┐  ┌────┐  ┌────┐            │
│         │ 📦 │  │ 💰 │  │ ⭐ │            │
│         │ 12 │  │443 │  │4.9 │            │
│         └────┘  └────┘  └────┘            │
│                                             │
│         [Follow Creator]                    │
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│  Published Models (12)                      │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐              │
│  │ 🖼️ │ │ 🖼️ │ │ 🖼️ │ │ 🖼️ │              │
│  │ $$ │ │ $$ │ │ $$ │ │ $$ │              │
│  └────┘ └────┘ └────┘ └────┘              │
└─────────────────────────────────────────────┘
```

### التفاعلات
```
Avatar:
  Static with verified badge

Links:
  Hover → Cyan color
  Click → Open link

Stats:
  Static display

Follow Button:
  Hover → Background lighter
  Click → Toggle follow + toast

Model Cards:
  Same as Browse page
```

---

## 🛒 صفحة السلة (Cart)

### Layout - مع منتجات
```
┌─────────────────────────────────────────────┐
│  Shopping Cart              [🗑️ Clear Cart] │
└─────────────────────────────────────────────┘
┌──────────────────────────┬──────────────────┐
│  Cart Items              │  Order Summary   │
│                          │                  │
│  ┌────────────────────┐ │  Subtotal: $100  │
│  │ 🖼️ Model Name      │ │  Tax (10%): $10  │
│  │    by Creator      │ │  ─────────────   │
│  │    Category    [🗑️]│ │  Total: $110     │
│  └────────────────────┘ │                  │
│                          │  [Checkout →]    │
│  ┌────────────────────┐ │                  │
│  │ 🖼️ Model Name      │ │  ✓ Secure        │
│  │    by Creator      │ │                  │
│  │    Category    [🗑️]│ │                  │
│  └────────────────────┘ │                  │
└──────────────────────────┴──────────────────┘
```

### Layout - فارغة
```
┌─────────────────────────────────────────────┐
│  Shopping Cart                              │
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│                                             │
│              🛒                             │
│                                             │
│         Your cart is empty                  │
│    Discover amazing 3D models...           │
│                                             │
│         [Browse Models]                     │
│                                             │
└─────────────────────────────────────────────┘
```

### التفاعلات
```
Clear Cart:
  Hover → Red color
  Click → Clear all + show empty

Cart Item:
  Hover → Border lighter
  Name Click → Navigate to detail

Remove Button:
  Hover → Red color + background
  Click → Remove + toast + update

Checkout Button:
  Hover → Background lighter
  Click → Show toast (coming soon)

Browse Button (empty):
  Hover → Background lighter
  Click → Navigate to browse
```

---

## 🔔 Toast Notifications

### Types
```
Success:
┌─────────────────────────────┐
│ ✓ Added to cart!       [×] │
└─────────────────────────────┘
Green border-left

Info:
┌─────────────────────────────┐
│ ℹ Already in cart!     [×] │
└─────────────────────────────┘
Cyan border-left

Error:
┌─────────────────────────────┐
│ ⚠ Something went wrong [×] │
└─────────────────────────────┘
Red border-left
```

### Animation
```
1. Slide in from right
2. Stay for 3 seconds
3. Fade out
4. Or close manually
```

---

## 🎨 نظام الألوان

### Primary Colors
```
Background:
  ████ --bg-primary: hsl(220, 20%, 4%)
  ████ --bg-secondary: hsl(220, 15%, 12%)
  ████ --bg-card: hsl(220, 20%, 6%)

Accent:
  ████ --cyan: hsl(190, 100%, 50%)
  ████ --green: #22c55e

Text:
  ████ --text-primary: hsl(0, 0%, 95%)
  ████ --text-secondary: hsl(220, 10%, 65%)
  ████ --text-muted: hsl(220, 10%, 50%)
```

### Usage
```
Primary Actions: Cyan
Success: Green
Error: Red
Text: White/Gray scale
Borders: Dark gray
```

---

## 📐 Spacing System

### Scale
```
xs:  8px   ▪
sm:  12px  ▪▪
md:  16px  ▪▪▪
lg:  24px  ▪▪▪▪
xl:  32px  ▪▪▪▪▪
2xl: 48px  ▪▪▪▪▪▪
```

### Usage
```
Gap between items: 12-16px
Padding in cards: 16-24px
Margin between sections: 32-48px
Page padding: 32-40px
```

---

## 🔤 Typography

### Font Family
```
Space Grotesk
- Modern
- Clean
- Readable
```

### Scale
```
Hero:     48-58px  ████████
H1:       28-32px  ██████
H2:       22-26px  ████
H3:       16-18px  ███
Body:     14-15px  ██
Small:    12-13px  █
```

### Weights
```
Light:    300
Regular:  400
Medium:   500
Semibold: 600
Bold:     700
Black:    800
```

---

## 🎭 Animations

### Transitions
```
Fast:   0.15s  (buttons, links)
Normal: 0.2s   (cards, modals)
Slow:   0.3s   (images, complex)
```

### Effects
```
Hover:
  - translateY(-2px)
  - scale(1.02)
  - opacity change
  - color change

Active:
  - scale(0.97)
  - brightness change

Loading:
  - rotate(360deg)
  - pulse
```

### Keyframes
```
@keyframes slideInRight
  from: translateX(100px), opacity: 0
  to:   translateX(0), opacity: 1

@keyframes spin
  to: rotate(360deg)

@keyframes scaleIn
  from: scale(0)
  to:   scale(1)
```

---

## 📱 Responsive Breakpoints

### Breakpoints
```
Mobile:   < 600px   📱
Tablet:   600-900px 📱
Desktop:  > 900px   💻
Large:    > 1280px  🖥️
```

### Grid Changes
```
Mobile:
  - 1 column
  - Stack layout
  - Full width

Tablet:
  - 2 columns
  - Sidebar below
  - Adjusted spacing

Desktop:
  - 3-4 columns
  - Sidebar beside
  - Full features
```

---

## 🎯 Interactive States

### Button States
```
Normal:   [Button]
Hover:    [Button] ← lighter
Active:   [Button] ← pressed
Disabled: [Button] ← grayed
Loading:  [⟳ Button]
```

### Input States
```
Normal:   [_______]
Focus:    [_______] ← cyan border
Error:    [_______] ← red border
Disabled: [_______] ← grayed
```

### Card States
```
Normal:   [Card]
Hover:    [Card] ← lifted + shadow
Active:   [Card] ← pressed
Selected: [Card] ← cyan border
```

---

## 🎨 Visual Hierarchy

### Importance Levels
```
Level 1: Hero titles, Main CTAs
  - Largest size
  - Highest contrast
  - Accent colors

Level 2: Section titles, Secondary CTAs
  - Large size
  - High contrast
  - White color

Level 3: Body text, Labels
  - Medium size
  - Medium contrast
  - Gray color

Level 4: Meta info, Captions
  - Small size
  - Low contrast
  - Muted color
```

---

## 🔍 Focus Indicators

### Keyboard Navigation
```
Tab Order:
  1. Logo
  2. Nav links
  3. Search
  4. Cart
  5. Auth buttons
  6. Page content
  7. Footer links

Focus Style:
  - Cyan outline
  - 2px solid
  - Visible on all elements
```

---

**استخدم هذا الدليل لفهم التصميم البصري والتفاعلات! 🎨✨**
