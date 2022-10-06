import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartsSlice";
import { useGetAllProductsQuery } from "../features/productsApi";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate('/cart')
  };

  return (
    <div className="home-container">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>An error occured...</p>
      ) : (
        <>
          <h2>New Arrivals</h2>
          <div className="products">
            {data.map((item) => (
              <div key={item.id} className="product">
                <h3>{item.name}</h3>
                <img src={item.image} alt={item.name} />
                <div className="details">
                  <span>{item.desc}</span>
                  <span className="price">${item.price}</span>
                </div>
                <button onClick={() => handleAddToCart(item)}>
                  Add To Cart
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
