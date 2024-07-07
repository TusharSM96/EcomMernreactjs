import React, { useCallback, useEffect, useState } from "react";
import { CategoryGetAllApi, DeleteApi } from "../../ApiService/Service";
import CategoryModal from "./CategoryModal";
import GlobalNotify from "../../TostifyComp/GlobalNotify";
import TableSerchComp from "../../Componet/CustomComponet/TableSerchComp";

export default function Category() {
  const [CategoryData, setCategoryData] = useState([]);
  const [OrignalCategoryData, setOrignalCategoryData] = useState([]);
  const [ModalState, setModalState] = useState(false);
  const [UniqueId, setUniqueId] = useState(null);
  const BindGetAll = useCallback(async () => {
    const Data = await CategoryGetAllApi();
    setCategoryData(Data?.length ? Data : []);
    setOrignalCategoryData(Data?.length ? Data : []);
  }, []);
  function DeleteCategory(Id) {
    DeleteApi({ categoryid: Id }).then((resp) => {
      if (resp?.code === 200) {
        GlobalNotify(resp?.Msg, "success");
        BindGetAll();
      } else {
        GlobalNotify(resp?.Msg, "error");
      }
    });
  }
  useEffect(() => {
    BindGetAll();
  }, []);
  return (
    <div>
      <div className="d-flex justify-content-end align-content-center mb-2 me-2 row  mt-2">
        <div className="col-lg-3 col-sm-6 col-xl-3 col-md-4" >
          <TableSerchComp
            OrignalRowData={OrignalCategoryData}
            setRowData={setCategoryData}
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
              <th>Category Name</th>
              <th>Category Discription</th>
              <th>Category Icon Name</th>
              <th>Category Icon</th>
              <th>Active</th>
              <th>Update Date</th>
              <th>Created Date</th>
            </tr>
          </thead>
          <tbody>
            {CategoryData?.map((value, index) => (
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
                      DeleteCategory(value._id);
                    }}
                  />
                </td>
                <td>{value?.Catogoryname}</td>
                <td>{value?.Discription}</td>
                <td>{value?.CategoryIcon}</td>
                <td>
                  <i style={{color:'#d9d119'}} className={value?.CategoryIcon} />
                </td>
                <td>{value?.Active}</td>
                <td>{value?.updatedAt}</td>
                <td>{value?.createAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {ModalState && (
        <CategoryModal
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
  );
}
