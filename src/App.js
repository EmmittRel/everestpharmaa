import { BrowserRouter as Router, Route } from "react-router-dom";
// import { HashRouter as Router, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Career from "./pages/Career";
import Contact from "./pages/Contact";
import ProductDetail from "../src/components/ProductDetail";
import ProductPage from "./pages/ProductPage";
import Blogs from "./pages/Blogs";
import BlogDescription from "../src/components/BlogDescription";
import MoreAbout from "./pages/MoreAbout"
import AboutPage from "./pages/AboutPage";

function App() {

  return (
    <div>
    <Router>
      <Layout/>
        <Route path="/" exact>
          <Home />
        </Route>
        {/* <Route path="/home" exact>
          <Home />
        </Route> */}
        <Route path="/aboutcompany" >
          <AboutPage />
        </Route>
        <Route path="/career">
          <Career />
        </Route>
        <Route path="/contact">
          <Contact/>
        </Route>
        <Route path="/moreabout">
          <MoreAbout/>
        </Route>
        <Route path="/products/:id" component={ProductDetail} />
        <Route path="/productcollection" component={ProductPage} />
        <Route path="/blogs" component={Blogs} />
        <Route path="/blog/:id" component={BlogDescription} />

    </Router>
    </div>
  );
}

export default App;