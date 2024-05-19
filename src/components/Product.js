import React, { useState, useEffect, useContext } from 'react';
import { FaHeart } from "react-icons/fa";
import MainContext from './../ContextApi/MainContext';
import { useNavigate } from 'react-router-dom';

function Product() {
    const systemContext = useContext(MainContext);
    const { searchBy } = useContext(MainContext);
    const [productData, setProductData] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setProductData(data.products);
                setFilteredProducts(data.products); // Initialize with all products
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Filter products based on search query
        if (searchBy) {
            const filtered = productData.filter(product => 
                product.title.toLowerCase().includes(searchBy.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(productData); // Reset to all products if search query is empty
        }
    }, [searchBy, productData]);

    const handleAddToCart = (productId) => {
        const isAuthenticated = systemContext.isAuthenticated();
        if (!isAuthenticated) {
            navigate('/signin');
            return;
        }
        systemContext.addToCart(productId);
    };

    return (
        <>
        {console.log(systemContext.userData)}
            {loading && <p>Loading...</p>}
            {filteredProducts && (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 px-10 py-4">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="card card-compact w-96 bg-base-100 shadow-xl m-4 rounded-lg">
                            <figure className="w-full h-64 overflow-hidden rounded-lg">
                                <img src={product.thumbnail} alt="product" className="object-cover w-full h-full" />
                            </figure>
                            <div className="card-body px-4">
                                <div className='flex justify-between items-center'>
                                    <h2 className="card-title text-2xl font-bold text-green-800">{product.title}</h2>
                                    <div className='py-1 px-7 text-[25px]'>
                                        <button onClick={() => handleAddToCart(product.id)}>
                                            <div className={systemContext.userData.cartItems && systemContext.userData.cartItems.includes(product.id) ? "text-red-500" : ""} >
                                                <FaHeart />
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                <p>{product.description.split(" ").slice(0, 10).join(" ")}...</p>
                                <div className='flex justify-between mb-3'>
                                    <p className='text-[22px]'>$ {product.price}</p>
                                    <button className="btn btn-primary border rounded-l-full rounded-r-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2">Buy Now</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default Product;
