'use client';

import React from 'react';
import { Navbar } from '../components/landing/navbar';
import { HeroSection } from '../components/landing/hero-section';
import { ServicesSection } from '../components/landing/services-section';
import { RepairTimeline } from '../components/landing/repair-timeline';
import { TestimonialsSection } from '../components/landing/testimonials-section';
import { QuickBookingSection } from '../components/landing/quick-booking-section';
import { FooterSection } from '../components/landing/footer-section';
import { AiDiagnostic } from '../components/ai/ai-diagnostic';
import { SmartReminder } from '../components/ai/smart-reminder';
import AiChatbot from '../features/chatbot/ai-chatbot';

export default function HomePage() {
  return (
    <div className="w-full flex flex-col min-h-screen bg-slate-50 text-gray-900 font-sans selection:bg-blue-500 selection:text-white">
      {/* 4.1 Sticky Navbar with Backdrop Blur & Mobile Drawer */}
      <Navbar />

      <main className="flex-1">
        {/* 4.2 Hero Section with 2-Column Grid & Statistics Counter */}
        <HeroSection />

        {/* 3.2 AI Smart Maintenance Reminder Banner */}
        <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SmartReminder />
        </section>

        {/* 3.1 AI Diagnostic Component */}
        <section id="ai-diagnostic" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AiDiagnostic />
        </section>

        {/* 4.3 Featured Services Section */}
        <ServicesSection />

        {/* 4.4 Realtime Repair Progress Tracking Timeline */}
        <RepairTimeline />

        {/* 4.5 Customer Testimonials Carousel */}
        <TestimonialsSection />

        {/* 4.6 Quick Booking Form Section */}
        <QuickBookingSection />
      </main>

      {/* 4.7 Footer Section */}
      <FooterSection />

      {/* 3.3 Floating AI Chatbot */}
      <AiChatbot />
    </div>
  );
}
