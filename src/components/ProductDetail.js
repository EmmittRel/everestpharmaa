import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as contentful from "contentful";
import "../components/ProductDetail.css";
import Footer from "./Footer";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const client = contentful.createClient({
      space: "j389y3dfrbxy",
      environment: "master",
      accessToken: "hxOpy1l7J9AMn9pjlGHxB_rd4UTyiTCFUJKvOa4yjV8",
    });

    const fetchProduct = async () => {
      try {
        const response = await client.getEntry(id);
        if (response) {
          setProduct(response.fields);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div>
      <main>
        <section>
          <div id="border-image">
            <figure>
              <img className="detail_image" src={product.image?.fields?.file?.url} alt="Image Not Found" />
            </figure>
          </div>
          <div id="text-div">
            <h2 className="sub_head">Everest Pharmaceuticals</h2>
            <h1 className="top_head">{product.title}</h1>
            <h3 className="down_head">Category: {product.category}</h3>
            <h3 className="down_head">Compositions: {product.composition}</h3>
            <p className="description">{product.description}</p>
            {/* <a className="my-button" href="#">
              More about us
            </a> */}
          </div>
        </section>
      </main>
    </div>
  );
}

export default ProductDetail;
