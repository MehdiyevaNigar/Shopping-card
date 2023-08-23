import { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import { ProductCard } from "../../components/ProductCard";
import { formatImgUrl } from "../utils";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div>
        <input
          className="search-input"
          type="text"
          placeholder="Search by product name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="home">
        {searchQuery
          ? filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                price={product.price}
                name={product.name}
                imgUrl={formatImgUrl(product.productImage)}
              />
            ))
          : products.map((product) => (
              <ProductCard
                key={product.id}
                price={product.price}
                name={product.name}
                imgUrl={formatImgUrl(product.productImage)}
              />
            ))}
      </div>
    </>
  );
};

export default Home;
