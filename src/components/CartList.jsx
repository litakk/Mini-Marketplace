import { useEffect, useState } from "react";
import CartItem from "./CartItem";

export default function CartList() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setItems(cart);

        const handleAdd = (e) => {
            const newItem = e.detail;
            setItems((prev) => {
                const updated = [...prev, newItem];
                localStorage.setItem("cart", JSON.stringify(updated));
                return updated;
            });
        };

        window.addEventListener("add-to-cart", handleAdd);

        return () => window.removeEventListener("add-to-cart", handleAdd);
    }, []);

    const handleRemove = (id) => {
        const newCart = items.filter((item) => item.id !== id);
        setItems(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    };

    const total = items.reduce((sum, item) => sum + item.price, 0);

    return (
        <div className="cart-section">
            <h3>Total items: {items.length}</h3>

            <div className="cart-items-container">
                {items.map((item, index) => (
                    <CartItem key={`${item.id}-${index}`} item={item} onRemove={handleRemove} />
                ))}
            </div>

            <div className="cart-summary">
                <h3>
                    Total sum: ${total.toFixed(2)}
                </h3>
            </div>
        </div>
    );
}
