import { BrowserRouter } from 'react-router-dom';
import AuthContextProvider from './contexts/AuthContext';
import CouponsContextProvider from './contexts/CouponsContext';
import ModalContextProvider from './contexts/ModalContext';
import AdminDashboard from './pages/AdminDashboard';

const App = () => {
  return (
    <AuthContextProvider>
      <ModalContextProvider>
        <CouponsContextProvider>
          <BrowserRouter>
            <AdminDashboard />
          </BrowserRouter>
        </CouponsContextProvider>
      </ModalContextProvider>
    </AuthContextProvider>
  );
};

export default App;
