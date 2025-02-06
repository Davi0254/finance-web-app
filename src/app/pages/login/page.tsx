'use client'

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import handleLogin from '../../utils/userUtils/handleLogin';
import { useRouter } from 'next/navigation';

const Login = () => {
    const [message, setMessage] = useState("");
    const [loginForm, setLoginForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [token, setToken] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setLoginForm((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    }

    useEffect(() => {
        if (token) {
            localStorage.setItem('email', loginForm.email)
            localStorage.setItem('jwt_token', token)
        }
    }, [token, loginForm.email])

    const router = useRouter();

    token && router.push('/')

    return (
        <form
            onSubmit={(e) => handleLogin(e, {
                loginForm,
                setLoginForm,
                setToken,
                setError,
                setMessage
            })}
            className="flex justify-center items-center h-screen">
            <div className="bg-white flex flex-col justify-center items-center gap-8 rounded sm:px-20 py-8 px-12 shadow">
                <h1 className="font-bold">LOGIN</h1>
                <div className="flex flex-col gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="email"
                        id="email"
                        placeholder="Email"
                        value={loginForm.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col gap-1.5">
                    <Label htmlFor="paswword">Password</Label>
                    <Input
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={loginForm.password}
                        onChange={handleChange}
                    />
                </div>
                <Button variant="default">Login</Button>
                <div className="flex flex-col items-center text-sm gap-2">
                    <p>Forgot Email/Password?</p>
                    <Link className="text-blue-600 hover:text-blue-800" href="/pages/register">Create Account</Link>
                    <Link className="text-blue-600 hover:text-blue-800" href="/">Home</Link>
                </div>
                <div>{message || error}</div>
            </div>
        </form>
    )
}

export default Login;