import Board from './pages/Board';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Edit from './pages/Edit';
import ShowPost from './pages/ShowPost';
import Admin from './pages/Admin';
import NotFoundPage from './pages/NotFoundPage';

export default [
  {
    path: "/",
    component: <Home/>,
  },
  {
    path: "/myBLOG",
    component: <Home/>,
  },
  {
    path: "/board",
    component: <Board/>,
    auth: true
  },
  {
    path: "/admin",
    component: <Admin/>,
    auth: true
  },
  {
    path: "/blog",
    component: <Blog/>,
  },
  {
    path: "/blog/:id",
    component: <ShowPost/>,
  },
  {
    path: "/blog/:id/edit",
    component: <Edit/>,
    auth: true
  },
  {
    path: '*',
    component: <NotFoundPage/>
  }
]