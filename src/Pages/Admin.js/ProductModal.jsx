import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import GlobalNotify from "../../TostifyComp/GlobalNotify";
import {
  CategoryGetAllApi,
  ProductInsertUpdateApi,
  SingleProductApi,
} from "../../ApiService/Service";
export default function ProductModal({ open, close, getrefress, UniqueId }) {
  const [loder, setLoder] = useState(false);
  const [CategoryOption, setCategoryOption] = useState([]);
  const BindCategory = async () => {
    let Data = await CategoryGetAllApi();
    setCategoryOption(Data?.length ? Data : []);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    defaultValues: {
      Active: true, // Set default value for the checkbox to true
      ProductImageGet: null,
    },
  });
  const inputLabelProps = {
    style: { color: "white", fontWeight: 700, fontSize: "20px" },
  };
  const inputProps = {
    style: { color: "white" },
  };
  const StyleBorder = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: " #b7fff6",
        borderWidth: "2px",
      },
    },
  };
  const SubmitHandler = async (data) => {
    const formData = new FormData();
    formData.append("ProductId", UniqueId || null);
    formData.append("Prodname", data.ProductName);
    formData.append("Brand", data.Brand);
    formData.append("Category", data.Category);
    formData.append("ProPrice", data.ProPrice);
    formData.append("Quntity", data.Quntity);
    formData.append("Discription", data.Discription);
    formData.append("Active", data.Active === true ? "Y" : "N");
    formData.append("ProductImage", data.ProductImage[0]);
    setLoder(true);
    ProductInsertUpdateApi(formData).then((resp) => {
      console.log(resp);
      if (resp.code === 200) {
        GlobalNotify(resp?.Msg, "success");
        setLoder(false);
        reset();
        close();
        getrefress();
      } else {
        GlobalNotify(resp?.Msg, "error");
        setLoder(false);
      }
    });
  };
  function GetBindProduct() {
    SingleProductApi({ ProductId: UniqueId }).then((resp) => {
      console.log(resp);
      if (resp.code === 200) {
        reset({
          ProductName: resp.data?.Prodname,
          Brand: resp.data?.Brand,
          Category: resp.data?.Category,
          ProPrice: resp.data?.ProPrice,
          Quntity: resp.data?.Quntity,
          Discription: resp.data?.Discription,
          Active: resp.data?.Active == "Y" ? true : false,
          ProductImage: resp.data?.ProductImage,
        });
      } else {
        GlobalNotify("Geting Error in get product data", "error");
      }
    });
  }

  useEffect(() => {
    BindCategory();
  }, []);
  useEffect(() => {
    if (UniqueId && open) {
      GetBindProduct();
    }
  }, [open, UniqueId]);
  return (
    <Modal show={open} onHide={close} backdrop={"static"} scrollable size="lg">
      <form onSubmit={handleSubmit(SubmitHandler)} autoComplete="off">
        <Modal.Header className="bg-dark text-white">
          <Modal.Title>Product</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
          <div className="row">
            <div className="col-lg-6 col-md-12 col-sm-12 col-xl-6">
              <label htmlFor="ProductName">Product Name :</label>
              <TextField
                type="text"
                variant="outlined"
                sx={StyleBorder}
                InputLabelProps={inputLabelProps}
                inputProps={inputProps}
                fullWidth
                id="ProductName"
                margin="normal"
                size="small"
                autoFocus
                {...register("ProductName", {
                  required: true,
                })}
                error={!!errors.ProductName}
              />
            </div>
            <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
              <label htmlFor="Brand">Brand :</label>
              <TextField
                type="text"
                variant="outlined"
                id="Brand"
                sx={StyleBorder}
                InputLabelProps={inputLabelProps}
                inputProps={inputProps}
                fullWidth
                margin="normal"
                size="small"
                {...register("Brand", {
                  required: true,
                })}
                error={!!errors.Brand}
              />
            </div>
            <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
              <label htmlFor="Category">Category :</label>
              <select
                style={{
                  marginTop: "17px",
                  background: "#212529",
                  color: "white",
                }}
                className="form-control"
                {...register("Category", {
                  required: true,
                })}
              >
                <option value={null}>--select--</option>
                {CategoryOption?.map((value) => (
                  <option value={value?._id}>{value?.Catogoryname}</option>
                ))}
              </select>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3">
              <label htmlFor="ProPrice">Price :</label>
              <TextField
                type="number"
                variant="outlined"
                id="ProPrice"
                sx={StyleBorder}
                InputLabelProps={inputLabelProps}
                inputProps={inputProps}
                fullWidth
                margin="normal"
                size="small"
                {...register("ProPrice", {
                  required: true,
                })}
                error={!!errors.ProPrice}
              />
            </div>
            <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3">
              <label htmlFor="Quntity">Quntity :</label>
              <TextField
                type="number"
                variant="outlined"
                id="Quntity"
                sx={StyleBorder}
                InputLabelProps={inputLabelProps}
                inputProps={inputProps}
                fullWidth
                margin="normal"
                size="small"
                {...register("Quntity", {
                  required: true,
                })}
                error={!!errors.Quntity}
              />
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
              <label htmlFor="Discription">Discription :</label>
              <textarea
                className="form-control"
                id="Discription"
                {...register("Discription", {
                  required: true,
                })}
                error={!!errors.Discription}
              />
            </div>
            <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 mt-1">
              <input
                type="file"
                {...register("ProductImage", {
                  //   required: true,
                })}
              />
            </div>
            <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 mt-1">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="Active"
                  name="Active"
                  {...register("Active")}
                />
                <label className="form-check-label" htmlFor="Active">
                  Active Flag
                </label>
              </div>
            </div>

            {UniqueId ? (
              <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12 mt-1">
                <div>
                  <img
                    width={100}
                    height={100}
                    src={`data:${getValues("ProductImage")?.mimetype};base64,${
                      getValues("ProductImage")?.buffer
                    }`}
                    alt="product image"
                  />
                </div>
              </div>
            ) : null}
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center bg-dark text-white">
          <button type="submit" className="btn btn-info" disabled={loder}>
            Save
          </button>
          <button
            className="btn btn-info"
            type="button"
            disabled={loder}
            onClick={() => {
              reset();
              close();
            }}
          >
            Close
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
