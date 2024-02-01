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
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';

function App() {
  const { removeToast } = useToast();
  const toasts = useSelector(state => state.toast.toasts);
  const auth = getAuth();
  const user = auth.currentUser;
  const [login, setLogin] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogin(true);
      } else {
        setLogin(false);
      }
    });
  }, [user]);
  
  const route = routes.map(route => {
    if(route.auth) {
        if(!login) {
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