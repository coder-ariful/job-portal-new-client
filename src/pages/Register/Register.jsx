import React, { useContext } from 'react';
import registerAnimation from '../../assets/Lottie_Animation/register.json';
import Lottie from 'lottie-react';
import AuthContext from '../../Context/AuthContext/AuthContext';
import { Link, useNavigate } from 'react-router';
import SocialLogin from '../../Common/SocialLogin';
import Swal from 'sweetalert2';

const Register = () => {

    const { createUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleRegister = e => {
        e.preventDefault()
        console.log('Hello world registered');
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        // Password validation Here
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
        if (!passwordRegex.test(password)) {
            alert('Too simple Password password');
            return;
        }
        // Create user with email and password
        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log('User registered successfully:', user);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Successfully Registered",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/signIn')
            })
            .catch(error => {
                console.error('Error registering user:', error);
                alert('Error registering user: ' + error.message);
            });
        form.reset();
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left w-72 shrink-0 lg:w-96">
                    <Lottie animationData={registerAnimation} />
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <h1 className="text-5xl font-bold m-4">Register </h1>
                    <div className="card-body">
                        <form onSubmit={handleRegister} className="fieldset">
                            <label className="label">Email</label>
                            <input type="email" name='email' className="input" placeholder="Email" />
                            <label className="label">Password</label>
                            <input type="password" name='password' className="input" placeholder="Password" />

                            <div><a onClick={() => { const passwordInput = document.querySelector('input[name="password"]'); passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password'; }} className="link link-hover">Show Password?</a></div>

                            <button className="btn btn-neutral mt-4">Register</button>
                        </form>
                        <div className="divider">OR</div>
                        <SocialLogin></SocialLogin>
                        <p className="mt-4">Already have an account? <Link to="/signIn" className="link">Sign In</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;