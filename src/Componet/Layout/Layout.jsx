import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="Layout_main">
      <Header />
      <main className="main_section">{children}</main>
      <Footer />
    </div>
  );
}
