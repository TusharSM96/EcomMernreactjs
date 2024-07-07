import moment from "moment";
import React from "react";
import Modal from "react-bootstrap/Modal";
import { UpdateOrderDetailsApi } from "../../ApiService/Service";
import GlobalNotify from "../../TostifyComp/GlobalNotify";
export default function OrderDetailsModal({
  open,
  close,
  OrderDetailsData,
  refress,
}) {
  function UpdateStatus(id) {
    UpdateOrderDetailsApi({
      deliveryId: id,
      deliveryStatus: "Shipping",
    }).then((resp) => {
      console.log(resp);
      if (resp.code === 200) {
        GlobalNotify(resp?.status, "success");
        close();
        refress();
      } else {
        GlobalNotify(resp?.status, "error");
      }
    });
  }
  return (
    <Modal show={open} onHide={close} backdrop={"static"} scrollable size="lg">
      <Modal.Header className="bg-dark text-white">
        <Modal.Title>Order Details</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-white">
        <table className="table text-white">
          <tr>
            <td className="heading_title h3"> User Name :</td>
            <td className="h3">{OrderDetailsData?.userDetails?.name}</td>
          </tr>
          <tr>
            <td className="heading_title h3"> Phone No :</td>
            <td className="h3">{OrderDetailsData?.userDetails?.phone}</td>
          </tr>
          <tr>
            <td className="heading_title h3"> Email Id :</td>
            <td className="h3">{OrderDetailsData?.email}</td>
          </tr>
          <tr>
            <td className="heading_title h3"> Total Bill :</td>
            <td className="h3">{OrderDetailsData?.totalBill}</td>
          </tr>
          <tr>
            <td className="heading_title h3"> Order Date :</td>
            <td className="h3">
              {moment(OrderDetailsData?.createdAt).format(
                "DD-MM-YYYY HH:MM:SS"
              )}
            </td>
          </tr>
          <tr>
            <td className="heading_title h3"> Last Update Date :</td>
            <td className="h3">
              {moment(OrderDetailsData?.updatedAt).format(
                "DD-MM-YYYY HH:MM:SS"
              )}
            </td>
          </tr>
        </table>
        <div>
          <h3>Order Details</h3>
          <table className="table text-white">
            <thead>
              <tr>
                <td>Product Name</td>
                <td>Product Price</td>
                <td>Brand</td>
                <td>QuntityCart</td>
              </tr>
            </thead>
            <tbody>
              {OrderDetailsData?.orderDetails?.map((value, index) => (
                <tr key={index}>
                  <td>{value?.Prodname}</td>
                  <td>{value?.ProPrice}</td>
                  <td>{value?.Brand}</td>
                  <td>{value?.QuntityCart}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {OrderDetailsData?.status === "Ordered" ? (
            <button
              className="btn btn-outline-danger"
              onClick={() => {
                UpdateStatus(OrderDetailsData?._id);
              }}
            >
              Shipping
            </button>
          ) : null}
        </div>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center bg-dark text-white">
        <button
          className="btn btn-info"
          type="button"
          onClick={() => {
            close();
          }}
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}
