import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import * as contentful from "contentful";
import "../components/ProductPage.css";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import ProductTable from "../components/ProductTable";

function ProductPage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProductsForTable, setFilteredProductsForTable] = useState([]);

  // For Search filter
  const [searchText, setSearchText] = useState("");

  // For Alphabet Filter
  const [selectedAlphabet, setSelectedAlphabet] = useState("All");
  const [selectedDivision, setSelectedDivision] = useState("All");

  // For category filter
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [categoryList, setCategoryList] = useState([]);

  // For Division filter
  const [showDivisionDropdown, setShowDivisionDropdown] = useState(false);
  const [divisionList, setDivisionList] = useState([]);

  useEffect(() => {
    const client = contentful.createClient({
      space: "j389y3dfrbxy",
      environment: "master",
      accessToken: "hxOpy1l7J9AMn9pjlGHxB_rd4UTyiTCFUJKvOa4yjV8",
    });

    const fetchProducts = async () => {
      try {
        const response = await client.getEntries({
          content_type: "productPage",
          "fields.category": category,
        });

        const productPage = response.items.map((item) => ({
          ...item.fields,
          id: item.sys.id,
        }));

        setProducts(productPage);
        setFilteredProductsForTable(productPage);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [category]);

  useEffect(() => {
    applyFilters();
  }, [selectedCategory, selectedDivision, selectedAlphabet, searchText]);

  const applyFilters = () => {
    console.log("Selected Category:", selectedCategory);
    console.log("Selected Division:", selectedDivision);
    let filtered = [...products];

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (selectedDivision !== "All") {
      filtered = filtered.filter(
        (product) => product.division === selectedDivision
      );
    }

    if (selectedAlphabet !== "All") {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().startsWith(selectedAlphabet.toLowerCase())
      );
    }

    if (searchText) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    console.log("Filtered Products:", filtered);
    setFilteredProductsForTable(filtered);
  };

  const handleDivisionFilter = (division) => {
    console.log("Selected Division:", division);
    setSelectedDivision(division);
    setShowDivisionDropdown(false);
    setSearchText("");
    setSelectedAlphabet("All"); // Reset alphabet filter
    applyFilters();
  };

  const handleSearch = (event) => {
    const searchText = event.target.value.toLowerCase();
    setSearchText(searchText);
  };

  const handleAlphabetFilter = (alphabet) => {
    setSelectedAlphabet(alphabet === selectedAlphabet ? "All" : alphabet);
    setSearchText("");
  };

  useEffect(() => {
    const uniqueDivisions = Array.from(
      new Set(products.map((product) => product.division))
    );
    setDivisionList(uniqueDivisions);
  }, [products]);

  useEffect(() => {
    // Extract unique categories from your products
    const uniqueCategories = Array.from(
      new Set(products.map((product) => product.category))
    );
    setCategoryList(uniqueCategories);
  }, [products]);

  const handleCategoryFilter = (category) => {
    console.log("Selected Category:", category);
    setSelectedCategory(category);
    setShowCategoryDropdown(false);
    setSearchText("");
    setSelectedAlphabet("All"); // Reset alphabet filter
    applyFilters();
  };

  const alphabets = [
    "All",
    ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)),
  ];

  return (
    <div>
      <Banner
        backgroundImage={"https://i.ibb.co/CV4HZ7v/5.png"}
        title="Products"
      />
      <section className="product_section">
        <div className="product-page__content">
          <div className="product-page__sidebar">
            <h2>
              FILTER BY ALPHABET<span className="line"></span>
            </h2>
            <div className="product-page__alphabet-container">
              {alphabets.map((alphabet, index) => (
                <span
                  key={index}
                  className={`product-page__alphabet ${
                    selectedAlphabet === alphabet
                      ? "product-page__alphabet--active"
                      : ""
                  }`}
                  onClick={() =>
                    handleAlphabetFilter(
                      selectedAlphabet === alphabet ? "" : alphabet
                    )
                  }
                >
                  {alphabet}
                </span>
              ))}
            </div>

            <div className="product-page__search-container">
              <h2>
                FILTER BY SEARCH<span className="line"></span>
              </h2>
              <input
                type="text"
                placeholder="Enter Product Name..."
                className="product-page__search-input"
                onChange={handleSearch}
                value={searchText}
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="product-page__search-icon"
              />
            </div>

            <h2>
              FILTER PRODUCTS<span className="line"></span>
            </h2>
            <ul className="product-page__category-list">
              <li
                className={`product-page__category-item ${
                  selectedCategory === "All" ? "active" : ""
                }`}
                onClick={() => handleCategoryFilter("All")}
              >
                All Products
              </li>

              <li className="product-page__category-item">
                <div className="category-dropdown-container">
                  <span
                    onClick={() =>
                      setShowCategoryDropdown(!showCategoryDropdown)
                    }
                  >
                    By Therapeutic Category
                  </span>
                  {showCategoryDropdown && (
                    <ul className="category-dropdown">
                      {categoryList.map((category) => (
                        <li
                          key={category}
                          className={`product-page__category-item dropdown-item ${
                            selectedCategory === category ? "active" : ""
                          }`}
                          onClick={() => handleCategoryFilter(category)}
                        >
                          {category}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
              
              <li className="product-page__category-item">
                <div className="category-dropdown-container">
                  <span
                    onClick={() =>
                      setShowDivisionDropdown(!showDivisionDropdown)
                    }
                  >
                    By Division
                  </span>
                  {showDivisionDropdown && (
                    <ul className="category-dropdown">
                      {divisionList.map((division) => (
                        <li
                          key={division}
                          className={`product-page__category-item dropdown-item ${
                            selectedDivision === division ? "active" : ""
                          }`}
                          onClick={() => handleDivisionFilter(division)}
                        >
                          {division}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
              <li className="product-page__category-item">By Generics</li>
            </ul>
          </div>
          <div className="product__list">
            <ProductTable
              products={filteredProductsForTable}
              searchText={searchText}
              selectedAlphabet={selectedAlphabet}
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default ProductPage;
