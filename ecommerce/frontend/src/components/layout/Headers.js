import React, { Fragment } from "react";
import "../../App.css";
import Search from "./Search";
import { Route,Link } from "react-router-dom";
const Headers = () => {
  return (
    <Fragment>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <Link to="/">
            <img src="/images/logo.png" alt="" />
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Route>{({ history }) => <Search history={history} />}</Route>
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <Link to='/login' className="btn ml-4" id="login_btn">
            Login
          </Link>

          <span id="cart" className="ml-3">
            Cart
          </span>
          <span className="ml-1" id="cart_count">
            2
          </span>
        </div>
      </nav>{" "}
    </Fragment>
  );
};

export default Headers;
