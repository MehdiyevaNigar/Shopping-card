import { useState } from "react";
import "./Create.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Create = () => {
  const history = useHistory();
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    details: "",
    price: 0,
    featured: true,
    image: null,
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    details: "",
    price: "",
  });
  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.name) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (!formData.details) {
      errors.details = "Details are required";
      isValid = false;
    }

    if (!formData.price || isNaN(formData.price)) {
      errors.price = "Price must be a valid number";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      featured: event.target.checked,
    }));
  };

  const handleImage = (event) => {
    const uploadedImage = event.target.files[0];

    if (uploadedImage) {
      setFormData((prev) => ({
        ...prev,
        image: uploadedImage,
      }));
      const reader = new FileReader();
      reader.readAsDataURL(uploadedImage);
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      const data = new FormData();
    } else {
      console.log("Form has validation errors");
    }
    const data = new FormData();
    data.append("name", formData.name);
    data.append("details", formData.details);
    data.append("price", Number(formData.price));
    data.append("featured", formData.featured);
    data.append("productImage", formData.image);

    axios
      .post("/api/products", data)
      .then(() => history.push("/"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="create">
      <form onSubmit={handleSubmit} className="form">
        <h1>Create new product</h1>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input
            value={formData.name}
            onChange={handleChange}
            type="text"
            id="name"
            name="name"
          />
          {formErrors.name && <p className="error">{formErrors.name}</p>}
        </div>
        <div className="form-control">
          <label htmlFor="details">Details</label>
          <textarea
            onChange={handleChange}
            value={formData.details}
            name="details"
            id="details"
            cols="30"
            rows="10"
          ></textarea>
          {formErrors.details && <p className="error">{formErrors.details}</p>}
        </div>
        <div className="form-control">
          <label htmlFor="price">Price</label>
          <input
            onChange={handleChange}
            value={formData.number}
            type="number"
            id="price"
            name="price"
          />
          {formErrors.price && <p className="error">{formErrors.price}</p>}
        </div>
        <div className="form-control">
          <label htmlFor="featured">Featured ?</label>
          <input
            onChange={handleCheckboxChange}
            defaultChecked={formData.featured}
            type="checkbox"
            id="featured"
            name="featured"
          />
        </div>
        <div className="form-control">
          <label htmlFor="image">Upload image</label>
          <input onChange={handleImage} type="file" id="image" name="image" />
        </div>
        {imagePreview && (
          <img width="200px" height="200px" src={imagePreview} alt="preview" />
        )}
        <div className="btn-container">
          <Link to="/" className="btn secondary" type="button">
            Cancel
          </Link>
          <button className="btn primary" type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
