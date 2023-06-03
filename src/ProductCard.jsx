import React, { useState } from "react";
import "./App.css";
import "./header.css";
import shoe from "./shoe.png";
import { toast } from "react-toastify";

const ProductCard = () => {
  const [buttonText, setButtonText] = useState("Add To Card");
  const [isLoading, setIsLoading] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [orderCount, setOrderCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [dropdownItems, setDropdownItems] = useState([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isRotated, setRotated] = useState(false);

  const handleAddToCart = () => {
    setIsLoading(true);
    setButtonText("Adding...");

    setTimeout(() => {
      setButtonText("Successfully Added");
      setIsLoading(false);
      setIsClicked(true);

      const product = {
        id: Math.random().toString(),
        name: "Air Jordan 1 Retro",
        price: 455,
      };
      setCartItems((prevItems) => [...prevItems, product]);
      setDropdownItems((prevItems) => [...prevItems, product]);
      setOrderCount((prevCount) => prevCount + 1);
      setTotalPrice((prevPrice) => prevPrice + product.price);

      const handleButtonClick = () => {
        toast.success("Successfully Added!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      };

      handleButtonClick();

      setTimeout(() => {
        setButtonText("Add To Card");
        setIsClicked(false);
      }, 2000);
    }, 2000);
  };

  const handleRemoveFromCart = (itemId, itemPrice) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    setDropdownItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemId)
    );
    setOrderCount((prevCount) => prevCount - 1);
    setTotalPrice((prevPrice) => prevPrice - itemPrice);

    if (dropdownItems.length === 1) {
      setDropdownOpen(false);
    }
  };

  const handleBasketClick = () => {
    setDropdownOpen(!isDropdownOpen);
    setRotated(!isRotated);
  };

  const handleDropdownClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <header>
        <div className="header_container">
          <button className="basket_btn_style" onClick={handleBasketClick}>
            <span className="basket_logo">🛒</span>
            <span className="basket_cost">{totalPrice}$</span>
            <p className="basket_count">Orders: {orderCount}</p>
            <span className={`dropdown_hamburger ${isRotated ? "rotate" : ""}`}>
              🍔
            </span>
            {isDropdownOpen && (
              <div className="dropdown_menu" onClick={handleDropdownClick}>
                <p>Dropdown Menu</p>
                {dropdownItems.length === 0 ? (
                  <p>No items in the dropdown menu.</p>
                ) : (
                  <>
                    <ul>
                      {dropdownItems.map((item) => (
                        <li className="dropdown_items" key={item.id}>
                          {item.name} - ${item.price}
                          <button
                            type="button"
                            className="delete_button"
                            onClick={() => handleRemoveFromCart(item.id, item.price)}
                          >
                            Delete
                          </button>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )}
          </button>
        </div>
      </header>

      <div className="container_product_card">
        <div className="product_card">
          <div className="top_card">
            <img src={shoe} className="product_image" alt="Shoe" />
            <span className="product_price">$ 455</span>
          </div>
          <div className="bottom_card">
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
              className={`cta_add_to_card${isLoading ? " loading" : ""}${
                isClicked ? " clicked" : ""
              }`}
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
      </div>
    </>
  );
};

export default ProductCard;
