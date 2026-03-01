const tshirts = [
  { title: "Blue T-Shirt", image: "blue-t-shirt.jpg", price: 7.99, stock: 4, quantity: 1 },
  { title: "Bright Purple T-Shirt", image: "bright-purple-t-shirt.jpg", price: 5.99, stock: 1, quantity: 1 },
  { title: "Cobalt Blue T-Shirt", image: "cobalt-blue-t-shirt.jpg", price: 9.99, stock: 5, quantity: 1 },
  { title: "Green T-Shirt", image: "green-t-shirt.jpg", price: 6.99, stock: 0, quantity: 1 },
  { title: "Grey T-Shirt", image: "grey-t-shirt.jpg", price: 4.99, stock: 2, quantity: 1 },
  { title: "Light Green T-Shirt", image: "light-green-t-shirt.jpg", price: 7.99, stock: 4, quantity: 1 },
  { title: "Purple T-Shirt", image: "purple-t-shirt.jpg", price: 7.99, stock: 0, quantity: 1 },
  { title: "Red T-Shirt", image: "red-t-shirt.jpg", price: 6.99, stock: 3, quantity: 1 },
  { title: "Teal T-Shirt", image: "teal-t-shirt.jpg", price: 7.99, stock: 2, quantity: 1 }
];
// Note: The `quantity` property is added to track the selected quantity for each t-shirt.
function TshirtCard(props) {
  const { tshirt, index, onQuantityChange, onBuy } = props;

  const handleSelectChange = (event) => {
    onQuantityChange(index, Number(event.target.value));
  };

  const handleBuyClick = () => {
    onBuy(index);
  };

  return (
    <div className="tshirt">
      <h3>{tshirt.title}</h3>

      <img
        src={`./images/${tshirt.image}`}
        alt={tshirt.title}
        style={{ width: "220px" }}
      />

      <p>Price: ${tshirt.price.toFixed(2)}</p>

      {tshirt.stock === 0 ? (
        <p>Out of Stock</p>
      ) : (
        <p>Stock: {tshirt.stock}</p>
      )}

      {tshirt.stock > 0 && (
        <div>
          <label>
            Quantity:&nbsp;
            <select value={tshirt.quantity} onChange={handleSelectChange}>
              {Array.from({ length: tshirt.stock }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>

          <button onClick={handleBuyClick}>Buy</button>
        </div>
      )}
    </div>
  );
}

function App() {
  const [items, setItems] = React.useState(tshirts);

  const onQuantityChangeHandler = (index, newQty) => {
    setItems((prev) =>
      prev.map((t, i) =>
        i === index ? { ...t, quantity: newQty } : t
      )
    );
  };

  const onBuyHandler = (index) => {
    setItems((prev) =>
      prev.map((t, i) => {
        if (i !== index) return t;

        return {
          ...t,
          stock: t.stock - t.quantity,
          quantity: 1
        };
      })
    );
  };

  return (
    <div>
      <h1>T-Shirts</h1>

      {items.map((tshirt, index) => (
        <TshirtCard
          key={tshirt.title}
          tshirt={tshirt}
          index={index}
          onQuantityChange={onQuantityChangeHandler}
          onBuy={onBuyHandler}
        />
      ))}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);