import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState('');

    const navigate = useNavigate();

    const handleSubmitForm = async (e) => {
        e.preventDefault();

        const values = { name, email, password, age, gender };

        try {
            const res = await axios.post('http://localhost:5000/api/v1/create-user', values);
            if (res.data) {
                alert(res.data.message);
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
        console.log('user-data-values', values);
    };

    return (
        <div className="min-h-screen flex items-center justify-center  px-4">
            <form
                onSubmit={handleSubmitForm}
                className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-4"
            >
                <h2 className="text-2xl font-semibold text-center text-gray-700">
                    Create Account
                </h2>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Full Name
                    </label>
                    <input
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="john@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Age
                    </label>
                    <input
                        type="number"
                        placeholder="20"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Gender
                    </label>
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full px-3 py-1 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition"
                >
                    Submit
                </button>

                <Link className='flex justify-center' to={'/login'}>
                    <span>Already have an account!! Login</span>
                </Link>
            </form>

        </div>
    );
};
