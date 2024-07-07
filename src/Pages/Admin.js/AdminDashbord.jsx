import React, { useContext, useEffect, useState } from "react";
import { AuthLoginContext } from "../../Auth/Auth";
import ProfileImg from "../../Images/Profile.jpeg";
import TotalOrder from "../../Images/TotalOrder.avif";
import DeliveredImag from "../../Images/delivred.avif";
import ShippingImag from "../../Images/shipping.jpg";
import OutfordeliveryImag from "../../Images/outfordelivery.jpg";
import { GetCountDetilsApi } from "../../ApiService/Service";
import { useNavigate } from "react-router-dom";

export default function AdminDashbord() {
  const { Auth } = useContext(AuthLoginContext);
  const navigtor = useNavigate();
  const [TotalCount, setTotalCount] = useState(0);
  const [lastUpdate, setlastUpdate] = useState("");
  const [Delivered, setDelivered] = useState(0);
  const [LastDeliverd, setLastDeliverd] = useState("");
  const [Shipping, setShipping] = useState(0);
  const [LastShipping, setLastShipping] = useState("");
  const [OutForDelivery, setOutForDelivery] = useState(0);
  const [LastOutForDelivery, setLastOutForDelivery] = useState("");

  const GetCountDetails = () => {
    GetCountDetilsApi().then((resp) => {
      if (resp?.code == 200) {
        setTotalCount(resp?.count);
        setlastUpdate(resp?.lastUpdate);
        setDelivered(resp?.Deliverd);
        setLastDeliverd(resp?.LastDeliverd);
        setShipping(resp?.Shipping);
        setLastShipping(resp?.LastShipping);
        setOutForDelivery(resp?.OutForDelivery);
        setLastOutForDelivery(resp?.LastOutForDelivery);
      }
    });
  };
  useEffect(() => {
    GetCountDetails();
  }, []);
  return (
    <div className="AdminDashboard">
      <div className="AdminDashbordDetails card bg-dark">
        <img
          className="AdminDashbordProfile"
          src={ProfileImg}
          alt="Card image cap"
        />
        <br />
        <h4>Hii</h4>
        <h4 className="heading_title"> {Auth?.userData?.name}</h4>
      </div>
      <div className="AdminDashbordDetails card bg-dark">
        <img
          className="AdminDashbordProfile cursor_pointer"
          src={TotalOrder}
          alt="Card image cap"
          title="Order Details"
          onClick={() => {
            navigtor("totalorderdetails");
          }}
        />
        <h3>Total Orders</h3>
        <h4>{TotalCount}</h4>
        <b>{lastUpdate}</b>
      </div>

      <div className="AdminDashbordDetails card bg-dark">
        <img
          className="AdminDashbordProfile cursor_pointer"
          src={ShippingImag}
          alt="Card image cap"
          title="Shipping Orders Details"
          onClick={() => {
            navigtor("ShippingOrderDetails");
          }}
        />
        <h3>Shipping</h3>
        <h4>{Shipping}</h4>
        <b>{LastShipping}</b>
      </div>
      <div className="AdminDashbordDetails card bg-dark">
        <img
          className="AdminDashbordProfile cursor_pointer"
          src={OutfordeliveryImag}
          alt="Card image cap"
          title="Out For Delivery Details"
          onClick={() => {
            navigtor("OutForDeliveyDetails");
          }}
        />
        <h3>Out for Delivery</h3>
        <h4>{OutForDelivery}</h4>
        <b>{LastOutForDelivery}</b>
      </div>
      <div className="AdminDashbordDetails card bg-dark">
        <img
          className="AdminDashbordProfile cursor_pointer"
          src={DeliveredImag}
          alt="Card image cap"
          title="Delivered"
          onClick={() => {
            navigtor("DeliveredDetails");
          }}
        />
        <h3>Delivered Orders</h3>
        <h4>{Delivered}</h4>
        <b>{LastDeliverd}</b>
      </div>
    </div>
  );
}
