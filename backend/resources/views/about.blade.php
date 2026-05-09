@extends('layouts.app')
@section('title', 'About Us - Voxel Market')

@push('styles')
<style>
    .about-hero { text-align:center;padding:4rem 1rem;background:linear-gradient(180deg,var(--bg-secondary) 0%,var(--bg-primary) 100%);border-radius:16px;margin-bottom:3rem; }
    .about-hero h1 { font-size:3rem;font-weight:800;margin-bottom:1rem;background:linear-gradient(90deg,var(--cyan) 0%,#a855f7 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent; }
    .about-hero p { font-size:1.2rem;color:var(--text-secondary);max-width:700px;margin:0 auto;line-height:1.6; }
    .about-content { max-width:1000px;margin:0 auto; }
    .mission-grid { display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:2rem;margin-bottom:4rem; }
    .mission-card { padding:2rem;background:var(--bg-secondary);border-radius:16px;border:1px solid var(--border-color); }
    .mission-card svg { margin-bottom:1rem; }
    .mission-card h2 { font-size:1.5rem;margin-bottom:1rem;color:var(--white); }
    .mission-card p { color:var(--text-secondary);line-height:1.6; }
    .values-title { text-align:center;font-size:2rem;margin-bottom:3rem;color:var(--white); }
    .values-grid { display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1.5rem;margin-bottom:4rem; }
    .value-item { display:flex;flex-direction:column;align-items:center;text-align:center;padding:2rem 1rem;background:rgba(255,255,255,.02);border-radius:16px; }
    .value-icon { width:60px;height:60px;border-radius:50%;display:flex;align-items:center;justify-content:center;margin-bottom:1rem; }
    .value-item h3 { font-size:1.2rem;margin-bottom:.5rem;color:var(--white); }
    .value-item p { color:var(--text-secondary);font-size:.9rem;line-height:1.5; }
    .about-cta { text-align:center;padding:4rem 2rem;background:var(--bg-secondary);border-radius:16px;border:1px solid var(--border-color);display:flex;flex-direction:column;align-items:center; }
    .about-cta h2 { font-size:2rem;margin-bottom:1rem;color:var(--white); }
    .about-cta p { color:var(--text-secondary);margin-bottom:2rem;max-width:500px; }
    .about-cta-buttons { display:flex;gap:1rem; }
</style>
@endpush

@section('content')
<div class="page">
    <section class="about-hero">
        <h1>Empowering the 3D Creator Economy</h1>
        <p>Voxel Market is the premier destination for finding, buying, and selling high-quality 3D assets. We bridge the gap between talented creators and ambitious developers.</p>
    </section>

    <div class="about-content">
        <section class="mission-grid">
            <div class="mission-card">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v8"></path><path d="M8 12h8"></path></svg>
                <h2>Our Mission</h2>
                <p>To democratize game development and 3D design by providing an accessible, fair, and high-quality marketplace where creators can thrive and developers can build faster.</p>
            </div>
            <div class="mission-card">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#a855f7" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                <h2>Our Vision</h2>
                <p>To become the global standard for 3D asset exchange, fostering a vibrant community of millions of artists and developers shaping the future of digital experiences.</p>
            </div>
        </section>

        <section>
            <h2 class="values-title">Our Core Values</h2>
            <div class="values-grid">
                <div class="value-item">
                    <div class="value-icon" style="background:rgba(0,240,255,.1);"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></div>
                    <h3>Uncompromised Quality</h3>
                    <p>Every model is carefully curated to ensure it meets our strict technical and visual standards.</p>
                </div>
                <div class="value-item">
                    <div class="value-icon" style="background:rgba(168,85,247,.1);"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a855f7" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></div>
                    <h3>Community First</h3>
                    <p>We put our creators and users at the heart of every decision we make.</p>
                </div>
                <div class="value-item">
                    <div class="value-icon" style="background:rgba(255,171,0,.1);"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffab00" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg></div>
                    <h3>Fast & Seamless</h3>
                    <p>From finding the right asset to integrating it into your project, we make the process frictionless.</p>
                </div>
            </div>
        </section>

        <section class="about-cta">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
            <h2>Ready to start building?</h2>
            <p>Join thousands of developers and artists on Voxel Market today.</p>
            <div class="about-cta-buttons">
                <a href="{{ route('browse') }}" class="btn-primary" style="padding:.8rem 2rem;font-size:1rem;">Explore Assets</a>
                <a href="{{ route('creators') }}" class="btn-secondary" style="padding:.8rem 2rem;font-size:1rem;">Join as Creator</a>
            </div>
        </section>
    </div>
</div>
@endsection
