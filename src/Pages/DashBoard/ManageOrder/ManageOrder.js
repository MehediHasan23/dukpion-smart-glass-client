import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Swal from "sweetalert2";

const ManageOrder = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [confirm, setConfirm] = useState(true);
  useEffect(() => {
    fetch("https://boiling-caverns-07920.herokuapp.com/allOrder")
      .then((res) => res.json())
      .then((data) => setAllOrders(data));
  }, [confirm]);
  console.log(allOrders);

  //delete orders
  const deleteId = (id) => {
    // const proceed = window.confirm("you want to sure to delete");
    // if (proceed) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const url = `https://boiling-caverns-07920.herokuapp.com/allOrder/${id}`;
        fetch(url, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount === 1) {
              // alert("delete successfully");
              const remaining = allOrders.filter(
                (allOrder) => allOrder._id !== id
              );
              setAllOrders(remaining);
            }
          });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });

    // }
  };

  //confirm status:
  const confirmID = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Wanto To Confirm",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://boiling-caverns-07920.herokuapp.com/allOrder/${id}`, {
          method: "PUT",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount === 1) {
              setConfirm(!confirm);
            }
          });
        Swal.fire("Confirmed", "Ordered Confirmed", "success");
      }
    });

    // const confirm = window.confirm("wanna confirm ?");
    // if (confirm) {

    // }
  };
  return (
    <div className="admin-section  ">
      <div className="text-center fw-bold text-white">
        <h1 className="pt-3">MANAGE ORDERS</h1>
        <h4 className="pt-2 pb-2">TOTAL ORDERS: {allOrders.length}</h4>
      </div>
      <div className="container">
        <Table striped bordered hover responsive="sm" className="my-3">
          <thead>
            <tr>
              {Array.from({ length: 1 }).map((_, index) => (
                <th className="text-white" key={index}>
                  BUYER
                </th>
              ))}

              {Array.from({ length: 1 }).map((_, index) => (
                <th className="text-white" key={index}>
                  {" "}
                  PRODUCT ID{" "}
                </th>
              ))}

              {Array.from({ length: 1 }).map((_, index) => (
                <th className="text-white" key={index}>
                  PRICE
                </th>
              ))}

              {Array.from({ length: 1 }).map((_, index) => (
                <th className="text-white" key={index}>
                  STATUS
                </th>
              ))}
              {Array.from({ length: 1 }).map((_, index) => (
                <th className="text-white" key={index}>
                  CANCEL
                </th>
              ))}
              {Array.from({ length: 1 }).map((_, index) => (
                <th className="text-white" key={index}>
                  CONFIRM
                </th>
              ))}
            </tr>
          </thead>
          {allOrders.map((allOrder) => (
            <tbody>
              <tr>
                {Array.from({ length: 1 }).map((_, index) => (
                  <td className="fw-bold text-white " key={index}>
                    {allOrder?.Name}
                  </td>
                ))}

                {Array.from({ length: 1 }).map((_, index) => (
                  // <td className="fw-bold text-white" key={index}>
                  //   {allOrder?.name}
                  // </td>
                  <td
                    style={{ textAlign: "center" }}
                    className="fw-bold text-white"
                    key={index}
                  >
                    {allOrder._id}
                  </td>
                ))}

                {Array.from({ length: 1 }).map((_, index) => (
                  <td className="fw-bold text-white " key={index}>
                    {allOrder?.price}
                  </td>
                ))}

                {Array.from({ length: 1 }).map((_, index) => (
                  <td className="fw-bold text-white " key={index}>
                    {allOrder?.status}
                  </td>
                ))}
                {Array.from({ length: 1 }).map((_, index) => (
                  <td key={index}>
                    <button
                      onClick={() => deleteId(allOrder._id)}
                      className="mx-3 text-danger"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                ))}
                {Array.from({ length: 1 }).map((_, index) => (
                  <td key={index} className="align-middle">
                    <button
                      onClick={() => confirmID(allOrder._id)}
                      className="mx-3 text-success"
                    >
                      <FontAwesomeIcon icon={faCheckCircle} />
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          ))}
        </Table>
      </div>
    </div>
  );
};

export default ManageOrder;
