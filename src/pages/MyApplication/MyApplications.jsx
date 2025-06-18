import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../Context/AuthContext/AuthContext';
import { MdDeleteForever } from "react-icons/md";
import Swal from 'sweetalert2';
// import axios from 'axios';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MyApplications = () => {
    const { user, loading } = useContext(AuthContext);
    const [jobs, setJobs] = useState([]);
    const axiosInstance = useAxiosSecure()

    useEffect(() => {
        // fetch(`http://localhost:3000/job-application?email=${user?.email}`)
        //     .then(res => res.json())
        //     .then(data => {
        //         setJobs(data);
        //         // You can set the data to state if needed
        //     })

        // axios.get(`http://localhost:3000/job-application?email=${user?.email}`, { withCredentials: true })
        axiosInstance.get(`/job-application?email=${user?.email}`)
            .then(res => setJobs(res.data))
            .catch(error => {
                Swal.fire({
                    title: error.response.data.message, 
                    icon: "error",
                    draggable: true
                });
            });
    }, [user?.email])

    // for (const job of jobs) {
    //     if (!job?.name || !job?.title || !job?.company_logo || !job?.location || !job?.jobType) { 
    //         console.warn('Incomplete job data:', job);
    //         continue; // Skip this job if any required field is missing
    //     }
    //     console.log(job._id);
    //     handleDelete()
    // }
    const handleDelete = (jobId) => {
        // const confirmDelete = window.confirm("Are you sure you want to delete this application?");
        // if (confirmDelete) {
        // fetch(`http://localhost:3000/job-application/${jobId}`, {
        //     method: 'DELETE',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     }
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         if (data.deletedCount > 0) {
        //             alert('Application deleted successfully');
        //             setJobs(jobs.filter(job => job._id !== jobId));
        //         }
        //     })
        //     .catch(error => {
        //         console.error('Error deleting application:', error);
        //     });

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                fetch(`http://localhost:3000/job-application/${jobId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            // alert('Application deleted successfully');
                            setJobs(jobs.filter(job => job._id !== jobId));
                        }
                    })
                    .catch(error => {
                        console.error('Error deleting application:', error);
                    });
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Your imaginary file is safe :)",
                    icon: "error"
                });
            }
        });
    }


    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <button className="btn loading">loading</button>
        </div>
    }



    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Job</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            jobs.map(job =>
                                <tr key={job._id}>

                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={job?.company_logo || "https://api.lorem.space/image/face?hash=33791"}
                                                        alt={job?.company_name || "Company Logo"} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{job?.name || "Unknown"}</div>
                                                <div className="text-sm opacity-50">{job?.location || "Unknown"}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="font-bold">{job?.title || "Unknown Job Title"}</div>
                                        <br />
                                        <span className="badge badge-ghost badge-sm">{job?.jobType || "Unknown Category"}</span>
                                    </td>
                                    <th>
                                        <button onClick={() => { handleDelete(job._id) }} className="btn btn-ghost btn-lg hover:text-red-500">
                                            <MdDeleteForever className='text-2xl  ' />
                                        </button>
                                    </th>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default MyApplications;