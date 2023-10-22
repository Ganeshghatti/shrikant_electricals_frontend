import React, { useState } from "react";
import axios from "axios";
import "./Form.scss";

const Form = () => {
  // const handleImageSelection = (e) => {
  //   const selectedImage = e.target.files[0];
  //   const name = e.target.name;
  //   setImageData({ ...imageData, [name]: selectedImage });
  // };

  const [base64Image, setBase64Image] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      encodeImageToBase64(file);
    }
  };

  const encodeImageToBase64 = (image) => {
    const reader = new FileReader();
    reader.onload = () => {
      setBase64Image(reader.result);
    };
    reader.readAsDataURL(image);
  };
  console.log(base64Image);
  return (
    <section id="form">
      <form>
        {/* <div>
          <label>Radio Choose:</label>
          <input
            type="radio"
            name="radioChoose"
            value="LT4"
            checked={formData.radioChoose === "LT4"}
            onChange={handleInputChange}
          />
          LT4
          <input
            type="radio"
            name="radioChoose"
            value="LT5"
            checked={formData.radioChoose === "LT5"}
            onChange={handleInputChange}
          />
          LT5
        </div>
        <div>
          <label>Dropdown How much KW / HP:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="">Select an option</option>
            <option value="Graha balake">Graha balake</option>
            <option value="Vanijya balake">Vanijya balake</option>
            <option value="Uddime balake">Uddime balake</option>
            <option value="Krishi Balake">Krishi Balake</option>
          </select>
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Any Other Query:</label>
          <textarea
            name="query"
            value={formData.query}
            onChange={handleInputChange}
          />
        </div> */}
        <div>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          <button onClick={handleImageUpload}>Upload Images</button>
        </div>
      </form>
    </section>
  );
};

export default Form;
