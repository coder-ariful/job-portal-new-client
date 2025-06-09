import React from 'react';
import { motion } from "framer-motion";
import team1 from "../../assets/images/team1.jpg";
import team2 from "../../assets/images/team2.jpg";


const Banner = () => {
    return (
        <div className="hero bg-base-200 min-h-96">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className='flex-1'>
                    <div className='flex flex-col mb-20 lg:flex-row gap-4 relative'>
                        <div className='w-64'>
                            <motion.img src={team1} alt="Team Member 1"
                                animate={{ y: [0, -11, 0] }}
                                transition={{ duration: 5, repeat: Infinity, repeatType: "loop" }}
                                className="w-full border-l-4 border-b-4 border-blue-400 rounded-t-3xl rounded-br-3xl shadow-2xl mb-4"
                            />
                        </div>
                        <div className='w-64 mt-8 lg:mt-28 absolute lg:top-0 lg:left-1/2 transform lg:-translate-x-1/2'>
                            <motion.img src={team2} alt="Team Member 2"
                                animate={{ x: [0, -11, 0] }}
                                transition={{ duration: 5, repeat: Infinity, repeatType: "loop" }}
                                className="w-full border-l-4 border-b-4 border-blue-400 rounded-t-3xl rounded-br-3xl shadow-2xl mb-4"
                            />
                        </div>
                    </div>
                </div>
                <div className='flex-1'>
                    <motion.h1
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                        className="text-5xl font-bold">
                        Welcome to <motion.span

                            animate={{ color: ["#3b82f6", "#9333ea", "#3b82f6"] }}
                            transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse" }}
                            className="text-primary">Job Portal</motion.span>
                    </motion.h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                    <button className="btn btn-primary">Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;


