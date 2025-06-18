import axios from 'axios';
import AuthContext from '../Context/AuthContext/AuthContext';
import { useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const axiosInstance = axios.create({
    // baseURL: 'http://localhost:3000',
    baseURL : 'https://job-portal-server-psi-five.vercel.app',
    withCredentials: true
})


const useAxiosSecure = () => {
    const { signOutUser } = useContext(AuthContext)
    // const navigate = useNavigate()


    useEffect(() => {

        axiosInstance.interceptors.response.use(response => {
            return response
        }, error => {

            if (error.status === 401 || error.status === 403) {
                signOutUser()
                    .then(() => {
                        Swal.fire({
                            position: "end",
                            icon: "error",
                            title: error.response.data.message,
                            showConfirmButton: true,
                            // timer: 1500
                        });
                        console.log(error);
                        // navigate('/signIn')
                    })
            }

            return Promise.reject(error)
        })
        
    }, [signOutUser])

    // useEffect(() => {
    //     axiosInstance.interceptors.response.use(response => {
    //         return response
    //     }, error => {
    //         if (error.response.status === 403 || error.response.status === 401) {
    //             // console.log('error in interceptors : ', error);
    //             signOutUser()
    //                 .then(() => {
    //                     Swal.fire({
    //                         position: "end",
    //                         icon: "error",
    //                         title: `Access denied`,
    //                         showConfirmButton: true
    //                         // timer: 1500
    //                     });
    //                     navigate('/signIn')
    //                 })

    //         }
    //         return Promise.reject(error)
    //     })
    // }, [])
    return axiosInstance
};

export default useAxiosSecure;