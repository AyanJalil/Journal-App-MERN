import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                alert('Login successful!');
                navigate('/');
                const user = JSON.stringify(result.user);
                localStorage.setItem('user', user);
                localStorage.setItem('token', result.token);
            } else {
                console.error('Login failed:', result.message);
                alert(result.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred during login. Please try again.');
        }
    };


  return (
    <>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Login</h2>
        
        <form className="space-y-4">
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
            type="email" 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            placeholder="your@email.com"
            name='email'
            value={formData.email}
            onChange={handleChange}
            />
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
            type="password" 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            placeholder="••••••••"
            name='password'
            value={formData.password}
            onChange={handleChange}
            />
        </div>

        <button onClick={handleSubmit} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
            Login
        </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
        Don't have an account? 
        <a href="/register" className="text-indigo-600 hover:text-indigo-500 font-medium">Sign up</a>
        </div>
    </div>
    </div>
    </>
  )
}

export default Login
