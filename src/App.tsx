/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Router, useRouter } from './router';
import { applySeo } from './lib/seo';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { QuickContactWidget } from './components/layout/QuickContactWidget';
import { Modal } from './components/ui/Modal';
import { CallbackForm } from './components/forms/CallbackForm';
import { ScrollProgress } from './components/common/ScrollProgress';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesOverviewPage } from './pages/ServicesOverviewPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { GalleryPage } from './pages/GalleryPage';
import { ClientsPage } from './pages/ClientsPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AdminPage } from './pages/AdminPage';

const AppContent: React.FC = () => {
  const { currentPath } = useRouter();
  const [callbackModalOpen, setCallbackModalOpen] = useState(false);

  useEffect(() => {
    applySeo(currentPath);
  }, [currentPath]);

  // Match current path to page component
  const renderRoute = () => {
    // Normalise trailing slashes
    const normalized = currentPath.length > 1 && currentPath.endsWith('/')
      ? currentPath.slice(0, -1)
      : currentPath;

    if (normalized === '/' || normalized === '') {
      return <HomePage />;
    }
    if (normalized === '/about') {
      return <AboutPage />;
    }
    if (normalized === '/services') {
      return <ServicesOverviewPage />;
    }
    if (normalized.startsWith('/services/')) {
      const slug = normalized.replace('/services/', '');
      return <ServiceDetailPage slug={slug} />;
    }
    if (normalized === '/gallery') {
      return <GalleryPage />;
    }
    if (normalized === '/clients') {
      return <ClientsPage />;
    }
    if (normalized === '/testimonials') {
      return <TestimonialsPage />;
    }
    if (normalized === '/contact') {
      return <ContactPage />;
    }
    if (normalized === '/privacy-policy') {
      return <PrivacyPolicyPage />;
    }
    if (normalized === '/admin') {
      return <AdminPage />;
    }

    return <NotFoundPage />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-navy w-full max-w-full overflow-x-clip font-sans">
      <ScrollProgress />
      <Header onOpenCallbackModal={() => setCallbackModalOpen(true)} />
      
      <main className="flex-1 w-full max-w-full overflow-x-clip">
        {renderRoute()}
      </main>

      <Footer />
      <QuickContactWidget />

      {/* Global Callback / Get Quote Modal */}
      <Modal
        isOpen={callbackModalOpen}
        onClose={() => setCallbackModalOpen(false)}
        title="Get a Quote / Request a Callback"
        description="Share your requirements and our team in Kadavanthra, Kochi will contact you."
      >
        <CallbackForm onSuccess={() => setCallbackModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
