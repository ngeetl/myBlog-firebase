import './App.css';
import useToast from './Hooks/toast';
import Toast from './componets/Toast';
import Layout from './pages/Layout';
import routes from './routes'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useSelector } from 'react-redux';

function App() {
  const { removeToast } = useToast();
  const toasts = useSelector(state => state.toast.toasts);
  // const isLogin = useSelector(state => state.auth.isLogin);

  const route = routes.map(route => {
    if(route.auth) {
        if(true) {
          return <Route key={route.path} path={route.path} element={<Navigate replace to="/" />} />
        }
    }
    return (
      <Route key={route.path} path={route.path} element={route.component} />
    )
  });

  return (
    <Router>
      <div className="App">
        <Layout />
        <Toast toasts={toasts} removeToast={removeToast}/>
        <Routes>
          {route}
        </Routes>
      </div>
    </Router>
  );
}

export default App;