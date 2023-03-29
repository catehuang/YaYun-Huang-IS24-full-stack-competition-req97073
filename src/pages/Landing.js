import React, { useState, useEffect, Fragment } from "react";
import { GetAllProducts } from "../api_calls/product.js";
import EditableRow from "../components/EditableRow.js";
import ReadOnlyRow from "../components/ReadOnlyRow.js";

function Landing() {
  const [products, setProducts] = useState([]);
  const [editProductId, setEditProductId] = useState(null);
  const [addFormData, setAddFormData] = useState({
    productName: "",
    productOwnerName: "",
    Developers: [],
    scrumMasterName: "",
    startDate: "",
    methodology: "",
  });

  const [editFormData, setEditFormData] = useState({
    productName: "",
    productOwnerName: "",
    Developers: [],
    scrumMasterName: "",
    startDate: "",
    methodology: "",
  });

  useEffect(() => {
    GetAllProducts().then((result) => setProducts(result));
  }, []);

  /**
   * Retrieve data from each field of a new form
   * @param {*} e
   */
  const handleAddFormChange = (e) => {
    e.preventDefault();
    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);
  };

  const handleAddFormSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      productName: addFormData.productName,
      productOwnerName: addFormData.productOwnerName,
      Developers: addFormData.Developers,
      scrumMasterName: addFormData.scrumMasterName,
      startDate: addFormData.startDate,
      methodology: addFormData.methodology,
    };

    const newProducts = [...products, newProduct];
    setProducts(newProducts);
  };

  const handleEditClick = (e, product) => {
    e.preventDefault();
    const p = product.product;
    setEditProductId(p.productId);

    const formValues = {
      productName: p.productName,
      productOwnerName: p.productOwnerName,
      Developers: p.Developers,
      scrumMasterName: p.scrumMasterName,
      startDate: p.startDate,
      methodology: p.methodology,
    };

    console.log(formValues);
    setEditFormData({ ...formValues });
    console.log(editFormData);
  };

  /**
   * Retrieve data from each field of a modified form
   * @param {*} e
   */
  const handleEditFormChange = (e) => {
    e.preventDefault();

    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;

    const modifiedFormData = { ...editFormData };
    modifiedFormData[fieldName] = fieldValue;

    setEditFormData(modifiedFormData);
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    const editedProduct = {
      productName: editFormData.productName,
      productOwnerName: editFormData.productOwnerName,
      Developers: editFormData.Developers,
      scrumMasterName: editFormData.scrumMasterName,
      startDate: editFormData.startDate,
      methodology: editFormData.methodology,
    };

    const modifiedProducts = [...products];
    const index = products.findIndex(
      (product) => product.productId === editedProduct.productId
    );
    modifiedProducts[index] = editProductId;
    setProducts(modifiedProducts);
    setEditProductId(null);
  };

  const handleDeleteClick = (productId) => {
    const newProducts = [...products];

    const index = products.findIndex(
      (product) => product.productId === productId
    );

    newProducts.splice(index, 1);

    setProducts(newProducts);
    console.log("delete product " + productId);
  };

  const handleCancelClick = () => {
    setEditProductId(null);
  };

  return (
    <div className="container p-3 bg-white">
      {/* Summary Info */}
      <div className="d-flex justify-content-between py-3">
        <h5 className="text-uppercase px-1 pb-2">
          Total Products: {products.length}
        </h5>
      </div>

      {/*  Add a new product*/}
      <div className="my-3 py-3 px-2 bg-light ">
        <h5>Add a product</h5>
        <form className="form-inline" onSubmit={handleAddFormSubmit}>
          <input
            type="text"
            name="productName"
            value={editFormData.productName}
            placeholder="Enter product name"
            required
            onChange={handleEditFormChange}
          />

          <input
            type="text"
            name="scrumMasterName"
            value={editFormData.scrumMasterName}
            placeholder="Enter the name of Scrum Master"
            required
            onChange={handleEditFormChange}
          />

          <input
            type="text"
            name="productOwnerName"
            value={editFormData.productOwnerName}
            placeholder="Enter the name of the product owner"
            required
            onChange={handleEditFormChange}
          />

          <input
            type="text"
            name="Developers"
            value={editFormData.Developers}
            placeholder="Enter the names of the developers"
            required
            onChange={handleEditFormChange}
          />

          <input
            type="text"
            name="startDate"
            value={editFormData.startDate}
            placeholder="Enter the start date of the product"
            required
            onChange={handleEditFormChange}
          />

          <input
            type="text"
            name="methodology"
            value={editFormData.methodology}
            placeholder="Enter the methodology"
            required
            onChange={handleEditFormChange}
          />

          <button type="submit">Save</button>
          <button type="button" onClick={handleCancelClick}>
            Cancel
          </button>
        </form>
      </div>

      <div className="my-3">
        <form onSubmit={handleEditFormSubmit}>
          <table className="mx-auto table-responsive table table-hover border table-bordered">
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
                  {editProductId === product.productId ? (
                    <EditableRow
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                    />
                  ) : (
                    <ReadOnlyRow
                      productId={product.productId}
                      product={product}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}
                    />
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
}

export default Landing;
