import React, { useContext } from 'react';
import AuthContext from '../Context/AuthContext/AuthContext';

const SocialLogin = () => {
    const { signInWithGoogle, signInWithGitHub } = useContext(AuthContext)
    return (
        <div className='flex flex-row gap-4'>
            <button className='btn flex-1' onClick={signInWithGoogle}>Google</button>
            <button className='btn flex-1' onClick={signInWithGitHub}>GitHub</button>
        </div>
    );
};

export default SocialLogin;