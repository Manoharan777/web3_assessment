import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
    const isMobile = window.innerWidth <= 768; // Detect if mobile device

    return (
        <motion.div className='rounded-2xl overflow-hidden shadow-lg transform group'
            whileHover={!isMobile ? { scale: 1.05 } : {}}
            whileTap={isMobile ? { scale: 0.95 } : {}}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Link to={`/prod-details/${product.id}`}>
                <motion.img src={product.image} alt="product"
                    className='w-full h-52 object-cover'
                    whileHover={!isMobile ? { scale: 1.1 } : {}}
                />
                <div className='flex flex-col items-center my-1  space-y-1 px-2'>
                    <span className='font-body text-slate-500 block'>{product.title}</span>
                    <span className='font-body text-slate-500'>₹{product.price}</span>

                    <motion.button type="button"
                        className="py-2 px-4 w-full flex justify-center items-center bg-orange-600 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                        whileHover={!isMobile ? { scale: 1.05 } : {}}
                        whileTap={isMobile ? { scale: 0.95 } : {}}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 text-white-500 "
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                            />
                        </svg>
                        Add to cart
                    </motion.button>

                </div>

            </Link>
        </motion.div>
    );
}

const ProductList = () => {
    const [products, setProducts] = useState([]);

    const fetchData = async () => {
        const data = await fetch("https://fakestoreapi.com/products");
        const response = await data.json();
        setProducts(response);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='bg-zinc-100'>
            <nav>
                <div className="md:flex justify-between w-5/6 md:max-w-7xl mx-auto">
                    <div className="flex justify-between mt-3">
                        <div>
                            <span className="text-orange-500 font-bold text-4xl">Shopping </span>
                            <span className="text-slate-500 font-thin text-3xl">Cart</span>
                        </div>
                    </div>
                    <div>
                    </div>
                </div>
            </nav>
            <section className='w-5/6 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16 my-10 py-10'>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </section>
        </div>
    );
}

export default ProductList;
