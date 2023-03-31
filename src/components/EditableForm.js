import React from "react";

function EditableForm({
  product,
  editableFormData,
  handleEditFormChange,
  handleSaveClick,
  handleCancelClick,
}) {
  return (
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
        <select name="methodology" onChange={handleEditFormChange}>
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
  );
}

export default EditableForm;
