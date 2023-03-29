import React from "react";

function EditableRow({ editFormData, handleEditFormChange, handleCancelClick }) {
  <tr>
    <td>
      <input
        type="text"
        name="productName"
        value={editFormData.productName}
        placeholder="Enter product name"
        required
        onChange={handleEditFormChange}
      />
    </td>
    <td>
      <input
        type="text"
        name="scrumMasterName"
        value={editFormData.scrumMasterName}
        placeholder="Enter the name of Scrum Master"
        required
        onChange={handleEditFormChange}
      />
    </td>
    <td>
      <input
        type="text"
        name="productOwnerName"
        value={editFormData.productOwnerName}
        placeholder="Enter the name of the product owner"
        required
        onChange={handleEditFormChange}
      />
    </td>
    <td>
      <input
        type="text"
        name="Developers"
        value={editFormData.Developers}
        placeholder="Enter the names of the developers"
        required
        onChange={handleEditFormChange}
      />
    </td>
    <td>
      <input
        type="text"
        name="startDate"
        value={editFormData.startDate}
        placeholder="Enter the start date of the product"
        required
        onChange={handleEditFormChange}
      />
    </td>
    <td>
      <input
        type="text"
        name="methodology"
        value={editFormData.methodology}
        placeholder="Enter the methodology"
        required
        onChange={handleEditFormChange}
      />
    </td>
    <td>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
  </tr>
}

export default EditableRow;
