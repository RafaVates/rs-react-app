import './App.css';
import ErrorBoundary from './components/error-boundary';
import AppRoutes from './routes/routes';

function App() {
  return (
    <ErrorBoundary>
      <AppRoutes />
    </ErrorBoundary>
  );
}

export default App;
