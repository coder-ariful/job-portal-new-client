import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../Context/AuthContext/AuthContext';

const MyPostedJobs = () => {
    const { user } = useContext(AuthContext)
    const [jobs, setJobs] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3000/jobs?email=${user.email}`)
            .then(res => res.json())
            .then(data => setJobs(data))
    }, [user.email])
    return (
        <div>
            My Posted Job Is Here. total jobs is : {jobs.length}

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
                        </tr>
                    </thead>
                    <tbody>
                        {
                            jobs.map((job, index) =>
                                <tr key={job._id + 'helloApplication'} className="">
                                    <th>{index+1}</th>
                                    <td>{job.hr_name}</td>
                                    <td>{job.title}</td>
                                    <td>{job.applicationDeadline}</td>
                                    <td>{job.applicationCount}</td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyPostedJobs;