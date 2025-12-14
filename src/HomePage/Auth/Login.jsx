import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmitForm = async (e) => {
        e.preventDefault();

        const values = { email, password };

        try {
            const res = await axios.post(
                "http://localhost:5000/api/v1/sign-in-user",
                values
            );

            console.log(res.data);
            

            if (res.data) {
                localStorage.setItem("userId", res.data.id);
                localStorage.setItem("Name", res.data.name);
                localStorage.setItem("token", res.data.token);

                alert(res.data.message);
                navigate("/home-page");
            } else {
                alert(res.data.message || "Login failed");
            }
        } catch (error) {
            alert(error.response?.data?.message || "Invalid login");
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center  px-4">
            <form
                onSubmit={handleSubmitForm}
                className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-6 border border-t-[6px] border-t-blue-700"
            >
                <h2 className="text-2xl font-semibold text-center text-gray-700">
                    Welcome Back!!!!!
                </h2>

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

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition"
                >
                    Submit
                </button>
                <Link className='flex justify-center' to={'/'}>
                    <span>Don't have an account!! Create one</span>
                </Link>
            </form>
        </div>
    );
};
