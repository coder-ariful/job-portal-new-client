import React from 'react';
import { IoLocationOutline } from "react-icons/io5";
import { TbCurrencyTaka } from "react-icons/tb";
import { TfiBag } from "react-icons/tfi";
import { Link } from 'react-router';

const HotJobCard = ({ job }) => {
    return (
        <div>
            <div className="card h-[420px]  bg-base-100 shadow-xl hover:shadow-2xl border-1 border-[#00000028] group relative p-2">
                <div className="card-header flex items-center gap-1 ">
                    <figure>
                        <img
                            className="w-16 h-16 m-1 p-1 rounded-full object-cover"
                            src={job.company_logo}
                            alt={job.company} />
                    </figure>
                    <div>
                        <h3 className="text-lg font-semibold">{job.company}</h3>
                        <p className="text-sm text-gray-500 flex items-center">
                            <IoLocationOutline className="mr-1" />
                            {job.location}
                        </p>
                    </div>
                </div>
                {/* card content */}
                <div className="p-4">
                    {/* Job Title and Type */}
                    <div>
                        <h2 className="card-title">{job.title}</h2>
                        <p className="text-sm text-gray-500 flex items-center">
                            <TfiBag className="mr-1" />
                            {job.jobType}
                        </p>
                    </div>
                    {/* Job Description */}
                    <div className='text-sm text-gray-500 my-4'>
                        {job.description.length < 70 ? <>{job.description}</> : <>{job.description.slice(0, 70)}....<Link className='link' to={`/news/${job._id}`}>Read More</Link>  </>}
                    </div>
                    {/* Job requirements */}
                    <div className="flex  gap-2 flex-wrap  my-4">
                        {
                            job.requirements.map((requirement, index) => (
                                <div key={index} className="flex items-center gap-2 bg-[#0000002b]  rounded">
                                    <p className='py-1 px-2 hover:bg-[#0000005e] hover:text-blue-400 cursor-pointer'>{requirement}</p>
                                </div>
                            ))
                        }
                    </div>
                    <div className="card-actions justify-end ">
                        <p className='absolute bottom-6 left-3 pl-4 text-[13px] text-neutral-400 flex items-center'>Salary : <TbCurrencyTaka size={15}/>{job.salaryRange.min} - <TbCurrencyTaka size={15} />{job.salaryRange.max}</p>
                        <Link to={`/jobDetails/${job._id}`} className="btn btn-primary hover:bg-blue-700 btn-sm absolute bottom-6 right-3 group-hover:bg-[#363ce8] group-hover:border-[#363ce8]">View Details</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotJobCard;