import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthLoginContext } from "../../Auth/Auth";
import GlobalNotify from "../../TostifyComp/GlobalNotify";
export default function Header() {
  const { Auth, setAuth ,CartData} = useContext(AuthLoginContext);
  const navigator = useNavigate();
  const LogoutHandler = () => {
    let Data = window.confirm("Are you sure you want to log out?");
    if (Data) {
      setAuth({ userData: null });
      sessionStorage.removeItem("LoginDetails");
      GlobalNotify("Logout Successfully", "success");
      navigator("/login");
    }
  };
  return (
    <nav className="navbar navbar-expand-lg header_main bg-black">
      <div className="container-fluid">
        <Link className="navbar-brand text-white" style={{fontSize:"26px"}} to="/">
          <i className="fa fa-cart-shopping m-1" />
          Ecom
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fa-solid fa-bars text-white" /> 
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/myorders">
                My Orders
              </NavLink>
            </li>
            {Auth.userData?.role === 1 ? (
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/admin">
                  Admin
                </NavLink>
              </li>
            ) : null}
            {Auth.userData ? (
              <li className="nav-item">
                <span href={null} className="nav-link" onClick={LogoutHandler}>
                  Logout
                </span>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link text" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item ">
                  <NavLink className="nav-link" to="/Register">
                    Register
                  </NavLink>
                </li>
              </>
            )}
            <li className="nav-item">
              <NavLink className="nav-link" to="/cart">
                Cart
              </NavLink>
            </li>
          </ul>
          <form className="d-flex">
            <button className="btn btn-outline-primery" type="button" onClick={()=>{
              navigator('/cart')
            }}>
              <i className="fas fa-shop text-white m-1"> &nbsp;{CartData?.length}</i>
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
