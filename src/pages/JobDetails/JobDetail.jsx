import React from 'react';
import { Link, useLoaderData } from 'react-router';

const JobDetail = () => {
    const job = useLoaderData()
    // console.log(job);
    return (
        <div className='container mx-auto my-8'>
            <h3 className='text-4xl'> Job Details For {job.title}</h3>
            <h5 className='text-xl my-1'>Company: {job.company}</h5>
            <p className='text-lg my-1'>Location: {job.location}</p>
            <p className='text-lg my-1'>Job Type: {job.jobType}</p>
            <p className='text-lg my-1'>Salary Range: {job.salaryRange.min} - {job.salaryRange.max}</p>
            <Link to={`/jobApply/${job._id}`} className='btn btn-primary mt-4'>Apply Now</Link>
        </div>
    );
};

export default JobDetail;