import { useState } from "react";
import { Button, Input, Logo } from "../../components";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext.jsx";

function Login() {
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form default submission

        // Basic validation - at least username/email and password required
        if (!formData.password || (!formData.username && !formData.email)) {
            return; // Let browser handle required field validation
        }

        try {
            setIsLoading(true);
            setError(null);
            await login(formData);

            setFormData({
                username: "",
                email: "",
                password: ""
            });

            toast.success("Login successful!");
            navigate('/');

        } catch (err) {
            setError(err);
            toast.error('Login failed');
            console.error("Login error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    // Demo login handler
    const handleDemoLogin = async () => {
        const demoData = {
            username: 'demo',
            email: 'demo@gmail.com',
            password: '123456'
        };

        try {
            setIsLoading(true);
            setError(null);
            await login(demoData);

            setFormData({
                username: "",
                email: "",
                password: ""
            });

            toast.success("Demo login successful!");
            navigate('/');

        } catch (err) {
            setError(err);
            toast.error('Demo login failed');
            console.error('Demo login error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen overflow-y-auto bg-white text-slate-900 dark:bg-[#121212] dark:text-white">
            <div className="mx-auto my-8 flex w-full max-w-sm flex-col px-4">
                <Logo width={20} />
                <hr className="mb-6 border-transparent" />
                {error && (
                    <div className="mb-4 p-3 bg-red-600 text-white rounded-lg text-sm">
                        {error?.response?.data?.message || error?.message || 'Login failed'}
                    </div>
                )}
                {/* )} */}

                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <Input
                        label={'Username'}
                        type={'text'}
                        name={'username'}
                        onChange={handleChange}
                        value={formData.username}
                        placeholder={'Enter your username'}
                    />
                    <Input
                        label={'Email'}
                        type={'email'}
                        name={'email'}
                        onChange={handleChange}
                        value={formData.email}
                        placeholder={'Enter your email'}
                    />
                    <Input
                        label={'Password*'}
                        type={'password'}
                        name={'password'}
                        onChange={handleChange}
                        value={formData.password}
                        placeholder={'Enter your password'}
                        required
                    />
                    <div className='mb-3'>
                        <input
                            type="checkbox"
                            required
                            className="mr-2 h-4 w-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <Link to={'/term-and-condition'} className='underline'>Terms & Conditions</Link>
                    </div>
                    <Button
                        type={'submit'}
                        disabled={isLoading}>
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </Button>

                    <Button
                        type={'button'}
                        disabled={isLoading}
                        onClick={handleDemoLogin}
                        className="mt-3 bg-gray-800 hover:bg-gray-700 text-gray-200"
                    >
                        {isLoading ? 'Signing In...' : 'Login as Demo'}
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-400">
                    Don't have an account?{' '}
                    <Link
                        to="/register"
                        className="text-blue-600 dark:text-blue-500 hover:underline font-semibold"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login