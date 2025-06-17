import React, { useContext } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router';
import AuthContext from '../../Context/AuthContext/AuthContext';
import Swal from 'sweetalert2';

const JobApply = () => {
    const jobId = useParams() // this params for only search box filed right
    console.log('job id:', jobId);
    const loader = useLoaderData();
    console.log('loader id:', loader._id);

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleApply = (event) => {
        event.preventDefault();
        const form = event.target;
        const linkedin = form.linkedin.value;
        const gitHub = form.gitHub.value;
        const portfolio = form.portfolio.value;
        if (!linkedin || !gitHub || !portfolio) {
            return alert('Please fill all fields');
        }
        if (loader._id === undefined) {
            return alert('Please fill right job id');
        }
        const applyData = {
            jobId: jobId.id,
            userEmail: user.email,
            linkedin,
            gitHub,
            portfolio
        };

        fetch(`http://localhost:3000/job-application`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(applyData),
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Applying is Completed",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    form.reset();
                    navigate('/myApplications');
                }
            })
        console.log(applyData);
    }
    return (
        <div>
            <div className="hero bg-base-200 min-h-[61vh] ">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Job Apply</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            <form onSubmit={handleApply} className="fieldset">
                                <label className="label font-bold">Linkedin URL</label>
                                <input type="url" className="input font-medium" name='linkedin' placeholder="Linkedin URL" />
                                <label className="label font-bold">Github URL</label>
                                <input type="url" className="input font-medium" name='gitHub' placeholder="Github URL" />
                                <label className="label font-bold">Portfolio URL</label>
                                <input type="url" className="input font-medium" name='portfolio' placeholder="Portfolio URL" />
                                <button className="btn btn-neutral mt-4">Apply Complete</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobApply;