import moment from "moment";
import React from "react";
import Modal from "react-bootstrap/Modal";

export default function DeliveredDetailsModal({open,close,OrderDetailsData}) {
  return (
    <Modal show={open} onHide={close} backdrop={"static"} scrollable size="lg">
      <Modal.Header className="bg-dark text-white">
        <Modal.Title>Order Details</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-white">
        <table className="table text-white">
          <tr>
            <td className="heading_title h4"> User Name :</td>
            <td className="h4">{OrderDetailsData?.userDetails?.name}</td>
          </tr>
          <tr>
            <td className="heading_title h4"> Phone No :</td>
            <td className="h4">{OrderDetailsData?.userDetails?.phone}</td>
          </tr>
          <tr>
            <td className="heading_title h4"> Email Id :</td>
            <td className="h4">{OrderDetailsData?.email}</td>
          </tr>
          <tr>
            <td className="heading_title h4"> Total Bill :</td>
            <td className="h4">{OrderDetailsData?.totalBill}</td>
          </tr>
          <tr>
            <td className="heading_title h4"> Order Date :</td>
            <td className="h4">
              {moment(OrderDetailsData?.createdAt).format(
                "DD-MM-YYYY HH:MM:SS"
              )}
            </td>
          </tr>
          <tr>
            <td className="heading_title h4"> Last Update Date :</td>
            <td className="h4">
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
  )
}
