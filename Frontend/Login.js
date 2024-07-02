import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    // Define state variables for email, password, and message
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    
     // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
             // Make a POST request to the login endpoint with email and password
            const response = await axios.post('http://127.0.0.1:8000/users/login', new URLSearchParams({
                username: email,
                password: password
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            console.log(response.data); // Debugging: log the response

            if (response.data.message === 'Login successful') {
                navigate('/tasks');
            } else {
                setMessage(response.data.message || 'Invalid credentials');
            }
        } catch (error) {
            console.error('Login error:', error); // Debugging: log the error
            setMessage('Invalid credentials or an error occurred');
            setEmail("");
            setPassword("");
        }
    };
    
     // Handle navigation to the signup page
    const handleSignup = () => {
        navigate('/signup');
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="card-title text-center">Login</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-3">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary mt-3 w-100">Login</button>
                                <div className='text-center mt-2'>
                                    <span className='text-center'>Don't have an account? <a href="#" onClick={handleSignup}>Signup</a></span>
                                </div>
                                
                                {message && <div className="alert alert-danger mt-2">{message}</div>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
