import { TextField } from "@mui/material";
import React, { useMemo, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import {
  CategoryGetApi,
  CategoryInsertUpdateApi,
} from "../../ApiService/Service";
import GlobalNotify from "../../TostifyComp/GlobalNotify";
export default function CategoryModal({ open, close, getrefress, UniqueId }) {
  const [loder, setLoder] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      Active: true, // Set default value for the checkbox to true
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
  const SubmitHandler = (data) => {
    // Categoryid, Catogoryname, Discription, CategoryIcon, Active
    const body = {
      ...data,
      Categoryid: UniqueId || null,
      Active: data.Active ? "Y" : "N",
    };
    setLoder(true);
    CategoryInsertUpdateApi(body).then((resp) => {
      if (resp?.code === 200) {
        GlobalNotify(resp?.Msg, "success");
        reset();
        close();
        getrefress();
        setLoder(false);
      } else {
        GlobalNotify(resp?.Msg, "error");
        setLoder(false);
      }
    });
  };
  const BindCategoryData = () => {
    let body = {
      Categoryid: UniqueId,
    };
    setLoder(true);
    CategoryGetApi(body).then((resp) => {
      if (resp?.code === 200) {
        reset({
          Catogoryname: resp?.data?.Catogoryname,
          CategoryIcon: resp?.data?.CategoryIcon,
          Discription: resp?.data?.Discription,
          Active: resp?.data?.Active === "Y" ? true : false,
        });
        setLoder(false);
      } else {
        GlobalNotify("Getting Error on Edit Data", "info");
        setLoder(false);
      }
    });
  };
  useMemo(() => {
    if (open && UniqueId) {
      BindCategoryData();
    }
  }, [open, UniqueId]);
  return (
    <Modal show={open} onHide={close} backdrop={"static"} scrollable>
      <form onSubmit={handleSubmit(SubmitHandler)} autoComplete="off">
        <Modal.Header className="bg-dark text-white">
          <Modal.Title>Category</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
              <label htmlFor="Catogoryname">Category Name :</label>
              <TextField
                type="Catogoryname"
                variant="outlined"
                sx={StyleBorder}
                InputLabelProps={inputLabelProps}
                inputProps={inputProps}
                fullWidth
                id="Catogoryname"
                margin="normal"
                size="small"
                autoFocus
                {...register("Catogoryname", {
                  required: true,
                })}
                error={!!errors.Catogoryname}
              />
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
              <label htmlFor="CategoryIcon">Category Icon :</label>
              <TextField
                type="CategoryIcon"
                variant="outlined"
                id="CategoryIcon"
                sx={StyleBorder}
                InputLabelProps={inputLabelProps}
                inputProps={inputProps}
                fullWidth
                margin="normal"
                size="small"
                {...register("CategoryIcon", {
                  required: true,
                })}
                error={!!errors.CategoryIcon}
              />
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
              <label htmlFor="Discription">Discription :</label>
              <textarea
                id="Discription"
                name="Discription"
                className='form-control'
                {...register("Discription", {
                  required: true,
                })}
                error={!!errors.Discription}
              />
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
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
