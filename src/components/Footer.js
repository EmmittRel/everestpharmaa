import React from "react";
import "../components/Footer.css";
import { Link } from "react-router-dom";


function Footer() {
  return (
    <div>
      <div className="footer">
        <div className="inner-footer">
          <div className="footer-items">
            <h1>Everest Pharmaceuticals</h1>
            <p>
              At Everest Pharma, we aspire to help the community lead a healthy
              life by regulating, formulating, developing, commercializing, and delivering
              affordable and accessible medicines that satisfy urgent medical
              needs.
            </p>
          </div>

          <div className="footer-items">
            <h3>Category</h3>
            <div className="border1"></div>
            <ul className="ul">
              <a href="#">
                <li className="li">Anti hypertensive</li>
              </a>
              <a href="#">
                <li className="li">Oral Anti Diabetic</li>
              </a>
              <a href="#">
                <li className="li">Lipid lowering</li>
              </a>
              <a href="#">
                <li className="li">Insulin Therapy</li>
              </a>
              <a href="#">
                <li className="li">Anti Histaminic</li>
              </a>
            </ul>
          </div>

          <div className="footer-items">
            <h3>Quick Links</h3>
            <div className="border1"></div>
            <ul className="ul">
            <Link to="/">
              <li className="li">Home</li>
            </Link>
            <Link to="/aboutcompany">
              <li className="li">About Us</li>
            </Link>
            <Link to="/productcollection">
              <li className="li">Therapies</li>
            </Link>
            <Link to="/career">
              <li className="li">Careers</li>
            </Link>
            <Link to="/blogs">
              <li className="li">Blogs</li>
            </Link>
            <Link to="/contact">
              <li className="li">Contact</li>
            </Link>
            </ul>
          </div>

          <div className="footer-items">
            <h3>Contact us</h3>
            <div className="border1"></div>
            <ul className="ul">
              <li className="li">
                <i className="fa fa-office" aria-hidden="true"></i>
                <b>Main Office</b>
              </li>
              <li className="li DKM">
                <i className="fa fa-map-marker" aria-hidden="true"></i>2nd
                floor, DKM HOUSE, (Tinkune Marg-82) Kuleshwor Height, Naya
                Basti, Kathmandu, Nepal
              </li>
              <li className="li" id="li_phone">
                <i className="fa fa-phone" aria-hidden="true"></i>
                01-5386780/5378441
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          Copyright &copy; 2023 Everest Pharmaceuticals Pvt. Ltd. | All Right
          Reserved | Developed By JashDigital
        </div>
      </div>
    </div>
  );
}

export default Footer;
