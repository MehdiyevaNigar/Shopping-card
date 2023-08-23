import "./ProductCard.css";
export const ProductCard = ({ id, name, price, imgUrl }) => {
  return (
    <div className="productCard">
      <div className="img-container">
        <img src={imgUrl} alt="product" />
      </div>
      <h3 className="name">{name}</h3>
      <h4 className="price">{`Price: ${price}$`}</h4>
    </div>
  );
};
