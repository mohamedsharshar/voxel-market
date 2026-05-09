<!DOCTYPE html>
<html lang="ar" dir="ltr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'Voxel Market - 3D Models Marketplace')</title>
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    
    <!-- Styles -->
    <style>
        :root {
            --bg-primary: hsl(220, 20%, 4%);
            --bg-secondary: hsl(220, 15%, 12%);
            --bg-tertiary: hsl(220, 15%, 16%);
            --cyan: hsl(190, 100%, 50%);
            --cyan-hover: hsl(190, 100%, 45%);
            --green: #22c55e;
            --red: #ef4444;
            --text-primary: hsl(0, 0%, 95%);
            --text-secondary: hsl(220, 10%, 65%);
            --text-muted: hsl(220, 10%, 45%);
            --border-color: hsl(220, 15%, 20%);
            --white: #ffffff;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: var(--bg-primary);
            color: var(--text-primary);
            line-height: 1.6;
            min-height: 100vh;
        }

        /* Navbar */
        .navbar {
            background: var(--bg-secondary);
            border-bottom: 1px solid var(--border-color);
            position: sticky;
            top: 0;
            z-index: 100;
            backdrop-filter: blur(10px);
        }

        .nav-inner {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 24px;
            display: flex;
            align-items: center;
            gap: 32px;
            height: 64px;
        }

        .nav-logo {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 18px;
            font-weight: 700;
            color: var(--white);
            text-decoration: none;
            transition: color 0.2s;
        }

        .nav-logo:hover {
            color: var(--cyan);
        }

        .nav-links {
            display: flex;
            gap: 8px;
            flex: 1;
        }

        .nav-link {
            padding: 8px 16px;
            color: var(--text-secondary);
            text-decoration: none;
            border-radius: 8px;
            transition: all 0.2s;
            font-size: 14px;
            font-weight: 500;
            background: none;
            border: none;
            cursor: pointer;
        }

        .nav-link:hover {
            color: var(--white);
            background: var(--bg-tertiary);
        }

        .nav-link.active {
            color: var(--cyan);
            background: rgba(0, 200, 255, 0.1);
        }

        .nav-search {
            position: relative;
            display: flex;
            align-items: center;
        }

        .nav-search input {
            width: 280px;
            padding: 8px 12px 8px 36px;
            background: var(--bg-tertiary);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            color: var(--text-primary);
            font-size: 14px;
            transition: all 0.2s;
        }

        .nav-search input:focus {
            outline: none;
            border-color: var(--cyan);
            box-shadow: 0 0 0 3px rgba(0, 200, 255, 0.1);
        }

        .nav-search svg {
            position: absolute;
            left: 12px;
            color: var(--text-muted);
        }

        .nav-actions {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .nav-cart {
            position: relative;
            padding: 8px;
            color: var(--text-secondary);
            text-decoration: none;
            border-radius: 8px;
            transition: all 0.2s;
        }

        .nav-cart:hover {
            color: var(--white);
            background: var(--bg-tertiary);
        }

        .cart-badge {
            position: absolute;
            top: 2px;
            right: 2px;
            background: var(--cyan);
            color: var(--bg-primary);
            font-size: 10px;
            font-weight: 700;
            padding: 2px 5px;
            border-radius: 10px;
            min-width: 16px;
            text-align: center;
        }

        .btn-primary {
            padding: 8px 20px;
            background: var(--cyan);
            color: var(--bg-primary);
            border: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            text-decoration: none;
            display: inline-block;
        }

        .btn-primary:hover {
            background: var(--cyan-hover);
            transform: translateY(-1px);
        }

        .btn-secondary {
            padding: 8px 20px;
            background: var(--bg-tertiary);
            color: var(--white);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            text-decoration: none;
            display: inline-block;
        }

        .btn-secondary:hover {
            background: var(--bg-secondary);
            border-color: var(--cyan);
        }

        /* Page Container */
        .page {
            max-width: 1400px;
            margin: 0 auto;
            padding: 40px 24px;
        }

        /* Footer */
        .footer {
            background: var(--bg-secondary);
            border-top: 1px solid var(--border-color);
            padding: 48px 24px 24px;
            margin-top: 80px;
        }

        .footer-inner {
            max-width: 1400px;
            margin: 0 auto;
        }

        .footer-grid {
            display: grid;
            grid-template-columns: 2fr 1fr 1fr 1fr;
            gap: 48px;
            margin-bottom: 32px;
        }

        .footer-brand {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 20px;
            font-weight: 700;
            color: var(--white);
            margin-bottom: 12px;
        }

        .footer-desc {
            color: var(--text-secondary);
            font-size: 14px;
            line-height: 1.6;
        }

        .footer-title {
            font-size: 14px;
            font-weight: 600;
            color: var(--white);
            margin-bottom: 16px;
        }

        .footer-links {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .footer-link {
            color: var(--text-secondary);
            text-decoration: none;
            font-size: 14px;
            transition: color 0.2s;
        }

        .footer-link:hover {
            color: var(--cyan);
        }

        .footer-bottom {
            padding-top: 24px;
            border-top: 1px solid var(--border-color);
            text-align: center;
            color: var(--text-muted);
            font-size: 13px;
        }

        /* Toast Notifications */
        .toast-container {
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 1000;
        }

        .toast {
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            padding: 16px 20px;
            min-width: 300px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        .toast.success {
            border-left: 3px solid var(--green);
        }

        .toast.error {
            border-left: 3px solid var(--red);
        }

        .toast.info {
            border-left: 3px solid var(--cyan);
        }

        /* Dropdown */
        .dropdown-container {
            position: relative;
        }

        .dropdown-trigger {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 16px;
            background: var(--bg-tertiary);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            color: var(--text-primary);
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
        }

        .dropdown-trigger:hover {
            border-color: var(--cyan);
        }

        .dropdown-menu {
            position: absolute;
            top: calc(100% + 8px);
            right: 0;
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            min-width: 200px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: all 0.2s;
            z-index: 1000;
        }

        .dropdown-menu.open {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }

        .dropdown-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 16px;
            color: var(--text-secondary);
            text-decoration: none;
            font-size: 14px;
            transition: all 0.2s;
            border: none;
            background: none;
            width: 100%;
            cursor: pointer;
        }

        .dropdown-item:hover {
            background: var(--bg-tertiary);
            color: var(--white);
        }

        .dropdown-item.danger {
            color: var(--red);
        }

        .dropdown-item.danger:hover {
            background: rgba(239, 68, 68, 0.1);
        }

        /* Loading Spinner */
        .spinner {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid var(--bg-tertiary);
            border-top-color: var(--cyan);
            border-radius: 50%;
            animation: spin 0.6s linear infinite;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        /* Utility Classes */
        .visually-hidden {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border-width: 0;
        }

        .cyan {
            color: var(--cyan);
        }

        /* Responsive */
        @media (max-width: 768px) {
            .nav-inner {
                flex-wrap: wrap;
                height: auto;
                padding: 12px 16px;
            }

            .nav-search {
                order: 3;
                width: 100%;
                margin-top: 12px;
            }

            .nav-search input {
                width: 100%;
            }

            .footer-grid {
                grid-template-columns: 1fr;
                gap: 32px;
            }
        }
    </style>

    @stack('styles')
    @livewireStyles
</head>
<body>
    <!-- Navbar -->
    <nav class="navbar">
        <div class="nav-inner">
            <a href="{{ route('home') }}" class="nav-logo">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
                Voxel Market
            </a>

            <div class="nav-links">
                <a href="{{ route('browse') }}" class="nav-link {{ request()->routeIs('browse') ? 'active' : '' }}">Browse</a>
                <a href="{{ route('creators') }}" class="nav-link {{ request()->routeIs('creators*') ? 'active' : '' }}">Creators</a>
                
                <div class="dropdown-container" x-data="{ open: false }" @mouseenter="open = true" @mouseleave="open = false">
                    <button class="nav-link" @click="open = !open">
                        More
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </button>
                    <div class="dropdown-menu" :class="{ 'open': open }">
                        <a href="{{ route('about') }}" class="dropdown-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="16" x2="12" y2="12"></line>
                                <line x1="12" y1="8" x2="12.01" y2="8"></line>
                            </svg>
                            About Us
                        </a>
                        <a href="{{ route('support') }}" class="dropdown-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                                <line x1="12" y1="17" x2="12.01" y2="17"></line>
                            </svg>
                            Support
                        </a>
                    </div>
                </div>
            </div>

            <form action="{{ route('browse') }}" method="GET" class="nav-search">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                </svg>
                <input type="text" name="q" placeholder="Search models..." value="{{ request('q') }}">
            </form>

            <div class="nav-actions">
                <a href="{{ route('cart') }}" class="nav-cart">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    @auth
                        @if(session('cart') && count(session('cart', [])) > 0)
                            <span class="cart-badge">{{ count(session('cart', [])) }}</span>
                        @endif
                    @endauth
                </a>

                @auth
                    <div class="dropdown-container" x-data="{ open: false }" @mouseenter="open = true" @mouseleave="open = false">
                        <button class="dropdown-trigger" @click="open = !open">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                            <span>{{ auth()->user()->name }}</span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </button>
                        
                        <div class="dropdown-menu" :class="{ 'open': open }">
                            <div style="padding: 0.5rem 1rem; border-bottom: 1px solid var(--border-color); margin-bottom: 0.25rem;">
                                <div style="font-weight: bold; color: var(--text-primary)">{{ auth()->user()->name }}</div>
                                <div style="font-size: 0.8rem; color: var(--text-secondary)">{{ auth()->user()->email }}</div>
                            </div>
                            
                            @if(auth()->user()->role === 'admin')
                                <a href="{{ route('admin.dashboard') }}" class="dropdown-item">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                    </svg>
                                    Admin Panel
                                </a>
                            @endif
                            
                            <a href="{{ route('settings') }}" class="dropdown-item">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="3"></circle>
                                    <path d="M12 1v6m0 6v6m-9-9h6m6 0h6"></path>
                                </svg>
                                Settings
                            </a>
                            
                            <form action="{{ route('logout') }}" method="POST">
                                @csrf
                                <button type="submit" class="dropdown-item danger">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                        <polyline points="16 17 21 12 16 7"></polyline>
                                        <line x1="21" y1="12" x2="9" y2="12"></line>
                                    </svg>
                                    Logout
                                </button>
                            </form>
                        </div>
                    </div>
                @else
                    <a href="{{ route('login') }}" class="btn-secondary">Log in</a>
                    <a href="{{ route('register') }}" class="btn-primary">Sign up</a>
                @endauth
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <main>
        @yield('content')
    </main>

    <!-- Footer -->
    <footer class="footer">
        <div class="footer-inner">
            <div class="footer-grid">
                <div>
                    <div class="footer-brand">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        </svg>
                        Voxel Market
                    </div>
                    <p class="footer-desc">
                        Premium marketplace for high-quality 3D models, assets, and game-ready content from verified creators worldwide.
                    </p>
                </div>

                <div>
                    <div class="footer-title">Marketplace</div>
                    <div class="footer-links">
                        <a href="{{ route('browse') }}" class="footer-link">Browse Models</a>
                        <a href="{{ route('creators') }}" class="footer-link">Top Creators</a>
                        <a href="{{ route('browse') }}?category=Characters" class="footer-link">Characters</a>
                        <a href="{{ route('browse') }}?category=Environment" class="footer-link">Environment</a>
                    </div>
                </div>

                <div>
                    <div class="footer-title">Company</div>
                    <div class="footer-links">
                        <a href="{{ route('about') }}" class="footer-link">About Us</a>
                        <a href="{{ route('support') }}" class="footer-link">Support</a>
                        <a href="#" class="footer-link">Terms of Service</a>
                        <a href="#" class="footer-link">Privacy Policy</a>
                    </div>
                </div>

                <div>
                    <div class="footer-title">Resources</div>
                    <div class="footer-links">
                        <a href="#" class="footer-link">Documentation</a>
                        <a href="#" class="footer-link">API</a>
                        <a href="#" class="footer-link">Community</a>
                        <a href="#" class="footer-link">Blog</a>
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                © {{ date('Y') }} Voxel Market. All rights reserved. Built with ❤️ for 3D creators.
            </div>
        </div>
    </footer>

    <!-- Alpine.js -->
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
    
    @livewireScripts
    @stack('scripts')
</body>
</html>
