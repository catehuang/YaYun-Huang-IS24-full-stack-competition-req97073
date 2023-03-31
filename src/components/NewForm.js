import React from "react";

function NewForm({
  newFormData,
  handleAddFormChange,
  handleAddClick,
  handleClearClick,
}) {
  return (
    <tr>
      <td></td>
      <td>
        <input
          size="12"
          type="text"
          name="productName"
          value={newFormData.productName}
          placeholder="Product name"
          required
          onChange={handleAddFormChange}
        />
      </td>
      <td>
        <input
          type="text"
          size="12"
          name="scrumMasterName"
          value={newFormData.scrumMasterName}
          placeholder="Scrum Master"
          required
          onChange={handleAddFormChange}
        />
      </td>
      <td>
        <input
          size="12"
          name="productOwnerName"
          value={newFormData.productOwnerName}
          placeholder="Product owner"
          required
          onChange={handleAddFormChange}
        />
      </td>
      <td>
        <input
          size="30"
          name="Developers"
          value={newFormData.Developers}
          placeholder="Developers (up tp 5)"
          required
          onChange={handleAddFormChange}
        />
      </td>
      <td>
        <input
          type="text"
          size="10"
          name="startDate"
          value={newFormData.startDate}
          placeholder="YYYY/MM/DD"
          required
          onChange={handleAddFormChange}
        />
      </td>
      <td>
        <select name="methodology" onChange={handleAddFormChange}>
          <option value="Waterfall">Waterfall</option>
          <option value="Agile">Agile</option>
        </select>
      </td>
      <td className="d-flex justify-content-between">
        <button
          className="btn btn-outline-primary px-2 mr-2"
          type="button"
          onClick={handleAddClick}
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
          className="btn btn-outline-danger px-2"
          type="button"
          onClick={handleClearClick}
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

export default NewForm;
