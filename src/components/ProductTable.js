import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import "../components/ProductTable.css";
import { Link } from "react-router-dom";
import { createClient } from "contentful";

const client = createClient({
  space: "j389y3dfrbxy",
  environment: "master",
  accessToken: "hxOpy1l7J9AMn9pjlGHxB_rd4UTyiTCFUJKvOa4yjV8",
});

function ProductTable({ products, searchText, selectedAlphabet }) {
  const productsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Fetch products when searchText or selectedAlphabet changes
    async function fetchProducts() {
      try {
        console.log("Fetching products...");
        let response;
        let query = {
          content_type: "productPage",
          order: "fields.title",
          limit: productsPerPage,
          skip: (currentPage - 1) * productsPerPage,
        };

        console.log("Number of products:", products.length);

        response = await client.getEntries(query);

        let fetchedProducts = response.items;

        if (selectedAlphabet !== "All") {
          fetchedProducts = fetchedProducts.filter((product) =>
            product.fields.title
              .toLowerCase()
              .startsWith(selectedAlphabet.toLowerCase())
          );
        }

        if (searchText) {
          fetchedProducts = fetchedProducts.filter((product) =>
            product.fields.title
              .toLowerCase()
              .includes(searchText.toLowerCase())
          );
        }

        setFilteredProducts(fetchedProducts);
        setCurrentProducts(fetchedProducts);
        console.log("Fetched products successfully");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchProducts();
  }, [currentPage, selectedAlphabet, searchText, products]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name of Product</th>
            <th>Composition</th>
            <th>Packing</th>
            <th>Therapeutic Category</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product.sys.id}>
              <td>
                <Link
                  className="product_link"
                  to={`/products/${product.sys.id}`}
                >
                  {product.fields.title}
                </Link>
              </td>
              <td>{product.fields.composition}</td>
              <td>{product.fields.packing}</td>
              <td>{product.fields.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        onPageChange={handlePageChange}
        filteredProducts={filteredProducts}
        productsPerPage={productsPerPage}
        products={products} // Pass the products prop
      />
    </div>
  );
}

export default ProductTable;
