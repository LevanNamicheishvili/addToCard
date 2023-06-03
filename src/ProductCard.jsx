import React, { useState } from "react";
import "./App.css";
import shoe from "./shoe.png";
import { toast } from 'react-toastify';


const ProductCard = () => {
  const [buttonText, setButtonText] = useState("Add To Card");
  const [isLoading, setIsLoading] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = () => {
    setIsLoading(true);
    setButtonText("Adding...");

    // Simulating an API call or processing time
    setTimeout(() => {
      setButtonText("Successfully Added");
      setIsLoading(false);
      setIsClicked(true);

      // Add the product card to the cart
      const product = {
        id: Math.random().toString(),
        name: "Air Jordan 1 Retro",
        price: 455,
      };
      setCartItems((prevItems) => [...prevItems, product]);

      // Display success notification
      const handleButtonClick = () => {
        toast.success('Successfully Added!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }
      
      handleButtonClick();

      // Reset the button after a certain time
      setTimeout(() => {
        setButtonText("Add To Card");
        setIsClicked(false);
      }, 2000);
    }, 2000);
  };

  const handleRemoveFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  return (
    <div className="container_product_card">
      <div className="product_card">
        <div className="top_card">
          {/* img, price */}
          <img src={shoe} className="product_image" alt="Shoe" />
          <span className="product_price">$ 455</span>
        </div>
        <div className="bottom_card">
          {/* name, desc, cta */}
          <div className="product_name">
            <h6>Nike</h6>
            <h4>Air Jordan 1 Retro</h4>
          </div>
          <div className="product_description">
            <p>
              The extremely popular Air Jordan 1 shoes are the best-selling Air
              Jordans in the history of the brand, not to mention the success
              that the versions dedicated to Michael Jordan's career have had.
            </p>
          </div>
          <button
            type="button"
            className={`cta_add_to_card${isLoading ? " loading" : ""}${isClicked ? " clicked" : ""}`}
            onClick={handleAddToCart}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loader"></span>
                Loading...
              </>
            ) : (
              buttonText
            )}
          </button>
        </div>
      </div>
      <div className="basket">
        <h3>🛒</h3>
        {cartItems.length === 0 ? (
          <p>No items in the cart.</p>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price}
                <button
                  type="button"
                  className="delete_button"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
