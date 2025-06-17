import React, { useContext } from 'react';
import AuthContext from '../../Context/AuthContext/AuthContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const AddJob = () => {
    const { loading, user } = useContext(AuthContext)
    const navigate = useNavigate()

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <button className="btn loading">loading</button>
        </div>
    }
    // const handleOnAddJob = (e) => {
    //     e.preventDefault();
    //     const form = e.target;
    //     const title = form.title.value;
    //     const company = form.company.value;
    //     const location = form.location.value;
    //     const description = form.description.value;
    //     const jobType = form.jobType.value;
    //     const salary = form.salary.value;
    //     const companyLogo = form.companyLogo.value;
    //     const applicationDeadline = form.applicationDeadline.value;

    //     if (!title || !company || !location || !description || !jobType || !salary || !companyLogo || !applicationDeadline) {
    //         return alert('Please fill all fields');
    //     }
    //     if (salary === '' || isNaN(salary)) {
    //         return alert('Please enter a valid salary or Give a number');
    //     }

    //     const jobData = {
    //         title,
    //         company,
    //         location,
    //         description,
    //         jobType,
    //         salary,
    //         companyLogo,
    //         applicationDeadline
    //     };

    //     console.log(jobData);

    //     // fetch('http://localhost:3000/job', {
    //     //     method: 'POST',
    //     //     headers: {
    //     //         'Content-Type': 'application/json',
    //     //     },
    //     //     body: JSON.stringify(jobData),
    //     // })
    //     //     .then(res => res.json())
    //     //     .then(data => {
    //     //         if (data.acknowledged) {
    //     //             alert('Job added successfully');
    //     //             form.reset();
    //     //         }
    //     //     })
    //     //     .catch(error => {
    //     //         console.error('Error adding job:', error);
    //     //         alert('Failed to add job. Please try again.');
    //     });
    // }

    const handleAddJob = e => {
        e.preventDefault();
        const formData = new FormData(e.target)
        const initialData = Object.fromEntries(formData.entries())
        console.log(initialData);
        const { min, max, ...newJob } = initialData;
        newJob.requirements = newJob.requirements.split('\n')
        newJob.salaryRange = { min: parseInt(min), max: parseInt(max) }

        fetch('http://localhost:3000/jobs', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newJob) // with this  we send data in body
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    Swal.fire({
                        title: "Successfully Added.",
                        icon: "success",
                        draggable: true
                    });
                    navigate('/myPostedJobs')
                }
            })

    }
    return (
        <div className="card-body bg-base-200 min-h-[61vh]">
            <h2 className="card-title text-2xl mx-auto">Add a New Job</h2>
            {/* <form onSubmit={handleOnAddJob} className="fieldset"> */}
            <form onSubmit={handleAddJob} className="fieldset">
                <label className="label">Job Title</label>
                <input type="text" name='title' className="input w-full" placeholder="Job Title" required />
                <label className="label">Company</label>
                <input type="text" name='company' className="input w-full" placeholder="Company" required />
                <label className="label">Location</label>
                <input type="text" name='location' className="input w-full" placeholder="Location" required />
                <label className="label">Requirements</label>
                <textarea name='requirements' className="textarea w-full" placeholder="Job requirements" required ></textarea>
                <label className="label">description</label>
                <textarea name='description' className="textarea w-full" placeholder="Job description" required ></textarea>
                <label className="label">Job Type</label>
                <select defaultValue="Pick a font" className="select  w-full" name='jobType' required>
                    <option disabled={true}>Job Type</option>
                    <option>Full Time</option>
                    <option>Part Time</option>
                    <option>Contract</option>
                </select>


                <label className="label">Salary</label>
                <div className='flex gap-8'>
                    <input type="string" name='min' className="input grow" placeholder="Min Salary" required />
                    <input type="string" name='max' className="input grow" placeholder="Max Salary" required />
                </div>

                <label className="label">HR Name</label>
                <input type="text" name='hr_name' className="input w-full" placeholder="HR Name" required />
                
                <label className="label">HR Email</label>
                <input type="email" name='hr_email' value={user.email} className="input w-full" placeholder="HR Email" required />

                <label className="label">Company Logo URL</label>
                <input type="url" name='company_logo' className="input w-full" placeholder="Company Logo URL" required />
                <label className="label">Application Deadline</label>
                <input type="date" name='applicationDeadline' className="input w-full" placeholder="Application Deadline" required />
                <button className="btn btn-neutral rounded mt-4 hover:bg-[#000000e7] hover:text-neutral-500" >Add Job</button>
            </form>
        </div>
    );
};

export default AddJob;