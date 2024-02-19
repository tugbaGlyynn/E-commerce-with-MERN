/* eslint-disable */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Footer from "./components/layout/Footer";
import Headers from "./components/layout/Headers";
import ProductDetails from "./components/product/ProductDetails";
import Login from './components/user/Login'
function App() {
  return (
    <Router>
      <div className="App">
        <Headers/>
        <div className="container container-fluid">
          <Route path="/" component={Home} exact/>
          <Route path="/search/:keyword" component={Home}/>
          <Route path="/product/:id" component={ProductDetails} exact />
          <Route path="/login" component={Login}/>

        </div>
      </div>
    </Router>
  );
}

export default App;
