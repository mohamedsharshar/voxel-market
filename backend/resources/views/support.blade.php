@extends('layouts.app')
@section('title', 'Support Center - Voxel Market')

@push('styles')
<style>
    .support-header { text-align:center;margin-bottom:3rem; }
    .support-header h1 { font-size:2.5rem;margin-bottom:1rem;background:linear-gradient(90deg,var(--cyan),#a855f7);-webkit-background-clip:text;-webkit-text-fill-color:transparent; }
    .support-header p { color:var(--text-secondary);font-size:1.1rem;max-width:600px;margin:0 auto; }
    .support-grid { display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:2rem;max-width:1000px;margin:0 auto; }
    .contact-cards { display:flex;flex-direction:column;gap:1.5rem; }
    .contact-card { padding:2rem;background:var(--bg-secondary);border-radius:16px;border:1px solid var(--border-color);display:flex;align-items:flex-start;gap:1.5rem; }
    .contact-icon { padding:1rem;border-radius:50%; }
    .contact-card h3 { font-size:1.2rem;margin-bottom:.5rem;color:var(--white); }
    .contact-card p { color:var(--text-secondary);margin-bottom:.5rem; }
    .contact-card a { color:var(--cyan);text-decoration:none;font-weight:500; }
    .contact-form { background:var(--bg-secondary);padding:2.5rem;border-radius:16px;border:1px solid var(--border-color); }
    .contact-form h2 { font-size:1.5rem;margin-bottom:1.5rem;color:var(--white); }
    .form-group { margin-bottom:1.5rem; }
    .form-group label { display:block;font-size:14px;font-weight:600;color:var(--text-secondary);margin-bottom:8px; }
    .form-group input,.form-group textarea { width:100%;padding:12px;background:var(--bg-tertiary);border:1px solid var(--border-color);border-radius:8px;color:var(--text-primary);font-size:14px;font-family:inherit;transition:all .2s; }
    .form-group input:focus,.form-group textarea:focus { outline:none;border-color:var(--cyan);box-shadow:0 0 0 3px rgba(0,200,255,.1); }
    .form-group textarea { resize:vertical;min-height:120px; }
</style>
@endpush

@section('content')
<div class="page">
    <div class="support-header">
        <h1>Support Center</h1>
        <p>Have a question or need help? We're here for you. Reach out to us through any of the channels below or send us a direct message.</p>
    </div>

    <div class="support-grid">
        <div class="contact-cards">
            <div class="contact-card">
                <div class="contact-icon" style="background:rgba(0,240,255,.1);color:var(--cyan);">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <div>
                    <h3>Email Us</h3>
                    <p>We'll respond within 24 hours.</p>
                    <a href="mailto:support@voxelmarket.com">support@voxelmarket.com</a>
                </div>
            </div>
            <div class="contact-card">
                <div class="contact-icon" style="background:rgba(168,85,247,.1);color:#a855f7;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                </div>
                <div>
                    <h3>Live Chat</h3>
                    <p>Available Monday to Friday, 9am - 5pm EST.</p>
                    <span style="color:#a855f7;font-weight:500;cursor:pointer;">Start a chat</span>
                </div>
            </div>
            <div class="contact-card">
                <div class="contact-icon" style="background:rgba(255,171,0,.1);color:#ffab00;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div>
                    <h3>Office</h3>
                    <p>123 Creator Blvd, Suite 400<br>San Francisco, CA 94107</p>
                </div>
            </div>
        </div>

        <div class="contact-form">
            <h2>Send us a Message</h2>
            <form onsubmit="event.preventDefault();alert('Message sent!');this.reset();">
                <div class="form-group"><label>Your Name</label><input type="text" required placeholder="John Doe"></div>
                <div class="form-group"><label>Email Address</label><input type="email" required placeholder="john@example.com"></div>
                <div class="form-group"><label>Subject</label><input type="text" required placeholder="How can we help you?"></div>
                <div class="form-group"><label>Message</label><textarea required placeholder="Describe your issue or question in detail..." rows="5"></textarea></div>
                <button type="submit" class="btn-primary" style="width:100%;display:flex;justify-content:center;align-items:center;gap:.5rem;padding:1rem;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    Send Message
                </button>
            </form>
        </div>
    </div>
</div>
@endsection
