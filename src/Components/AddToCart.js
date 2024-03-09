import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const CardCart = ({ cartItem, count, setCount }) => {
  const MAX_COUNT = 10;

  const countIncrement = () => {
    if (count < MAX_COUNT) {
      setCount(count + 1);
    }
  };

  const countDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const isMobile = window.innerWidth <= 768;

  return (
    <motion.div className="rounded-lg md:w-2/3 bg-zinc-100"
      whileHover={!isMobile ? { scale: 1.05 } : {}}
      whileTap={isMobile ? { scale: 0.95 } : {}}
    >
      <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
        <img src={cartItem.image} alt="product-image" className="w-full rounded-lg sm:w-40" />
        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
          <div className="mt-5 sm:mt-0">
            <h2 className="text-lg font-bold text-gray-900">{cartItem.title}</h2>
            <p className="mt-1 text-xs text-gray-700">{cartItem.category}</p>
          </div>
          <div className="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
            <div className="flex items-center border-gray-100 ml-3">
              <span onClick={countDecrement} className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
              <span className="h-8 w-8 border bg-white text-center text-xs outline-none">{count} </span>
              <span onClick={countIncrement} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-xl ml-5 font-semibold"> ₹{cartItem.price}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const Checkout = ({ cartItem, count }) => {

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleCheckout = () => {
    setIsPopoverOpen(true);
  };

  const handlePayment = () => {
    // Perform payment logic here
    setIsPopoverOpen(false);
  };

  const handleClose = () => {
    setIsPopoverOpen(false);
  };

  const isMobile = window.innerWidth <= 768;

  return (
    <motion.div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3"
      whileHover={!isMobile ? { scale: 1.05 } : {}}
      whileTap={isMobile ? { scale: 0.95 } : {}}
    >
      <div className="mb-2 flex justify-between">
        <p className="text-gray-700">Subtotal</p>
        <p className="text-gray-700"> ₹ {count * cartItem.price}</p>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between">
        <p className="text-lg font-bold">Total</p>
        <div className="">
          <p className="mb-1 text-lg font-bold">₹ {count * cartItem.price} INR</p>
          <p className="text-sm text-gray-700">Including Shipping</p>
        </div>
      </div>

      <button onClick={handleCheckout} className="mt-6 mb-2 w-full rounded-md bg-orange-500 py-1.5 font-medium text-green-50 hover:bg-green-600">Check out</button>

      <Link to="/">
        <button className="py-2 px-4 bg-red-600 w-full hover:bg-green-700 text-white text-base font-semibold shadow-md rounded-lg">Back</button>
      </Link>

      {isPopoverOpen && (
        <motion.div className=" mt-2 bg-white border border-gray-300 p-4 shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <p className="mb-2">Payment confirmation: ✔</p>
          <p>Amount: ₹ {count * cartItem.price}</p>
          <div className="flex justify-between mt-4">
            <button onClick={handlePayment} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">Close</button>
            <Link to="/" onClick={handleClose} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Done</Link>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

const AddToCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { prodId } = useParams();
  const [count, setCount] = useState(1);

  const fetchCartItem = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${prodId}`);
      const data = await response.json();
      setCartItems([data]);
    } catch (error) {
      console.error("Error fetching cart details:", error);
    }
  }

  useEffect(() => {
    fetchCartItem();
  }, [prodId]);

  return (
    <div>
      <div className="h-screen bg-gray-100 pt-20">
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          {cartItems.map((cartItem) => (
          <React.Fragment key={cartItem.id}>
          <CardCart {...{ cartItem, count, setCount }} />
          <Checkout {...{ cartItem, count }} />
        </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AddToCart;
