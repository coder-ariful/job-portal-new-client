import React, { useEffect, useState } from 'react';
import HotJobCard from './HotJobCard';
import axios from 'axios';

const HotJobs = () => {
    const [jobs, setJobs] = useState([])

    useEffect(() => {
        // fetch('http://localhost:3000/jobs')
        //     .then(response => response.json())
        //     .then(data => setJobs(data))
        axios.get('http://localhost:3000/jobs', {withCredentials : true})
        .then(res => setJobs(res.data))
        .catch(error => console.log('error',error))
    }, [])
    return (
        <div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-8 '> 
                {
                    jobs.map(job => (<HotJobCard key={job._id+'Jobs'} job={job} />))}
            </div>
        </div>
    );
};

export default HotJobs;