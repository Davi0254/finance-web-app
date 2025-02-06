'use client'

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import handleRegister from "../../utils/userUtils/handleRegister"

const Register = () => {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [registerForm, setRegisterForm] = useState({
        full_name: "",
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setRegisterForm((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    }

    const router = useRouter();

    message && router.push('/pages/login');

    return (
        <form
            onSubmit={(e) => handleRegister(e, { registerForm, setRegisterForm, setError, setMessage })}
            className="flex justify-center items-center h-screen">
            <div className="bg-white flex flex-col justify-center items-center gap-8 rounded-md sm:px-20 py-8 px-12 shadow">
                <h1 className="font-bold">Register</h1>
                <div className="flex flex-col gap-1.5">
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input
                        type="text"
                        id="full_name"
                        placeholder="Full Name"
                        value={registerForm.full_name}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="email"
                        id="email"
                        placeholder="Email"
                        value={registerForm.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col gap-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={registerForm.password}
                        onChange={handleChange}
                    />
                </div>
                <Button type="submit" variant="default">Register</Button>
                <div className="flex flex-col items-center text-sm gap-2">
                    <Link className="text-blue-600 hover:text-blue-800" href="/pages/login">Login</Link>
                </div>
                <div>{message || error}</div>
            </div>
        </form>
    )
}

export default Register;