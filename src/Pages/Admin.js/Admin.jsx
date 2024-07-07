import React from "react";
import Layout from "../../Componet/Layout/Layout";
import { NavLink, Outlet } from "react-router-dom";
export default function Admin() {
  return (
    <Layout>
      <ul
        className="navbar-nav d-flex justify-content-start flex-row"
        style={{ background: "pink" }}
      >
        <li className="nav-item me-3">
          <NavLink className="nav-link text_admin_nav" to="/admin">
            Admin Dashboard
          </NavLink>
        </li>
        <li className="nav-item me-3">
          <NavLink className="nav-link text_admin_nav" to="/admin/add-category">  
            Add Catogory
          </NavLink>
        </li>
        <li className="nav-item me-3">
          <NavLink className="nav-link text_admin_nav" to="/admin/add-product">
            Add Product
          </NavLink>
        </li>
      </ul>
        <Outlet />
    </Layout>
  );
}
