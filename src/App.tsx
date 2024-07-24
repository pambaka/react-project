import './App.css';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import MainPage from './pages/main/main-page';
import ErrorBoundary from './error-boundary';
import FallbackUi from './components/fallback-ui/fallback-ui';
import Card from './components/card/card';
import NotFoundPage from './pages/not-found/not-found-page';
import { createContext, useState } from 'react';

export const ThemeContext = createContext({ isLightThemeSet: true, toggleLightTheme: () => {} });

function App() {
  const [isLightThemeSet, setIsLightThemeSet] = useState(true);

  function toggleLightTheme() {
    setIsLightThemeSet(!isLightThemeSet);
  }

  return (
    <ThemeContext.Provider value={{ isLightThemeSet, toggleLightTheme }}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ErrorBoundary fallback={<FallbackUi />}>
                <div className={isLightThemeSet ? '' : 'dark-theme'}>
                  <MainPage />
                  <Outlet></Outlet>
                </div>
              </ErrorBoundary>
            }
          >
            <Route path="details/:charId" element={<Card />}></Route>
          </Route>

          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default App;
