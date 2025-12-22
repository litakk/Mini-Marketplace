export default function CartItem({ item, index, onRemove }) {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.title} />
      <div className="cart-item-info">
        <p className="cart-item-title">{item.title}</p>
        <p className="cart-item-price">
          ${item.price.toFixed(2)} {item.quantity > 1 ? `×${item.quantity}` : ""}
        </p>
      </div>
      <button className="cart-item-remove" onClick={() => onRemove(index)}>
        &times;
      </button>
    </div>
  );
}
