import React, { useState, useEffect } from "react";
import MyContext from "./MainContext";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const MainStates = ({ children }) => {
    const [userData, setUserData] = useState({
        user: { fname: "Profile" }, // Initially, user is not logged in
        email: '', // Initialize email as empty string
        cartItems: [] 
    });
  const [searchBy, setSearchBy] = useState("");




  const handleSearchSubmit = (searchValue) => {
    console.log("Search value:", searchValue);
    setSearchBy(searchValue);
    // Implement further actions with searchValue here
};


    // Function to handle user login
    const login = (userData) => {
        setUserData({
            ...userData,
            cartItems: userData.user.cartItems || [] // Ensure cartItems is initialized
        });
        toast.success("Login successful!", {
            position: "top-center"
        });
    };

    // Function to handle user logout
    const logout = () => {
        // Clear localStorage first
        localStorage.removeItem('userData');
        // Then reset the userData state
        setUserData({
            user: { fname: "Profile" },
            email: '',
            cartItems: []
        });

        // Reload the page
        window.location.reload();
    };

    // Function to check if user is authenticated
    const isAuthenticated = () => {
        return userData.email !== ''; // Returns true if user is logged in, false otherwise
    };

    // Function to add or remove item from cart
    const addToCart = async (productId) => {
        console.log(productId);

        // Check if user is logged in
        if (userData.email === '') {
            toast.error("Please log in to add items to the cart", {
                position: "top-center"
            });
            return;
        }

        const cartItems = userData.cartItems || []; // Ensure cartItems is initialized as an array
        const index = cartItems.indexOf(productId);
        let updatedCartItems;

        // Toggle productId in cartItems
        if (index !== -1) {
            // If productId is already in cartItems, remove it
            updatedCartItems = cartItems.filter(item => item !== productId);
        } else {
            // If productId is not in cartItems, add it
            updatedCartItems = [...cartItems, productId];
        }

        console.log("updated Cart : ", updatedCartItems);

        // Update cart items in Firebase
        try {
            const db = getFirestore();
            const userDoc = doc(db, "users", userData.email); // Assume email is used as the document ID
            await updateDoc(userDoc, { cartItems: updatedCartItems });
            toast.success("Cart updated successfully", {
                position: "top-center"
            });

            // Update the local state only if Firebase update is successful
            setUserData(prevState => ({
                ...prevState,
                cartItems: updatedCartItems
            }));
        } catch (error) {
            toast.error("Failed to update cart in Firebase", {
                position: "top-center"
            });
            console.error("Error updating cart:", error);
        }
    };

    useEffect(() => {
        const userData = localStorage.getItem('userData');
        if (userData) {
            const parsedUserData = JSON.parse(userData);
            login(parsedUserData);
        }
    }, []);

    return (
        <MyContext.Provider
            value={{
                userData,
                login,
                logout,
                isAuthenticated,
                addToCart,
                handleSearchSubmit,
                searchBy,
            }}
        >
            {children}
        </MyContext.Provider>
    );
};

export default MainStates;
