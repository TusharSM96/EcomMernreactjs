import React, { useContext, useEffect, useState } from "react";
import Layout from "../Componet/Layout/Layout";
import { UserOrdersApi } from "../ApiService/Service";
import { AuthLoginContext } from "../Auth/Auth";
import moment from "moment";

export default function MyOrders() {
  const { Auth } = useContext(AuthLoginContext);
  const [GetAll, setGetAll] = useState([]);
  const BindData = () => {
    let body = {
      Mailaddress: Auth.userData?.email,
    };
    UserOrdersApi(body).then((resp) => {
      console.log(resp);
      if (resp?.code === 200) {
        setGetAll(resp?.data);
      } else {
        setGetAll([]);
      }
    });
  };
  useEffect(() => {
    if (Auth.userData?.email) BindData();
  }, [Auth]);
  return (
    <Layout>
      <h1 className="header_main heading_title">My Orders</h1>
      <div>
        <table className="table text-white">
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Email Id</th>
              <th>Items</th>
              <th>Address</th>
              <th>Total bill</th>
              <th>Order Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {GetAll?.map((value, index) => (
              <tr key={index}>
                <td>{value?._id}</td>
                <td>{value?.email}</td>
                <td>
                  {value?.orderDetails?.map((event, i) => (
                    <>
                    <hr/>
                      <b>Name : {event?.Prodname}</b><br/>
                      <b>Price : {event?.ProPrice}</b><br/>
                      <b>Price : {event?.QuntityCart}</b><br/>
                    </>
                  ))}
                </td>
                <td>{value?.Address}</td>
                <td>{value?.totalBill}</td>
                <td>{moment(value?.createdAt).format("DD-MMM-YYYY")}</td>
                <td>{value?.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
