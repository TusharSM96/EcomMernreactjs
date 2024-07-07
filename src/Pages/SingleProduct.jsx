import React, { useContext, useEffect, useState } from "react";
import Layout from "../Componet/Layout/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import { SimilerProductApi, SingleProductApi } from "../ApiService/Service";
import { AuthLoginContext } from "../Auth/Auth";

export default function SingleProduct() {
  const { state } = useLocation();
  const [ProductData, setProductData] = useState(null);
  const navigator = useNavigate(null);
  const [SimilerProd, setSimilerProd] = useState([]);
  const { setCartData } = useContext(AuthLoginContext);
  const BindSingleProData = () => {
    SingleProductApi({ ProductId: state.data }).then((resp) => {
      if (resp?.code === 200) {
        setProductData(resp?.data);
      } else {
        setProductData(null);
      }
    });
  };
  const BindSimilerPro = () => {
    SimilerProductApi({ BandName: state.Brand, ProductId: state.data }).then(
      (resp) => {
        if (resp?.code === 200) {
          setSimilerProd(resp?.data);
        } else {
          setSimilerProd([]);
        }
      }
    );
  };
  useEffect(() => {
    if (state.data) {
      BindSingleProData();
      BindSimilerPro();
    }
  }, [state.data]);
  return (
    <Layout>
      <div className="singlepro_main">
        <div className="singlepromain">
          <div className="singlepro_image">
            <img
              className="singlepro_imagetag"
              alt="logo"
              src={`data:${ProductData?.ProductImage?.mimetype};base64,${ProductData?.ProductImage?.buffer}`}
            />
          </div>
          <div className="details_content">
            <h1
              style={{
                color: "#ff4a00",
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              {ProductData?.Prodname}
              <button
                className="btn btn-outline-danger"
                onClick={() => {
                  navigator("/");
                }}
              >
                Back
              </button>
            </h1>
            <h2>Brand :&nbsp;&nbsp;{ProductData?.Brand}</h2>
            <br />
            <h3>{ProductData?.Discription}</h3>
            <br />
            <h2>Price :&nbsp;&nbsp;{ProductData?.ProPrice}</h2>
            <div>
              <button className="btn btn-outline-danger btn-lg">Buy Now</button>
              &nbsp; &nbsp;
              <button
                className="btn btn-outline-light btn-lg"
                onClick={() => {
                  setCartData((prev) => {
                    let Datacopy;
                    localStorage.removeItem("CartData");
                    let DataSet = prev?.find(
                      (filterone) => filterone?._id === ProductData?._id
                    );
                    let OtherData = prev?.filter(
                      (filterone) => filterone?._id !== ProductData?._id
                    );
                    if (DataSet) {
                      let EditData = {
                        ...DataSet,
                        QuntityCart: Number(DataSet?.QuntityCart || 0) + 1,
                      };
                      Datacopy = [...OtherData, { ...EditData }];
                      localStorage.setItem(
                        "CartData",
                        JSON.stringify(Datacopy)
                      );
                      return Datacopy;
                    }
                    Datacopy = [...prev, { ...ProductData,QuntityCart:1 }];
                    localStorage.setItem(
                      "CartData",
                      JSON.stringify(Datacopy)
                    );
                    return Datacopy;
                  });
                }}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
        <div className="similerproduct">
          {SimilerProd?.map((value, index) => (
            <div key={index} className="similercardpromain">
              <h3
                style={{
                  color: "#ff4a00",
                }}
              >
                {value?.Prodname}
              </h3>
              <img
                className="similerproimg"
                alt="image"
                src={`data:${value?.ProductImage?.mimetype};base64,${value?.ProductImage?.buffer}`}
                onClick={() => {
                  console.log(value?._id);
                  navigator("/product-details", {
                    state: { data: value?._id, Brand: value.Brand },
                  });
                }}
              />
              <br />
              <b>
                Price :{value?.ProPrice}{" "}
                <button
                  className="btn btn-outline-light btn-sm "
                  onClick={() => {
                    setCartData((prev) => {
                      let Datacopy;
                      localStorage.removeItem("CartData");
                      let DataSet = prev?.find(
                        (filterone) => filterone?._id === value?._id
                      );
                      let OtherData = prev?.filter(
                        (filterone) => filterone?._id !== value?._id
                      );
                      if (DataSet) {
                        let EditData = {
                          ...DataSet,
                          QuntityCart: Number(DataSet?.QuntityCart || 0) + 1,
                        };
                        Datacopy = [...OtherData, { ...EditData }];
                        localStorage.setItem(
                          "CartData",
                          JSON.stringify(Datacopy)
                        );
                        return Datacopy;
                      }
                      Datacopy = [...prev, { ...value,QuntityCart:1 }];
                      localStorage.setItem(
                        "CartData",
                        JSON.stringify(Datacopy)
                      );
                      return Datacopy;
                    });
                  }}
                >
                  Add To Cart
                </button>{" "}
              </b>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
