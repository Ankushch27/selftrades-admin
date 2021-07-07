import { Route } from 'react-router';
import { useAuthContext } from '../contexts/AuthContext';
import AdminDashboard from '../pages/AdminDashboard';
import Login from '../pages/Login';

const AppRouter = () => {
  const { loginState } = useAuthContext();
  return loginState.userToken ? <AdminDashboard /> : <Route path="/" component={Login} exact />;
};

export default AppRouter;
