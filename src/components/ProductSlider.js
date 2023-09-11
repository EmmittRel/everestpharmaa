import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../components/Products.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as contentful from "contentful";

function ProductSlider() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const client = contentful.createClient({
      space: "j389y3dfrbxy",
      environment: "master",
      accessToken: "hxOpy1l7J9AMn9pjlGHxB_rd4UTyiTCFUJKvOa4yjV8",
    });

    const fetchProducts = async () => {
      try {
        const response = await client.getEntries({ content_type: "product" });
        const newProducts = response.items.map((item) => {
          return {
            ...item.fields,
            id: item.sys.id,
          };
        });
        setProducts(newProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const renderDescription = (description) => {
    const maxLength = 80;
    if (description.length > maxLength) {
      return `${description.substring(0, maxLength)}...`;
    }
    return description;
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    autoplay: true,
    autoplaySpeed: 1700,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product__resources">
      <div className="top_headd">
        <h1>Recently Added Products</h1>
      </div>
      <div className="product__cont">
        <Slider {...settings}>
          {products.map((product) => (
            <div className="product__resources__item" key={product.id}>
              <div
                style={{
                  background: `url('${product.image?.fields?.file?.url}') no-repeat center left`,
                }}
                className="product__resources__item__img"
              ></div>
              <h3>{product.title}</h3>
              <p>{renderDescription(product.description)}</p>
              <p><b>Category:</b> {product.category}</p> {/* Added product category */}
              <Link to={`/products/${product.id}`} className="article-Button">
                Product Details <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
      <div className="clear"></div>
    </div>
  );
}

export default ProductSlider;
