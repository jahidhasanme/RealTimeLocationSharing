import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LocationProvider } from './contexts/LocationContext';
import { SenderProvider } from './contexts/SenderContext';
import { ReceiverProvider } from './contexts/ReceiverContext';
import { Header } from './components/Header';
import { Home } from './pages/HomePage';
import { Sender } from './pages/SenderPage';
import { Receiver } from './pages/ReceiverPage';

function App() {
  return (
    <ThemeProvider>
      <LocationProvider>
        <SenderProvider>
          <ReceiverProvider>
            <Router>
              <div className="min-h-screen">
                <Header />
                <main className="pt-16">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/sender" element={<Sender />} />
                    <Route path="/receiver" element={<Receiver />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </main>
              </div>
            </Router>
          </ReceiverProvider>
        </SenderProvider>
      </LocationProvider>
    </ThemeProvider>
  );
}

export default App;