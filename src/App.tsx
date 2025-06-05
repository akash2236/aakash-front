import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useTheme } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/Authcontext'; // Import the AuthProvider
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { DocumentViewerPage } from './pages/DocumentViewerPage';
import { UploadPage } from './pages/UploadPage';
import { SecurityPage } from './pages/SecurityPage';
import { AboutPage } from './pages/AboutPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/signup';


function App() {
  const { theme } = useTheme();
  
  // Update document title based on theme
  useEffect(() => {
    const titleElement = document.querySelector('title');
    if (titleElement) {
      titleElement.textContent = 'AethaurVault - Own Your Digital Future';
    }
    
    // Update theme color meta tag
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute(
        'content', 
        theme === 'dark' ? '#1C1C1E' : '#5A2CA9'
      );
    }
  }, [theme]);

  return (
    <AuthProvider> {/* Wrap your entire app with AuthProvider */}
      <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'dark' : ''} bg-light-100 dark:bg-dark-300 text-dark-300 dark:text-light-200`}>
        <Header />
        
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/documents" element={<DocumentViewerPage />} />
              <Route path="/upload" element={<UploadPage />} />
              <Route path="/security" element={<SecurityPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Routes>
          </AnimatePresence>
        </main>
        
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;