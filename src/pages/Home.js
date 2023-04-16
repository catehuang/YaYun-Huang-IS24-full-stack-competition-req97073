import React, { useState, useEffect, Fragment } from "react";
import {
  DeleteProduct,
  AddNewProduct,
  GetAllProducts,
  UpdateProduct,
} from "../api_calls/product.js";
import EditableForm from "../components/EditableForm.js";
import NewForm from "../components/NewForm.js";
import ReadOnlyForm from "../components/ReadOnlyForm.js";

function Home() {
  const [products, setProducts] = useState([]);
  const [showProducts, setShowProducts] = useState([]);
  const [searchScrumMaster, setSearchScrumMaster] = useState("");
  const [searchDeveloper, setSearchDeveloper] = useState("");
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

  const [newFormData, setNewFormData] = useState({
    productName: "",
    productOwnerName: "",
    Developers: [],
    scrumMasterName: "",
    startDate: "",
    methodology: "Waterfall",
  });

  /**
   * Retrieve all products when user is landing to this page
   */
  useEffect(() => {
    GetAllProducts().then((result) => 
    {
      setProducts(result);
      setShowProducts(result)
    })
  }, [products.length]);

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
      window.location.reload();
    } else {
      console.log(
        "All fields must be filled! The number of developers is up to 5."
      );
    }
  };

  /**
   * Give up the modification of a product
   */
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
      if (result !== "OK") {
        console.log(result);
      } else {
        GetAllProducts().then((result) => setProducts(result));
        setShowProducts(products)
      }
    });
  };

  /**
   * Retrieve data from each field of a new form
   * @param {*} e
   */
  const handleAddFormChange = (e) => {
    e.preventDefault();

    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;

    const modifiedFormData = { ...newFormData };
    modifiedFormData[fieldName] = fieldValue;

    setNewFormData(modifiedFormData);
  };

  /**
   * Clear all fields of a new product
   */
  const handleClearClick = () => {
    setNewFormData({
      productName: "",
      productOwnerName: "",
      Developers: [],
      scrumMasterName: "",
      startDate: "",
      methodology: "",
    });
  };

  /**
   * Store new product info from a user
   */
  const handleAddClick = () => {
    if (
      newFormData.productName.length > 0 &&
      newFormData.productOwnerName.length > 0 &&
      newFormData.scrumMasterName.length > 0 &&
      newFormData.startDate.length > 0 &&
      newFormData.Developers.split(",").length < 6
    ) {
      AddNewProduct(newFormData);
      GetAllProducts().then((result) => setProducts(result));
      window.location.reload();
    } else {
      console.log(
        "All fields must be filled! The number of developers is up to 5"
      );
    }
  };

  const handleSearchScrumMaster = (str) => {
    setSearchDeveloper("");
    setSearchScrumMaster(str);
    let filteredResults = [];

    if (str.length > 0) {
      filteredResults = products.filter((product) =>
        product.scrumMasterName.toLowerCase().includes(str)
      );
    }

    setShowProducts(filteredResults);
  };

  const handleSearchDeveloper = (str) => {
    setSearchScrumMaster("");
    setSearchDeveloper(str);
    let filteredResults = [];

    if (str.length > 0) {
      filteredResults = products.filter((product) =>
        product.Developers.toLowerCase().includes(str)
      );
    }

    setShowProducts(filteredResults);
  };

  return (
    <div className="container p-3 bg-white">
      <h5 className="text-uppercase px-1 pb-2 mr-5">
        Total Products: {products.length}
      </h5>

      <div className="d-lg-flex justify-content-md-between">
        <div className="searchbar mr-5 w-100 w-lg-50">
          <div className="searchbar-text">
            <span>Search Scrum Master</span>
          </div>
          <input
            className="searchbar-input"
            type="text"
            placeholder="Search for a Scrum Master..."
            value={searchScrumMaster}
            onChange={(e) => handleSearchScrumMaster(e.target.value)}
          />
        </div>

        <div className="searchbar mr-5 w-100 w-md-50">
          <div className="searchbar-text">
            <span>Search Developer</span>
          </div>
          <input
            className="searchbar-input"
            type="text"
            placeholder="Search for a Developer..."
            value={searchDeveloper}
            onChange={(e) => handleSearchDeveloper(e.target.value)}
          />
        </div>
      </div>

      <div className="p-2">
        {searchScrumMaster.length !== 0 && (
          <p>
            Search for Scrum Master [<span>{searchScrumMaster}</span>] -{" "}
            {showProducts.length} result(s)
          </p>
        )}

        {searchDeveloper.length !== 0 && (
          <p>
            Search for Developer [<span>{searchDeveloper}</span>] -{" "}
            {showProducts.length} result(s)
          </p>
        )}
      </div>

      {/* Product list view with modify and delete functions */}
      <div className="my-3">
        <table className="mx-auto table table-responsive table-hover border table-bordered">
          <thead>
            <tr className="position-sticky fixed-top bg-primary text-light">
              <th>Product #</th>
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
            <NewForm
              newFormData={newFormData}
              handleAddFormChange={handleAddFormChange}
              handleAddClick={handleAddClick}
              handleClearClick={handleClearClick}
            />

            {showProducts.map((product) => (
              <Fragment key={product.productId}>
                {editable && editProductId === product.productId ? (
                  <EditableForm
                    product={product}
                    editableFormData={editableFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleSaveClick={handleSaveClick}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyForm
                    product={product}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
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
