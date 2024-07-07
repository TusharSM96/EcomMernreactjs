import React, { useEffect, useState } from "react";
import TableSerchComp from "../../Componet/CustomComponet/TableSerchComp";
import { useNavigate } from "react-router-dom";
import { GetAllOrderDetailsApi } from "../../ApiService/Service";
import moment from "moment";
import ShippingOrderModal from "./ShippingOrderModal";

export default function ShippingOrderDetails() {
  const [RowData, setRowData] = useState([]);
  const [OrignalRowData, setOrignalRowData] = useState([]);
  const [OrderDetailsModalState, setOrderDetailsModalState] = useState(false);
  const [OrderDetailsData, setOrderDetailsData] = useState([]);
  const navigator = useNavigate();

  function GetAllProd() {
    GetAllOrderDetailsApi({ OrderCatgory: "Shipping" }).then((resp) => {
      console.log(resp);
      if (resp?.code == 200) {
        setRowData(resp?.data);
        setOrignalRowData(resp?.data);
      } else {
        setRowData([]);
        setOrignalRowData([]);
      }
    });
  }
  useEffect(() => {
    GetAllProd();
  }, []);
  return (
    <div>
      {OrderDetailsModalState && (
        <ShippingOrderModal
          open={OrderDetailsModalState}
          OrderDetailsData={OrderDetailsData}
          refress={GetAllProd}
          close={() => {
            setOrderDetailsModalState(false);
            setOrderDetailsData([]);
          }}
        />
      )}
      <div className="d-flex justify-content-end align-content-center mb-2 me-2 row  mt-2">
        <div className="col-lg-3 col-sm-6 col-xl-3 col-md-4">
          <TableSerchComp
            OrignalRowData={OrignalRowData}
            setRowData={setRowData}
          />
        </div>
        <div className="col-lg-2 col-sm-3 col-xl-2 col-md-2">
          <button
            className="btn btn-outline-danger"
            onClick={() => {
              navigator("/admin");
            }}
          >
            Back
          </button>
        </div>
      </div>
      <div className="CommonTableOverflow">
        <table
          border={2}
          className="table table-bordered table-dark table-hover table-sm"
        >
          <thead>
            <tr>
              <th>User Name</th>
              <th>User Mobile no</th>
              <th>Address</th>
              <th>Total Product</th>
              <th>Total Bill</th>
              <th>Order Date</th>
              <th>Updated Date</th>
              <th>Status</th>
              <th>View Details</th>
            </tr>
          </thead>
          <tbody>
            {RowData?.map((value, index) => (
              <tr key={index}>
                <td>{value?.userDetails?.name}</td>
                <td>{value?.userDetails?.phone}</td>
                <td>{value?.Address}</td>
                <td>{value?.orderDetails?.length}</td>
                <td>{value?.totalBill}</td>
                <td>
                  {value?.createdAt
                    ? moment(value?.createdAt).format("DD-MMM-YYYY HH:MM:SS")
                    : ""}
                </td>
                <td>
                  {value?.updatedAt
                    ? moment(value?.updatedAt).format("DD-MMM-YYYY HH:MM:SS")
                    : ""}
                </td>
                <td>{value?.status}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      setOrderDetailsData(value);
                      setOrderDetailsModalState(true);
                    }}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
