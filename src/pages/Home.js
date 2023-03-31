import React, { useState, useEffect, Fragment } from "react";
import {
  DeleteProduct,
  AddNewProduct,
  GetAllProducts,
  UpdateProduct,
} from "../api_calls/product.js";

function Home() {
  const [products, setProducts] = useState([]);
  const [editProductId, setEditProductId] = useState(null);
  const [editable, setEditable] = useState(false);
  const [editableFormData, setEditFormData] = useState({
    productName: "",
    productOwnerName: "",
    Developers: [],
    scrumMasterName: "",
    startDate: "",
    methodology: "",
  });
  /**
   * Retrieve all products when user is landing to this page
   */
  useEffect(() => {
    GetAllProducts().then((result) => setProducts(result));
    console.log("reload");
  }, []);

  /**
   * Edit a product after clicking the edit button
   */
  const handleEditClick = (product) => {
    setEditable(true);
    setEditProductId(product.productId);
    setEditFormData(product);
  };

  /**
   * Retrieve data from each field of a modified form
   * @param {*} e
   */
  const handleEditFormChange = (e) => {
    e.preventDefault();

    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;

    const modifiedFormData = { ...editableFormData };
    modifiedFormData[fieldName] = fieldValue;

    setEditFormData(modifiedFormData);
  };

  /**
   * Update edited product
   * @param {*} product updated product
   */
  const handleSaveClick = () => {
    const updatedFormData = { editProductId, ...editableFormData };
    if (
      updatedFormData.productName.length > 0 &&
      updatedFormData.productOwnerName.length > 0 &&
      updatedFormData.scrumMasterName.length > 0 &&
      updatedFormData.startDate.length > 0 &&
      updatedFormData.Developers.split(",").length < 6
    ) {
      setEditable(false);
      UpdateProduct(updatedFormData);
      GetAllProducts().then((result) => setProducts(result));
      window.location.reload()
    }
    else {
        console.log("All fields must be filled!")
    }
  };

  const handleCancelClick = () => {
    setEditProductId(null);
    setEditable(false);
  };

  /**
   * Delete a product from products after clicking the delete button
   * @param {*} productId product Id of the clicked product
   */
  const handleDeleteClick = (productId) => {
    DeleteProduct(productId).then((result) => {
      if (result != "OK") {
        console.log(result);
      } else {
        GetAllProducts().then((result) => setProducts(result));
      }
    });
  };

  return (
    <div className="container p-3 bg-white">
      <div>
        <h5 className="text-uppercase px-1 pb-2">
          Total Products: {products.length}
        </h5>
      </div>

      <div className="my-3">
        <table className="mx-auto table table-responsive table table-hover border table-bordered">
          <thead>
            <tr className="position-sticky fixed-top bg-primary text-light">
              <th>Product Number</th>
              <th>Product Name</th>
              <th>Scrum Master</th>
              <th>Product Owner</th>
              <th>Developer Names</th>
              <th>Start Date</th>
              <th>Methodology</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="overflow-auto position: relative;">
            {products.map((product) => (
              <Fragment key={product.productId}>
                {editable && editProductId === product.productId ? (
                  <tr>
                    <td>{product.productId}</td>
                    <td>
                      <input
                        size="12"
                        type="text"
                        name="productName"
                        value={editableFormData.productName}
                        placeholder="Product name"
                        required
                        onChange={handleEditFormChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        size="12"
                        name="scrumMasterName"
                        value={editableFormData.scrumMasterName}
                        placeholder="Scrum Master"
                        required
                        onChange={handleEditFormChange}
                      />
                    </td>
                    <td>
                      <input
                        size="12"
                        name="productOwnerName"
                        value={editableFormData.productOwnerName}
                        placeholder="Product owner"
                        required
                        onChange={handleEditFormChange}
                      />
                    </td>
                    <td>
                      <input
                        name="Developers"
                        value={editableFormData.Developers}
                        placeholder="Developers"
                        required
                        onChange={handleEditFormChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        size="10"
                        name="startDate"
                        value={editableFormData.startDate}
                        placeholder="YYYY/MM/DD"
                        required
                        onChange={handleEditFormChange}
                      />
                    </td>
                    <td>
                      <select
                        name="methodology"
                        onChange={handleEditFormChange}
                      >
                        <option value="Waterfall">Waterfall</option>
                        <option value="Agile">Agile</option>
                      </select>
                    </td>
                    <td className="d-flex justify-content-between">
                      <button
                        className="btn btn-outline-primary px-2 mr-2"
                        type="button"
                        onClick={handleSaveClick}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-check-lg"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                        </svg>
                      </button>
                      <button
                        className="btn btn-outline-danger px-2"
                        type="button"
                        onClick={handleCancelClick}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-x-lg"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td>{product.productId}</td>
                    <td>{product.productName}</td>
                    <td>{product.scrumMasterName}</td>
                    <td>{product.productOwnerName}</td>
                    <td>{product.Developers}</td>
                    <td>{product.startDate}</td>
                    <td>{product.methodology}</td>
                    <td className="d-flex justify-content-between">
                      <button
                        type="button"
                        className="btn btn-outline-success px-2 mr-2"
                        onClick={() => handleEditClick(product)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-pencil"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger px-2"
                        onClick={() => handleDeleteClick(product.productId)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-trash3"
                          viewBox="0 0 16 16"
                        >
                          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
