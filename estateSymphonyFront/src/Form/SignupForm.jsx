import { useState, useContext } from "react";
import { createUser } from "../../../../node-api/controller/User/UserController";
import { AuthContext } from "../AuthContext/AuthContext";



const SignupForm = () => {
    const { login } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const userData = {
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password,
            };
            const data = await createUser(userData);
            login(data.token); // Assuming createUser returns a token upon successful user creation
        } catch (error) {
            setError('Failed to create user');
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                />
                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignupForm;