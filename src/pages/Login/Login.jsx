import React, { useContext } from 'react';
import LoginAnimation from '../../assets/Lottie_Animation/Login.json';
import Lottie from 'lottie-react';
import AuthContext from '../../Context/AuthContext/AuthContext';
import SocialLogin from '../../Common/SocialLogin';
import { Link, useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const Login = () => {

    const { signInUser } = useContext(AuthContext)

    const location = useLocation()
    const navigate = useNavigate()
    const reDirectTo = location.state?.from?.pathname || '/';

    const handleSignIn = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signInUser(email, password)
            .then((result) => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Successfully Login`,
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(reDirectTo, { replace: true }); // Redirect to the previous page or home
                console.log('sign In ', result.user.email);
                form.reset(); // Reset the form after successful login

            })
            .catch(error => {
                console.error('Error logging in:', error);
                alert('there is a error.')
            });
    };
    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left w-72 shrink-0 lg:w-96">
                        <Lottie animationData={LoginAnimation} />
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <h1 className="text-5xl font-bold m-4">Login </h1>
                        <div className="card-body">
                            <form onSubmit={handleSignIn} className="fieldset">
                                <label className="label">Email</label>
                                <input type="email" name='email' className="input" placeholder="Email" />
                                <label className="label">Password</label>
                                <input type="password" name='password' className="input" placeholder="Password" />

                                <div><a onClick={() => { const passwordInput = document.querySelector('input[name="password"]'); passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password'; }} className="link link-hover">Show Password?</a></div>

                                <button className="btn btn-neutral mt-4">Login</button>
                            </form>
                            <div className="divider">OR</div>
                            <SocialLogin></SocialLogin>
                            <p className="mt-4">Don't have an account? <Link to="/register" className="link">Register</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;