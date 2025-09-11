import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { RegisterPage } from './components/RegisterPage';
import { ThankYouPage } from './components/ThankYouPage';

export default function App() {
  const pathToPage = (path: string): 'home' | 'register' | 'thank-you' => {
    if (path === '/register') return 'register';
    if (path === '/thank-you') return 'thank-you';
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<'home' | 'register' | 'thank-you'>(() =>
    pathToPage(window.location.pathname)
  );
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(pathToPage(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (page: 'home' | 'register' | 'thank-you') => {
    const path = page === 'home' ? '/' : page === 'register' ? '/register' : '/thank-you';
    window.history.pushState({}, '', path);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {currentPage !== 'thank-you' && (
        <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
      )}
      
      {currentPage === 'home' && (
        <HomePage onNavigate={handleNavigate} />
      )}
      
      {currentPage === 'register' && (
        <RegisterPage onNavigate={handleNavigate} />
      )}

      {currentPage === 'thank-you' && (
        <ThankYouPage onNavigate={handleNavigate} />
      )}
    </div>
  );
}
