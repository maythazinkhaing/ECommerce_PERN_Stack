import React, { useState } from "react";

function ProductForm() {
  const [category_id, setCategoryId] = useState("");
  const [product_name, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [qty_instock, setQtyInStock] = useState("");
  const [feature, setFeature] = useState(false);
  const [imageFile, setImageFile] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("category_id", category_id);
      formData.append("product_name", product_name);
      formData.append("description", description);
      formData.append("qty_instock", qty_instock);
      formData.append("picture", imageFile);
      formData.append("feature", feature);
      console.log(imageFile);
      const response = await fetch("http://localhost:3001/products/add", {
        method: "POST",
        body: formData,
      });

      if (response.status === 200) {
        alert("Product added successfully");
      } else {
        alert("Error adding product");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  return (
    <div>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Category ID:</label>
          <input
            type="text"
            value={category_id}
            onChange={(e) => setCategoryId(e.target.value)}
          />
        </div>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            value={product_name}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Quantity in Stock:</label>
          <input
            type="text"
            value={qty_instock}
            onChange={(e) => setQtyInStock(e.target.value)}
          />
        </div>
        <div>
          <label>Feature:</label>
          <input
            type="checkbox"
            checked={feature}
            onChange={(e) => setFeature(e.target.checked)}
          />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" name="picture" onChange={handleImageChange} />
        </div>
        <div>
          <button type="submit">Add Product</button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
