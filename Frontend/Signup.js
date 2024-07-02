import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
     // Define state variables for name, email, password, and message
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
      // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make a POST request to the signup endpoint with name, email, and password
            const response = await axios.post('http://127.0.0.1:8000/users/signup', {
                name: name,
                email: email,
                password: password
            });
            setMessage(response.data.message);
            // Redirect to signup success page after successful signup
            if (response.data.message === 'User created successfully') {
                window.location.href = '/signup-success';
            }
        } catch (error) {
            console.error(error);
            setMessage('An error occurred');
        }
    };

    // Handle navigation to the login page
    const handlelogin = () => {
        navigate('/login');
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="card-title text-center">Signup</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-3">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        placeholder="Enter your name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
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
                                <button type="submit" className="btn btn-primary mt-3 w-100" onClick={(e) => { handleSubmit(e); handlelogin(); }}>Signup</button>
                                <div className='text-center mt-2'>
                                    <span className='text-center'>Already have an account? <a href="#" onClick={handlelogin}>Login</a></span>
                                </div>
                                {message && <p className="mt-3 text-center">{message}</p>}
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
