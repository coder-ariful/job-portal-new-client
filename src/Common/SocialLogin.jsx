import React, { useContext } from 'react';
import AuthContext from '../Context/AuthContext/AuthContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const SocialLogin = () => {

    const { signInWithGoogle, signInWithGitHub } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleGoogle = () => {
        signInWithGoogle()
            .then(result => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Successfully Login . WELCOME ${result?.user?.displayName || "USER"}`,
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/')
            })
    }
    const handleGitHub = () => {
        signInWithGitHub()
            .then(result => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Successfully Login . WELCOME ${result?.user?.displayName || 'USER'}`,
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/')
            })
    }
    return (
        <div className='flex flex-row gap-4'>
            <button className='btn flex-1' onClick={handleGoogle}>Google</button>
            <button className='btn flex-1' onClick={handleGitHub}>GitHub</button>
        </div>
    );
};

export default SocialLogin;