import React, { useContext } from "react";
import Layout from "../Componet/Layout/Layout";
import { AuthLoginContext } from "../Auth/Auth";
import GlobalNotify from "../TostifyComp/GlobalNotify";
import { useNavigate } from "react-router-dom";
import { AddOrder } from "../ApiService/Service";

export default function Cart() {
  const { CartData, Auth, setCartData } = useContext(AuthLoginContext);
  const navigator = useNavigate();
  function RemovePoduct(index) {
    setCartData((prev) => {
      let DataCopy = [...prev];
      let EditData = DataCopy[index];
      if (EditData?.QuntityCart == 1) {
        let FilterThisProduct = DataCopy?.filter(
          (filterpro) => filterpro?._id !== EditData?._id
        );
        localStorage.setItem("CartData", JSON.stringify(FilterThisProduct));
        return [...FilterThisProduct];
      }
      EditData = { ...EditData, QuntityCart: EditData.QuntityCart - 1 };
      DataCopy[index] = EditData;
      localStorage.setItem("CartData", JSON.stringify(DataCopy));
      return DataCopy;
    });
  }
  function AddPoduct(index) {
    setCartData((prev) => {
      let DataCopy = [...prev];
      let EditData = DataCopy[index];
      if (EditData?.QuntityCart === 6) {
        GlobalNotify("Maximum limit of six units per product", "info");
        return DataCopy;
      }
      EditData = {
        ...EditData,
        QuntityCart: Number(EditData?.QuntityCart) + 1,
      };
      DataCopy[index] = EditData;
      localStorage.setItem("CartData", JSON.stringify(DataCopy));
      return DataCopy;
    });
  }
  function OrderAdd() {
    const Total = CartData?.reduce((accumulator, currentItem) => {
      return (
        accumulator + eval(currentItem.ProPrice * currentItem?.QuntityCart)
      );
    }, 0);
    let body = {
      orderDetails: CartData?.map((value)=>({_id:value?._id,Prodname:value?.Prodname,ProPrice:value?.ProPrice,Category:value?.Category,Brand:value.Brand,QuntityCart:value?.QuntityCart})),
      email: Auth?.userData?.email,
      Address:Auth?.userData?.address,
      totalBill: Total,
    };
    AddOrder(body).then((resp) => {
      console.log(resp)
      if (resp?.code == 200) {
        GlobalNotify(resp?.Msg, "success");
        localStorage.removeItem("CartData");
        setCartData([]);
      } else {
        GlobalNotify(resp?.Msg, "error");
      }
    });
  }
  return (
    <Layout>
      <div className="cartheading">
        <h1 className="heading_title">My Cart</h1>
      </div>
      <div className="cart_data">
        <table className="table table-dark cartproduct">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Quntity</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {CartData?.map((value, index) => (
              <tr key={index}>
                <td>
                  <img
                    onClick={() => {
                      navigator("/product-details", {
                        state: { data: value?._id, Brand: value.Brand },
                      });
                    }}
                    alt="logo"
                    width={80}
                    height={50}
                    src={`data:${value?.ProductImage?.mimetype};base64,${value?.ProductImage?.buffer}`}
                  />
                </td>
                <td>{value?.Prodname}</td>
                <td>{value?.Brand}</td>
                <td>{value?.ProPrice}</td>
                <td>
                  <b
                    className="btn btn-outline-danger btn-sm"
                    hidden={value?.QuntityCart <= 0}
                    onClick={() => {
                      RemovePoduct(index);
                    }}
                  >
                    -
                  </b>{" "}
                  {value?.QuntityCart}{" "}
                  <b
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => {
                      AddPoduct(index);
                    }}
                  >
                    +
                  </b>
                </td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => {
                      setCartData((prev) => {
                        let copy = [...prev];
                        let copydata = copy?.filter(
                          (event) => event?._id != value?._id
                        );
                        localStorage.setItem(
                          "CartData",
                          JSON.stringify(copydata)
                        );
                        return [...copydata];
                      });
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="carttotal">
          <h3>Order Summary:</h3>
          <div>
            <address>Address : {Auth?.userData?.address}</address>
          </div>
          <table className="table text-white">
            <thead>
              <tr key={"header"}>
                <td>Product</td>
                <td>Items</td>
                <td>Total</td>
              </tr>
            </thead>
            <tbody>
              {CartData?.map((event, index) => {
                return (
                  <tr key={index}>
                    <td>{event?.Prodname}</td>
                    <td>{event?.QuntityCart}</td>
                    <td>{event?.QuntityCart * event?.ProPrice}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="totalcart">
            <h3> &nbsp;Total</h3>
            <h3>
              {(() => {
                const sum = CartData?.reduce((accumulator, currentItem) => {
                  return (
                    accumulator +
                    eval(currentItem.ProPrice * currentItem?.QuntityCart)
                  );
                }, 0); // Initial value of accumulator is 0
                return sum;
              })()}
            </h3>
          </div>
          {Auth?.userData ? (
            <button
              hidden={CartData?.length ? false : true}
              className="btn btn-outline-danger btn-lg"
              onClick={() => {
                let Data = window.confirm("Are you sure you want to buy?");
                if (Data) {
                  OrderAdd();
                }
              }}
            >
              Checkout
            </button>
          ) : (
            <button
              hidden={CartData?.length ? false : true}
              className="btn btn-outline-danger btn-lg"
              onClick={() => {
                navigator("/login");
              }}
            >
              Please Login
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
}
