interface LoginForm {
    email: string;
    password: string;
}

interface HandleLoginProps {
    loginForm: LoginForm;
    setLoginForm: React.Dispatch<React.SetStateAction<LoginForm>>
    setError: React.Dispatch<React.SetStateAction<string>>;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    setToken: React.Dispatch<React.SetStateAction<string>>;
}

const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>,
    { loginForm, setLoginForm, setToken, setError, setMessage}: HandleLoginProps
) => {
    e.preventDefault();

    const { email, password } = loginForm || {};

    if (!email?.trim() || !password?.trim()) {
        setError("all fields are required");
        return;
    }

    try {
        const response = await fetch("http://localhost:3002/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password
            }),
        });

        const data = await response.json();

        if (response.ok) {
            const newLoginForm: LoginForm = {
                email: data.email,
                password: data.password,
            }
            setLoginForm((prev) => ({ ...prev, ...newLoginForm, }));
            setMessage(data.message)
            setToken(data.token);
        } else {
            setError(data.error || "Failed to login");
        }
    } catch (error) {
        console.error("Error logging in:", error);
        setError("Error Logging user");
    }
};

export default handleLogin;