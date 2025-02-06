interface RegisterForm {
    full_name: string;
    email: string;
    password: string;
}

interface HandleRegisterProps {
    registerForm: RegisterForm;
    setRegisterForm: React.Dispatch<React.SetStateAction<RegisterForm>>
    setError: React.Dispatch<React.SetStateAction<string>>;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>,
    { registerForm, setRegisterForm, setError, setMessage}: HandleRegisterProps
) => {
    e.preventDefault();

    const { full_name, email, password } = registerForm || {};

    if (!full_name?.trim() || !email?.trim() || !password?.trim()) {
        setError("all fields are required");
        return;
    }

    try {
        const response = await fetch("http://localhost:3002/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                full_name,
                email,
                password
            }),
        });

        const data = await response.json();

        if (response.ok) {
            const newRegisterForm: RegisterForm = {
                full_name: data.full_name,
                email: data.email,
                password: data.password,
            }
            setRegisterForm((prev) => ({ ...prev, ...newRegisterForm, }));
            setMessage(data.message)
        } else {
            setError(data.error || "Failed to log in");
        }
    } catch (error) {
        console.error("Error regitsering user:", error);
        setError("Error registering user");
    }
};

export default handleRegister;
