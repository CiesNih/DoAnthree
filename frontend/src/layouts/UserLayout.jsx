import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ClientLayout({ onOpenAuth }) {
  return (
    <>
      <Header onOpenAuth={onOpenAuth} />
      
      
      <div className="app-container">
        <main className="main-content" style={{ minHeight: '80vh' }}>
          <Outlet />
        </main>
        
      </div>

      <Footer />
    </>
  );
}