import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { hideInputError } from "../../utils/Validation";

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  const defaultValues = {
    name: "",
    imageUrl: "",
    weatherType: "",
  };
  const { values, handleChange, resetForm } = useForm(
    defaultValues,
    hideInputError
  );
  function handleSubmit(evt) {
    evt.preventDefault();
    onAddItem(values);
    resetForm();
  }

  return (
    <ModalWithForm
      name="add-garment"
      title="New garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Add garment"
    >
      <label className="modal__label">
        Name
        <input
          required
          name="name"
          id="clothing-name"
          type="text"
          className="modal__input modal__input_error"
          placeholder="Name"
          minLength="2"
          maxLength="30"
          value={values.name}
          onChange={handleChange}
        />
        <span className="modal__error" id="clothing-name-error" />
      </label>
      <label className="modal__label">
        Image URL
        <input
          required
          id="imageUrl"
          name="imageUrl"
          type="url"
          className="modal__input modal__input_error"
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleChange}
        />
        <span className="modal__error" id="imageUrl-error" />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            required
            type="radio"
            name="weatherType"
            className="modal__radio-input"
            id="hot"
            value="hot"
            onChange={handleChange}
            checked={values.weatherType === "hot"}
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            required
            type="radio"
            name="weatherType"
            className="modal__radio-input"
            id="warm"
            value="warm"
            onChange={handleChange}
            checked={values.weatherType === "warm"}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            required
            type="radio"
            name="weatherType"
            className="modal__radio-input"
            id="cold"
            value="cold"
            onChange={handleChange}
            checked={values.weatherType === "cold"}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
