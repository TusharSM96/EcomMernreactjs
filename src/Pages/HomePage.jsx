import React, { useContext, useEffect, useState } from "react";
import Layout from "../Componet/Layout/Layout";
import {
  CategoryGetAllApi,
  ProductGetAllFilterApi,
} from "../ApiService/Service";
import { useNavigate } from "react-router-dom";
import { AuthLoginContext } from "../Auth/Auth";
export default function HomePage() {
  const [CategoryData, setCategoryData] = useState([]);
  const [ProductGetAll, setProductGetAll] = useState([]);
  const [SerchProd, setSerchProd] = useState("");
  const { setCartData } = useContext(AuthLoginContext);
  const navigator = useNavigate();
  const BindCatergory = async () => {
    const Data = await CategoryGetAllApi();
    setCategoryData(Data?.length ? Data : []);
  };
  const BindProduct = async () => {
    ProductGetAllFilterApi({
      serchValue: SerchProd || "",
      CategoryIds: CategoryData?.filter(
        (value) => value?.selectflag === "Y"
      )?.map((value) => value?._id),
    }).then((resp) => {
      setProductGetAll(resp?.length ? resp : []);
    });
  };
  useEffect(() => {
    BindCatergory();
  }, []);
  useEffect(() => {
    BindProduct();
  }, [CategoryData, SerchProd]);
  return (
    <Layout>
      <div className="homepage_main">
        <div className="filter_main">
          <h5 className="heading_title">All Filters </h5>
          <div>
            <b style={{ color: "silver" }}>Category Filter</b>
            {CategoryData?.map((value, index) => (
              <div
                onClick={() => {
                  setCategoryData((prev) => {
                    let Datacopy = [...prev];
                    let EditValue = Datacopy[index];
                    EditValue = {
                      ...EditValue,
                      selectflag: EditValue.selectflag === "Y" ? "N" : "Y",
                    };
                    Datacopy[index] = EditValue;
                    return [...Datacopy];
                  });
                }}
                key={index}
                style={{
                  color: `${value?.selectflag === "Y" ? "red" : "white"}`,
                }}
              >
                <i className={value?.CategoryIcon} /> &nbsp;
                <label htmlFor={value?.Catogoryname}>
                  {value?.Catogoryname}
                </label>
              </div>
            ))}
            <button className="buttoncus" onClick={BindCatergory}>
              Reset Filter
            </button>
          </div>
        </div>
        <div className="Productarea_main">
          <div className="serchcontroll mb-2 mt-2">
            <h5 className="heading_title">All Products</h5>
            <input
              type="search"
              style={{ borderRadius: 5, marginRight: 10 }}
              value={SerchProd}
              onChange={(e) => {
                setSerchProd(e.target.value);
              }}
            />
          </div>
          <div className="product_list">
            {ProductGetAll?.map((value, index) => (
              <div className="product_card card bg-dark " key={index}>
                <img
                  onClick={() => {
                    navigator("/product-details", {
                      state: { data: value?._id, Brand: value.Brand },
                    });
                  }}
                  className="product_card_img"
                  alt="image"
                  src={`data:${value?.ProductImage?.mimetype};base64,${value?.ProductImage?.buffer}`}
                />
                <h5 className="heading_title">{value?.Prodname}</h5>
                <h6>{value?.Brand}</h6>
                <h6>{value?.ProPrice} rs</h6>
                <h6>Avilable : {value?.Quntity} </h6>
                <div className="productcard_button">
                  <button
                    className="buttoncus"
                    onClick={() => {
                      navigator("/product-details", {
                        state: { data: value?._id, Brand: value.Brand },
                      });
                    }}
                  >
                    MORE DETAILS
                  </button>
                  <button
                    disabled={value?.Quntity === 0 ? true : false}
                    className="buttoncus"
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
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
