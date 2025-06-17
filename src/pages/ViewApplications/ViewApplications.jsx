import React from 'react';
import { useLoaderData } from 'react-router';

const ViewApplications = () => {
    const loader = useLoaderData()
    console.log(loader);
    const handleOnChangeStatusUpdate = (e, id) => {
        console.log(e.target.value, "id " + id);
        const data = {
            status: e.target.value
        }
        fetch(`http://localhost:3000/job-application/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
    }
    return (
        <div>
            View Applications here only. {loader.length}
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Update Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loader.map((application, index) =>
                                <tr key={application._id + "Hello world again."} className="bg-base-200">
                                    <th>{index + 1}</th>
                                    <td>{application.userEmail}</td>
                                    <td className='text-green-500'>
                                        {application.status ?
                                            application.status
                                            :
                                            "Not Seeing now"}
                                    </td>
                                    <td>
                                        <select onChange={(e) => { handleOnChangeStatusUpdate(e, application._id) }} defaultValue={application.status || "Change Status"} className="select select-neutral">
                                            <option disabled>Change Status</option>
                                            <option>UnderReview</option>
                                            <option>Set Interview</option>
                                            <option>Hired</option>
                                            <option>Rejected</option>
                                        </select>
                                    </td>

                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewApplications;