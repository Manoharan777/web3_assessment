import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProductDetails = () => {
    const { prodId } = useParams();
    const [proddetails, setProdDetails] = useState({});

    const fetchProdDetails = async () => {
        try {
            const response = await fetch(`https://fakestoreapi.com/products/${prodId}`);
            const data = await response.json();
            setProdDetails(data);
        } catch (error) {
            console.error("Error fetching product details:", error);
        }
    }

    useEffect(() => {
        fetchProdDetails();
    }, [prodId]);

    const isMobile = window.innerWidth <= 768;

    return (
        <div className='bg-zinc-100'>
            <div className="container mx-auto py-8">
                <motion.div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="md:flex">
                        <motion.div className="md:w-1/2"
                            whileHover={!isMobile ? { scale: 1.05 } : {}}
                            whileTap={isMobile ? { scale: 0.95 } : {}}
                        >
                            <img src={proddetails.image} alt="Product" className="object-cover w-full h-full rounded-lg" />
                        </motion.div>
                        <motion.div className="md:w-1/2 p-6"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className="text-2xl font-semibold mb-4">{proddetails.title}</h1>
                            <div className="text-xl font-semibold text-gray-500 mb-4">Price: ₹{proddetails.price}</div>
                            <div className="text-sm font-medium text-gray-500 text-green-500 mb-4">In stock</div>
                            <div className="text-xl font-normal mb-4">Category: {proddetails.category}</div>
                            <div className="text-xl font-medium mb-4">Rating:  {proddetails.rating && proddetails.rating.rate} ⭐ </div>
                            <div className="text-xl font-medium mb-4">Sale:  {proddetails.rating && proddetails.rating.count} 📈 </div>
                            <p className="text-base text-gray-500">{proddetails.description}</p>
                            <Link to={`/add-to-cart/${proddetails.id}`}>
                                <div className="mt-4 flex items-center mb-2 ">
                                    <motion.button className="py-2 px-4 bg-orange-600 w-full hover:bg-green-700 text-white text-base font-semibold shadow-md rounded-lg"
                                        whileHover={!isMobile ? { scale: 1.05 } : {}}
                                        whileTap={isMobile ? { scale: 0.95 } : {}}
                                    >
                                        Add to Cart
                                    </motion.button>
                                </div>
                            </Link>
                            <Link to="/">
                                <motion.button className="py-2 px-4 bg-red-600 w-full hover:bg-green-700 text-white text-base font-semibold shadow-md rounded-lg"
                                    whileHover={!isMobile ? { scale: 1.05 } : {}}
                                    whileTap={isMobile ? { scale: 0.95 } : {}}
                                >
                                    Back
                                </motion.button>
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default ProductDetails;
