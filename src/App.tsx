import './App.css';
import Principal from './pages/principal';
import ErrorBoundary from './components/error-boundary';

function App() {
  return (
    <ErrorBoundary>
      <Principal />
    </ErrorBoundary>
  );
}

export default App;
