import logo from "../../assets/logo1.png";
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from "../../firebase.js";
import { doc, getDoc } from "firebase/firestore";
import { auth } from "../../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import MainContext from './../../ContextApi/MainContext';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function Example() {
  const systemContext = useContext(MainContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailCheck, setEmailCheck] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      systemContext.login(parsedUserData);
      navigate('/');
    }
  }, [navigate, systemContext]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const isRegistered = await checkIfRegistered(email);
      if (isRegistered) {
        setEmailCheck(true);
      } else {
        navigate('/signup'); // Redirect to signup page if email is not registered
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error, maybe show an error message to the user
    }
  };

  const checkIfRegistered = async (email) => {
    try {
      // Reference to the document with the email as its ID
      const docRef = doc(db, 'users', email);

      // Get the document snapshot
      const docSnap = await getDoc(docRef);

      // Check if the document exists
      return docSnap.exists();
    } catch (error) {
      console.error('Error checking email:', error);
      throw error;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleLogIn = async (event) => {
    event.preventDefault();
    try {
      // Authenticate with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Get user data from Firestore
      const userDocRef = doc(db, "users", userCredential.user.email);
      const userDocSnap = await getDoc(userDocRef);
      // Check if the document exists
      if (userDocSnap.exists()) {
        const userData = {
          user: userDocSnap.data(), // Extracting user data from the document snapshot
          email: userCredential.user.email
        };

        // Save userData to localStorage
        localStorage.setItem('userData', JSON.stringify(userData));
        toast.success("Login successful!", {
          position: "top-center"
        });
        systemContext.login(userData);


      } else {
        console.error("User document not found.");
        // Handle scenario where user document doesn't exist
      }
    } catch (error) {
      // Handle authentication errors
      console.error('Authentication error:', error);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-20 lg:px-8 border-b-2 border-gray-300">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src={logo}
            alt="Your Company"
          />
          {!emailCheck && (
            <>
              <h3 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in or create your account
              </h3>
              <h1 className="mt-10 text-center text-gray-900">
                Not sure if you have an account? <br />
                Enter your email and we’ll check for you.
              </h1>
            </>
          )}
          {emailCheck && (
            <>
              <h3 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in your account found
              </h3>
              <h1 className="mt-10 text-center text-gray-900">
                Sure you have an account in Walmart <br />
                Enter your password for login.
              </h1>
            </>
          )}
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" >
            {!emailCheck && (
              <>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="Enter your email..."
                      required
                      value={email}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-full bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    style={{ backgroundColor: "#0071dc" }}
                    onClick={handleSubmit}
                  >
                    Check
                  </button>
                </div>
              </>
            )}

            {emailCheck && (
              <>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="password"
                      placeholder="Password must more then 6 digit"
                      required
                      value={password}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-full bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    style={{ backgroundColor: "#0071dc" }}
                    onClick={handleLogIn}
                  >
                    Continue
                  </button>
                </div>
              </>
            )}
          </form>

          <p className="text-black text-left mt-4">
            Securing your personal information is our priority.{' '}<br />
            <a href="https://corporate.walmart.com/privacy-security" className="underline">
              See our privacy measures.
            </a>
          </p>
        </div>
      </div>
      <div className="flex justify-center my-5">
        <a className="text-sm font-normal text-center mr-4">© 2024 Walmart. All Rights Reserved.</a>
        <a className="text-sm font-normal text-center mx-4">Give feedback</a>
        <a className="text-sm font-normal text-center mx-4">CA Privacy Rights</a>
        <a className="text-sm font-normal text-center mx-4">Your Privacy Choices</a>
        <a className="text-sm font-normal text-center mx-4">Notice at Collection</a>
        <a className="text-sm font-normal text-center mx-4">Request My Personal Information</a>
        <a className="text-sm font-normal text-center mx-4">California Supply Chains Act</a>
      </div>
      <ToastContainer />
    </>
  );
}
