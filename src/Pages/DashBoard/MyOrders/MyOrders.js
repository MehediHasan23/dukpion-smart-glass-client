import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import useAuth from "../../../Hooks/useAuth";

const MyOrders = () => {
  const { user } = useAuth();
  const { email } = user;

  const [lists, setLists] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/allOrder/${email}`)
      .then((res) => res.json())
      .then((data) => setLists(data));
  }, [email]);
  console.log(lists);


  //delete order
   const deleteId = (id) => {
     const proceed = window.confirm("you want to sure to delete");
     if (proceed) {
       const url = `http://localhost:5000/allOrder/${id}`;
       fetch(url, {
         method: "DELETE",
       })
         .then((res) => res.json())
         .then((data) => {
           if (data.deletedCount === 1) {
             alert("delete successfully");
             const remaining = lists.filter((list) => list._id !== id);
             setLists(remaining);
           }
         });
     }
   };


  return (
    <div className="my-order-section p-5 bg-dark">
      <div className="text-center fw-bold text-white">
        <h1>REVIEW YOUR ORDERS</h1>
        <h4>TOTAL ORDERS: {lists.length}</h4>
      </div>
      <div className="container ">
        <Table striped bordered hover responsive="sm">
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
                  PRODUCT NAME{" "}
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
            </tr>
          </thead>
          {lists.map((list) => (
            <tbody>
              <tr>
                {Array.from({ length: 1 }).map((_, index) => (
                  <td className="fw-bold text-white" key={index}>
                    {list?.Name}
                  </td>
                ))}

                {Array.from({ length: 1 }).map((_, index) => (
                  <td className="fw-bold text-white" key={index}>
                    {list?.name}
                  </td>
                ))}

                {Array.from({ length: 1 }).map((_, index) => (
                  <td className="fw-bold text-white" key={index}>
                    {list?.price}
                  </td>
                ))}

                {Array.from({ length: 1 }).map((_, index) => (
                  <td className="fw-bold text-white" key={index}>
                    {list?.status}
                  </td>
                ))}
                {Array.from({ length: 1 }).map((_, index) => (
                  <td key={index}>
                    <button
                      onClick={() => deleteId(list._id)}
                      className="mx-3 text-danger"
                    >
                      <FontAwesomeIcon icon={faTrash} />
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

export default MyOrders;