import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  const isUrlInvalid = () => {
    return (
      values.imageUrl.trim().length > 0 &&
      !(
        values.imageUrl.startsWith("http://") ||
        values.imageUrl.startsWith("https://")
      )
    );
  };

  const isNameInvalid = () => {
    return values.name.trim().length >= 1 && values.name.trim().length <= 1;
  };

  const isFormValid = () => {
    const isNameValid =
      values.name.trim().length >= 2 && values.name.trim().length <= 30;

    const isUrlValid =
      values.imageUrl.trim().length > 0 &&
      (values.imageUrl.startsWith("http://") ||
        values.imageUrl.startsWith("https://"));

    const isWeatherSelected = values.weatherType !== "";

    return isNameValid && isUrlValid && isWeatherSelected;
  };

  const defaultValues = {
    name: "",
    imageUrl: "",
    weatherType: "",
  };
  const { values, handleChange, resetForm } = useForm(defaultValues);
  function handleSubmit(evt) {
    evt.preventDefault();
    onAddItem(values);
    resetForm();
  }

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      name="add-garment"
      title="New garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Add garment"
      isFormValid={isFormValid()}
    >
      <label
        className={`modal__label ${
          isNameInvalid() ? "modal__label_error" : ""
        }`}
      >
        Name
        {isNameInvalid() && (
          <span className="modal__error modal__error_visible">
            Please enter a valid name
          </span>
        )}
        <input
          required
          name="name"
          id="clothing-name"
          type="text"
          className={`modal__input ${
            isNameInvalid() ? "modal__input_error" : ""
          }`}
          placeholder="Name"
          minLength="2"
          maxLength="30"
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label
        className={`modal__label ${isUrlInvalid() ? "modal__label_error" : ""}`}
      >
        Image URL
        {isUrlInvalid() && (
          <span className="modal__error modal__error_visible">
            Please enter a valid URL
          </span>
        )}
        <input
          required
          id="imageUrl"
          name="imageUrl"
          type="url"
          className={`modal__input ${
            isUrlInvalid() ? "modal__input_error" : ""
          }`}
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleChange}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label className="modal__label modal__label_type_radio">
          <input
            required
            type="radio"
            name="weatherType"
            className="modal__radio-input"
            id="weatherType-hot"
            value="hot"
            onChange={handleChange}
            checked={values.weatherType === "hot"}
          />
          Hot
        </label>
        <label className="modal__label modal__label_type_radio">
          <input
            required
            type="radio"
            name="weatherType"
            className="modal__radio-input"
            id="weatherType-warm"
            value="warm"
            onChange={handleChange}
            checked={values.weatherType === "warm"}
          />
          Warm
        </label>
        <label className="modal__label modal__label_type_radio">
          <input
            required
            type="radio"
            name="weatherType"
            className="modal__radio-input"
            id="weatherType-cold"
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
