import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../Context/AuthContext/AuthContext';
import { Link } from 'react-router';
// import axios from 'axios';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MyPostedJobs = () => {
    const { user, loading } = useContext(AuthContext)
    const [jobs, setJobs] = useState([])
    const axiosInstance = useAxiosSecure()



    useEffect(() => {

        // fetch(`http://localhost:3000/jobs?email=${user.email}`)
        //     .then(res => res.json())
        //     .then(data => setJobs(data))

        //  ====== use axios here =======
        // axios.get(`http://localhost:3000/jobs/user?email=${user.email}`, { withCredentials: true })
        axiosInstance.get(`/jobs/user?email=${user.email}`)
            .then(res => setJobs(res.data))
            .catch(error => {
                Swal.fire({
                    title: error.response.data.message,
                    icon: "error",
                    draggable: true
                });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.email])

    if (loading) {
        return <h1 className='text-center my-9 text-4xl'>Loading....</h1>
    }

    if (!jobs.length) {
        return <h1 className='text-center my-9 text-4xl'> My Posted Job Is Here. total jobs is : {jobs.length}</h1>
    }
    return (
        <div className='m-5'>
            {/* My Posted Job Is Here. total jobs is : {jobs.length} */}

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>HR Name</th>
                            <th>Job Title</th>
                            <th>DeadLine</th>
                            <th>Total application Count </th>
                            <th>View Applications </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            jobs.map((job, index) =>
                                <tr key={job._id + 'helloApplication'} className="">
                                    <th>{index + 1}</th>
                                    <td>{job.hr_name}</td>
                                    <td>{job.title}</td>
                                    <td>{job.applicationDeadline}</td>
                                    <td>{job.applicationCount}</td>
                                    <td>
                                        <Link to={`/viewApplications/${job._id}`}>
                                            <button className='btn btn-link'>
                                                view applications
                                            </button>
                                        </Link>
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyPostedJobs;