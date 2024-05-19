// import logo from "../../assets/logo1.png";
// import { useState, useContext } from 'react';
// import { auth, db } from "../../firebase.js";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
// import { useNavigate } from 'react-router-dom';
// import MainContext from './../../ContextApi/MainContext';
// import { toast, ToastContainer } from 'react-toastify';
// import "react-toastify/dist/ReactToastify.css";


// export default function Example() {
//     const systemContext = useContext(MainContext);
//     const navigate = useNavigate();
//     // const [userData, setUserData] = useState({
//     //     fname: '',
//     //     lname: '',
//     //     pnumber: '',
//     //     cpassword: ''
//     // });

//     const [userData, setUserData] = useState({
//         user: { fname: "", lname: "", pnumber: "", cpassword: "" }, // Initially, user is not logged in
//         email: '', // Initialize email as empty string
//         cartItems: []
//     });

//     const handleChange = (e) => {
//         setUserData({
//             ...userData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleRegister = async (e) => {
//         e.preventDefault();
//         console.log(userData);
//         try {
//             const { fname, lname, pnumber, cpassword } = userData.user;
//             const { email } = userData;

//             // Check if email and password exist
//             if (!email || !cpassword) {
//                 console.error('Email or password not found in userData');
//                 return;
//             }

//             // Firebase registration logic
//             await createUserWithEmailAndPassword(auth, email, cpassword);
//             systemContext.login(userData);
//             toast.success("Registration successful!", {
//                 position: "top-center"
//             });

//             // Add a new document in collection "users"
//             // await setDoc(doc(db, "users", email), { // Assuming email is unique and can be used as document ID
//             //     fname: fname,
//             //     lname: lname,
//             //     pnumber: pnumber,
//             //     email: email
//             // });
//             await setDoc(doc(db, "users", email), { // Assuming email is unique and can be used as document ID
//                 user: { fname: fname, lname: lname, pnumber: pnumber, cpassword: cpassword }, // Initially, user is not logged in
//                 email: email, // Initialize email as empty string
//                 cartItems: []
//             });
//             console.log('User data added to Firestore successfully!');
//             // Additional logic such as redirecting the user to another page, etc.
//             // Navigate to "/" page
//             navigate('/');
//         } catch (error) {
//             console.error('Error registering user: ', error.message);
//         }
//     }

//     return (
//         <>
//             <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 border-b-2 border-gray-300">
//                 <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//                     <img
//                         className="mx-auto h-10 w-auto"
//                         src={logo}
//                         alt="Your Company"
//                     />
//                     <h3 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
//                         Create your Walmart account
//                     </h3>
//                 </div>

//                 <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
//                     <form className="space-y-6" action="#" method="POST" onSubmit={handleRegister}>
//                         <div>
//                             <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
//                                 Email
//                             </label>
//                             <div className="mt-2">
//                                 <input
//                                     id="email"
//                                     name="email"
//                                     type="email"
//                                     autoComplete="email"
//                                     required
//                                     onChange={handleChange}
//                                     className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                                 />
//                             </div>
//                         </div>
//                         <div>
//                             <label htmlFor="fname" className="block text-sm font-medium leading-6 text-gray-900">
//                                 First Name
//                             </label>
//                             <div className="mt-2">
//                                 <input
//                                     id="fname"
//                                     name="fname"
//                                     type="text"
//                                     autoComplete="fname"
//                                     required
//                                     onChange={handleChange}
//                                     className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                                 />
//                             </div>
//                         </div>
//                         <div>
//                             <label htmlFor="lname" className="block text-sm font-medium leading-6 text-gray-900">
//                                 Last Name
//                             </label>
//                             <div className="mt-2">
//                                 <input
//                                     id="lname"
//                                     name="lname"
//                                     type="text"
//                                     autoComplete="lname"
//                                     required
//                                     onChange={handleChange}
//                                     className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                                 />
//                             </div>
//                         </div>
//                         <div>
//                             <label htmlFor="pnumber" className="block text-sm font-medium leading-6 text-gray-900">
//                                 Phone Number
//                             </label>
//                             <div className="mt-2">
//                                 <input
//                                     id="pnumber"
//                                     name="pnumber"
//                                     type="tel"
//                                     autoComplete="pnumber"
//                                     required
//                                     onChange={handleChange}
//                                     className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                                 />
//                             </div>
//                         </div>
//                         <div>
//                             <label htmlFor="cpassword" className="block text-sm font-medium leading-6 text-gray-900">
//                                 Create a password
//                             </label>
//                             <div className="mt-2">
//                                 <input
//                                     id="cpassword"
//                                     name="cpassword"
//                                     type="text"
//                                     autoComplete="cpassword"
//                                     required
//                                     onChange={handleChange}
//                                     className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                                 />
//                             </div>
//                         </div>

//                         <h6 className="text-xs text-black text-left mt-4">
//                             By clicking Continue, you acknowledge you have read and agreed to our{' '}
//                             <a href="#" className="underline">
//                                 Terms of Use
//                             </a> and
//                             <a href="#" className="underline">
//                                 Privacy Policy.
//                             </a>Message and data rates may apply. View our
//                             <a href="#" className="underline"> Mobile Alerts Terms.</a>
//                         </h6>
//                         <button
//                             type="submit"
//                             className="flex w-full justify-center rounded-full bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                             style={{ backgroundColor: "#0071dc" }}
//                         >
//                             Continue
//                         </button>
//                     </form>
//                 </div>
//             </div>
//             <ToastContainer />
//             <div className="flex justify-center my-5">
//                 <a className="text-sm font-normal text-center mr-4">© 2024 Walmart. All Rights Reserved.</a>
//                 <a className="text-sm font-normal text-center mx-4">Give feedback</a>
//                 <a className="text-sm font-normal text-center mx-4">CA Privacy Rights</a>
//                 <a className="text-sm font-normal text-center mx-4">Your Privacy Choices</a>
//                 <a className="text-sm font-normal text-center mx-4">Notice at Collection</a>
//                 <a className="text-sm font-normal text-center mx-4">Request My Personal Information</a>
//                 <a className="text-sm font-normal text-center mx-4">California Supply Chains Act</a>
//             </div>
//         </>
//     )
// }






















import logo from "../../assets/logo1.png";
import { useState, useContext } from 'react';
import { auth, db } from "../../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import MainContext from './../../ContextApi/MainContext';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function Example() {
    const systemContext = useContext(MainContext);
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        user: { fname: "", lname: "", pnumber: "", cpassword: "" },
        email: '',
        cartItems: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name in userData.user) {
            setUserData({
                ...userData,
                user: { ...userData.user, [name]: value }
            });
        } else {
            setUserData({
                ...userData,
                [name]: value
            });
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        console.log(userData);
        try {
            const { fname, lname, pnumber, cpassword } = userData.user;
            const { email } = userData;

            if (!email || !cpassword) {
                console.error('Email or password not found in userData');
                return;
            }

            await createUserWithEmailAndPassword(auth, email, cpassword);
            systemContext.login(userData);
            toast.success("Registration successful!", {
                position: "top-center"
            });

            await setDoc(doc(db, "users", email), {
                user: { fname, lname, pnumber, cpassword },
                email,
                cartItems: []
            });
            console.log('User data added to Firestore successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error registering user: ', error.message);
        }
    }

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 border-b-2 border-gray-300">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src={logo}
                        alt="Your Company"
                    />
                    <h3 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Create your Walmart account
                    </h3>
                </div>

                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST" onSubmit={handleRegister}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="fname" className="block text-sm font-medium leading-6 text-gray-900">
                                First Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="fname"
                                    name="fname"
                                    type="text"
                                    autoComplete="fname"
                                    required
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="lname" className="block text-sm font-medium leading-6 text-gray-900">
                                Last Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="lname"
                                    name="lname"
                                    type="text"
                                    autoComplete="lname"
                                    required
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="pnumber" className="block text-sm font-medium leading-6 text-gray-900">
                                Phone Number
                            </label>
                            <div className="mt-2">
                                <input
                                    id="pnumber"
                                    name="pnumber"
                                    type="tel"
                                    autoComplete="pnumber"
                                    required
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="cpassword" className="block text-sm font-medium leading-6 text-gray-900">
                                Create a password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="cpassword"
                                    name="cpassword"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <h6 className="text-xs text-black text-left mt-4">
                            By clicking Continue, you acknowledge you have read and agreed to our{' '}
                            <a href="#" className="underline">
                                Terms of Use
                            </a> and
                            <a href="#" className="underline">
                                Privacy Policy.
                            </a>Message and data rates may apply. View our
                            <a href="#" className="underline"> Mobile Alerts Terms.</a>
                        </h6>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-full bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            style={{ backgroundColor: "#0071dc" }}
                        >
                            Continue
                        </button>
                    </form>
                </div>
            </div>
            <ToastContainer />
            <div className="flex justify-center my-5">
                <a className="text-sm font-normal text-center mr-4">© 2024 Walmart. All Rights Reserved.</a>
                <a className="text-sm font-normal text-center mx-4">Give feedback</a>
                <a className="text-sm font-normal text-center mx-4">CA Privacy Rights</a>
                <a className="text-sm font-normal text-center mx-4">Your Privacy Choices</a>
                <a className="text-sm font-normal text-center mx-4">Notice at Collection</a>
                <a className="text-sm font-normal text-center mx-4">Request My Personal Information</a>
                <a className="text-sm font-normal text-center mx-4">California Supply Chains Act</a>
            </div>
        </>
    )
}

