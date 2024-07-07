import React, { useContext } from "react";
import { AuthLoginContext } from "./Auth";
import Layout from "../Componet/Layout/Layout";

export default function AdminMidleware({ children }) {
  const { Auth } = useContext(AuthLoginContext);
  return (
    <div>
      {
      Auth?.userData?.role === 1 ?
      (
        children
      )
       : (
        <Layout>
          <h1>Not Allowed</h1>
        </Layout>
      )}
    </div>
  );
}
