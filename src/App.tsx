import './App.css';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import MainPage from './pages/main/main-page';
import ErrorBoundary from './error-boundary';
import FallbackUi from './components/fallback-ui/fallback-ui';
import Card from './components/card/card';
import NotFoundPage from './pages/not-found/not-found-page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ErrorBoundary fallback={<FallbackUi />}>
              <MainPage />
              <Outlet></Outlet>
            </ErrorBoundary>
          }
        >
          <Route path="details/:charId" element={<Card />}></Route>
        </Route>

        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
