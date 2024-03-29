import { useContext } from "react";
import { ProductsContext } from "../contexts/products.context";
import ProductCard from "../components/products-card/product-card.component";

import "./shop.styles.scss";

const Shop = () => {

    const { products } = useContext(ProductsContext);

    return (
        <div className="products-container">
            {products.map((item) => (
                <ProductCard key={item.id} product={item} />
            ))}
        </div>
    )
}

export default Shop;