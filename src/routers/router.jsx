import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import JobDetail from "../pages/JobDetails/JobDetail";
import PrivateRoute from "./privateRoute";
import JobApply from "../pages/JobApply/JobApply";
import MyApplications from "../pages/MyApplication/MyApplications";
import AddJob from "../pages/AddJob/AddJob";
import MyPostedJobs from "../pages/MyPostedJobs/MyPostedJobs";
import ViewApplications from "../pages/viewApplications/viewApplications";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <h1>Page Route Not Found</h1>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "jobDetails/:id",
                element: <PrivateRoute><JobDetail></JobDetail></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:3000/jobDetails/${params.id}`)
            },
            {
                path: "jobApply/:id",
                element: <PrivateRoute><JobApply></JobApply></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:3000/jobDetails/${params.id}`)
            },
            {
                path: "myApplications",
                element: <PrivateRoute><MyApplications></MyApplications></PrivateRoute>
            },
            {
                path: "myPostedJobs",
                element: <PrivateRoute><MyPostedJobs></MyPostedJobs></PrivateRoute>
            },
            {
                path: "viewApplications/:job_id",
                element: <PrivateRoute><ViewApplications></ViewApplications></PrivateRoute>,
                loader: ({params}) => fetch(`http://localhost:3000/job-application/jobs/${params.job_id}`)
            },
            {
                path: "addJob",
                element: <PrivateRoute><AddJob></AddJob></PrivateRoute>
            },
            {
                path: "register",
                element: <Register></Register>
            },
            {
                path: "signIn",
                element: <Login></Login>
            }
        ]
    }
])

export default router;