import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState();
    const token = localStorage.getItem('token');

    useEffect(() => {
    const fetchUser = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/user', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            const result = await response.json();
            setUser(result)
        } catch (error) {
            console.error('Signup error:', error);
            alert('An error occurred during signup. Please try again.');
        }
    };

    if (token) {
        fetchUser();
    }else{
        navigate('/login');
    }

    },[navigate, token]);


    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleLogoutAll = async () => {
    try {
        const response = await fetch('http://localhost:3000/user/logout-all', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        });

        if (response.ok) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
        } else {
        const data = await response.json();
        alert(data.message || 'Logout from all devices failed.');
        }
    } catch (err) {
        console.error('Logout all error:', err);
        alert('Something went wrong.');
    }
    };


  return (
    <>
        <header className="bg-gradient-to-r from-[#0061FF] to-[#60EFFF]">
        <nav className="container mx-auto px-6 py-3">
            <div className="flex items-center justify-between">
            <div className="text-white font-bold text-xl">
                <a href="#">Logo</a>
            </div>
            <div className="hidden md:block">
                <ul className="flex items-center space-x-8">
                <li>
                    <button
                    className="text-white inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-2 px-4 shadow-sm bg-transparent relative text-stone-700 hover:text-stone-700 border-stone-500 hover:bg-white duration-150 hover:border-stone-600 rounded-full hover:opacity-80 hover:shadow-none"
                    >
                    <a href="/">Home</a>
                    </button>
                </li>
                <li>
                    <button onClick={handleLogout}
                    className="text-white inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-2 px-4 shadow-sm bg-transparent relative text-stone-700 hover:text-stone-700 border-stone-500 hover:bg-white duration-150 hover:border-stone-600 rounded-full hover:opacity-80 hover:shadow-none"
                    >
                    <a href="/">Logout</a>
                    </button>
                </li>
                <li>
                    <button onClick={handleLogoutAll}
                        className="text-white inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-2 px-4 shadow-sm bg-transparent relative text-stone-700 hover:text-stone-700 border-stone-500 hover:bg-white duration-150 hover:border-stone-600 rounded-full hover:opacity-80 hover:shadow-none"
                    >
                        Logout All Devices
                    </button>
                </li>
                </ul>
            </div>
            <div class="md:hidden">
                <button className="outline-none mobile-menu-button">
                <svg className="w-6 h-6 text-white" x-show="!showMenu" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
                </button>
            </div>
            </div>
            <div className="mobile-menu hidden md:hidden">
            <ul class="mt-4 space-y-4">
                <li>
                    <button
                    className="text-white inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-2 px-4 shadow-sm bg-transparent relative text-stone-700 hover:text-stone-700 border-stone-500 hover:bg-white duration-150 hover:border-stone-600 rounded-full hover:opacity-80 hover:shadow-none"
                    >
                    <a href="/">Home</a>
                    </button>
                </li>
                <li>
                    <button onClick={handleLogout}
                    className="text-white inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-2 px-4 shadow-sm bg-transparent relative text-stone-700 hover:text-stone-700 border-stone-500 hover:bg-white duration-150 hover:border-stone-600 rounded-full hover:opacity-80 hover:shadow-none"
                    >
                    <a href="/">Logout</a>
                    </button>
                </li>
                <li>
                    <button onClick={handleLogoutAll}
                        className="text-white inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-2 px-4 shadow-sm bg-transparent relative text-stone-700 hover:text-stone-700 border-stone-500 hover:bg-white duration-150 hover:border-stone-600 rounded-full hover:opacity-80 hover:shadow-none"
                    >
                        Logout All Devices
                    </button>
                </li>

            </ul>
            </div>
            
        </nav>
        </header>
    </>
  )
}

export default NavBar
