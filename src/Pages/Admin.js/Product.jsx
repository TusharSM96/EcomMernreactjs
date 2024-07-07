import React, { useCallback, useEffect, useState } from "react";
import TableSerchComp from "../../Componet/CustomComponet/TableSerchComp";
import { DeleteProductApi, ProductGetAllApi } from "../../ApiService/Service";
import ProductModal from "./ProductModal";
import GlobalNotify from "../../TostifyComp/GlobalNotify";

export default function Product() {
  const [RowData, setRowData] = useState([]);
  const [OrignalRowData, setOrignalRowData] = useState([]);
  const [ModalState, setModalState] = useState(false);
  const [UniqueId, setUniqueId] = useState(null);

  const BindGetAll = useCallback(async () => {
    const Data = await ProductGetAllApi();
    setRowData(Data?.length ? Data : []);
    setOrignalRowData(Data?.length ? Data : []);
  }, []);

  function DeleteProduct(id) {
    DeleteProductApi({ ProductId: id }).then((resp) => {
      console.log(resp);
      if(resp.code===200){
        GlobalNotify(resp?.Msg,'success')
        BindGetAll()
      }else{
        GlobalNotify(resp?.Msg,'error')
      }
    });
  }
  useEffect(() => {
    BindGetAll();
  }, []);
  return (
    <div>
      <div className="d-flex justify-content-end align-content-center mb-2 me-2 row  mt-2">
        <div className="col-lg-3 col-sm-6 col-xl-3 col-md-4">
          <TableSerchComp
            OrignalRowData={OrignalRowData}
            setRowData={setRowData}
          />
        </div>
        <div className="col-lg-1 col-sm-2 col-xl-1 col-md-2">
          <button
            className="btn btn-info"
            onClick={() => {
              setModalState(true);
              setUniqueId(null);
            }}
          >
            <i className="fa fa-plus text-dark" />
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
              <th>Edit</th>
              <th>Delete</th>
              <th>Product Name</th>
              <th>Category Name</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Quntity</th>
              <th>Active</th>
              <th>Update Date</th>
              <th>Created Date</th>
            </tr>
          </thead>
          <tbody>
            {RowData?.map((value, index) => (
              <tr key={index}>
                <td>
                  <i
                    className="fa fa-pen cursor_pointer"
                    title="Edit"
                    onClick={() => {
                      setUniqueId(value._id);
                      setModalState(true);
                    }}
                  />
                </td>
                <td>
                  <i
                    className="fa fa-trash cursor_pointer"
                    title="Delete"
                    onClick={() => {
                      DeleteProduct(value._id);
                    }}
                  />
                </td>
                <td>{value?.Prodname}</td>
                <td>{value?.Category}</td>
                <td>{value?.Brand}</td>
                <td>{value?.ProPrice}</td>
                <td>{value?.Quntity}</td>
                <td>{value?.Active}</td>
                <td>{value?.updatedAt}</td>
                <td>{value?.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {ModalState && (
          <ProductModal
            open={ModalState}
            close={() => {
              setModalState(false);
              setUniqueId(null);
            }}
            getrefress={BindGetAll}
            UniqueId={UniqueId}
            setUniqueId={setUniqueId}
          />
        )}
      </div>
    </div>
  );
}
