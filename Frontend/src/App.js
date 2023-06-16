import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { useEffect } from 'react';

import Navbar from './Components/Navbar';
import Profile from './Components/Profile';
import Login from './Components/Login';
import Signup from './Components/Signup';
import AdminLogin from './Components/Admin/AdminLogin';
import Dashboard from './Components/Admin/AdminHome';
import store from './Redux/Store';

const HomePage = () => {
    const navigate = useNavigate();

    let userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

    useEffect(() => {
        if(!localStorage.getItem('token')){
            navigate('/login')
        }
      }, [])

    return (
        <div>
            <Navbar />

            <div className="min-h-full  ">
                <header className="bg-white shadow flex justify-center py-28">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
                    </div>
                </header>
                <main>
                    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{/* Your content */}</div>
                </main>
            </div>

        </div>
    )
}

const ProfilePage = () => {
    return (
        <>
            <Navbar />
            <Profile />
        </>
    )
}

const Router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />
    }, {
        path: '/login',
        element: <Login />
    }, {
        path: '/signup',
        element: <Signup />
    }, {
        path: '/profile',
        element: <ProfilePage />
    }, {
        path: '/admin',
        element: <Dashboard />
    }, {
        path: '/admin/login',
        element: <AdminLogin />
    }
])


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <RouterProvider router={Router} />
    </Provider>
);