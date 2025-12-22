import { useEffect, useState } from "react";
import CartItem from "./CartItem";

export default function CartList() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(saved);

        const addHandler = (e) => {
            const product = e.detail;
            setCartItems(prev => {
                const exist = prev.find(p => p.id === product.id);
                let updated;

                if (exist) {
                    updated = prev.map(p =>
                        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
                    );
                } else {
                    updated = [...prev, { ...product, quantity: 1 }];
                }

                localStorage.setItem("cart", JSON.stringify(updated));
                return updated;
            });
        };

        window.addEventListener("add-to-cart", addHandler);
        return () => window.removeEventListener("add-to-cart", addHandler);
    }, []);

    const removeItem = (idx) => {
        setCartItems(prev => {
            const updated = prev.map((p, i) => {
                if (i !== idx) return p;
                return { ...p, quantity: p.quantity - 1 };
            }).filter(p => p.quantity > 0);
            localStorage.setItem("cart", JSON.stringify(updated));
            return updated;
        });
    };


    const total = cartItems.reduce((sum, p) => sum + p.price * p.quantity, 0);
    const totalCount = cartItems.reduce((sum, p) => sum + p.quantity, 0);

    return (
        <div className="cart-section">
            <h3>Total items: {totalCount}</h3>

            <div className="cart-items-container">
                {cartItems.map((p, idx) => (
                    <CartItem
                        key={`${p.id}-${idx}`}
                        item={p}
                        index={idx}
                        onRemove={removeItem}
                    />
                ))}
            </div>

            <div className="cart-summary">
                <h3>Total sum: ${total.toFixed(2)}</h3>
            </div>
        </div>
    );
}
