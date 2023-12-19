import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./seller.css"; // Import a separate CSS file for styling
import { selectLoggedInUser } from "../features/auth/authSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function App() {
  const [products, setProducts] = useState(null);
  const [createForm, setCreateForm] = useState({
    title: "",
    description: "",
    price: "",
    images: null,
    userId:""
  });

  const getUserDataFromLocalStorage = () => {
    const userDataString = localStorage.getItem('userData');
    return userDataString ? JSON.parse(userDataString) : null;
  };

  // Get user data from local sto
  // const userId = getUserDataFromLocalStorage();

  const fetchProducts = async () => {
    const userId = localStorage.getItem('userData');
    const res = await axios.get("http://localhost:5000/prodbyid/"+userId);
    setProducts(res.data.products);

    // console.log(res.data.products)
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  




  const updateCreateFormField = (e) => {
    const { name, value } = e.target;
    const newValue = e.target.type === "file" ? e.target.files[0] : value;
  
    setCreateForm({
      ...createForm,
      [name]: newValue,
    });
  };

  const createNote = async (e) => {
    debugger;
    e.preventDefault();
    const userId = localStorage.getItem("userData");
    createForm.userId = userId;
  
    if (
      !createForm.title ||
      !createForm.description ||
      !createForm.price ||
      !createForm.images
    ) {
      alert("All fields are required!");
      return;
    }
  
    const formData = new FormData();
    formData.append("title", createForm.title);
    formData.append("description", createForm.description);
    formData.append("price", createForm.price);
    formData.append("images", createForm.images);
    formData.append("userId", createForm.userId);
  
    try {
      const res = await axios.post("http://localhost:5000/products", formData);
      setProducts([...products, res.data.product]);
      setCreateForm({ title: "", description: "", price: "", images: null });

  
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  console.log(products)

  const handleLogout=()=>{
    localStorage.clear()
  }

  const user = useSelector(selectLoggedInUser);

  

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-white bg-dark">
        <div className="container-fluid">
          <span style={{color:"white"}} className="navbar-brand mx-auto">Seller Panel</span>
          <Link to="/">
          <button onClick={()=>handleLogout()} className="btn btn-primary">Log out</button>
          </Link>
        </div>
      </nav>
    <div className="app-container">
  <div className="add-products-container">
    <h2 className="mb-4" >  <strong>  Add Products</strong></h2>
    <form onSubmit={createNote}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          value={createForm.title}
          onChange={updateCreateFormField}
          placeholder="Title"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <input
          type="text"
          className="form-control"
          id="description"
          name="description"
          value={createForm.description}
          onChange={updateCreateFormField}
          placeholder="Description"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="price" className="form-label">Price</label>
        <input
          type="text"
          className="form-control"
          id="price"
          name="price"
          value={createForm.price}
          onChange={updateCreateFormField}
          placeholder="Price"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="images" className="form-label">Images</label>
        <input
          type="file"
          className="form-control"
          id="images"
          name="images"
          onChange={updateCreateFormField}
          placeholder="Images"
          required
        />
      </div>

      <button style={{color:"black"}} className="btn btn-primary" type="submit">Add Product</button>
    </form>
  </div>
</div>
<div className="container">
  <h2 className="mb-4"> <strong>Added Products</strong></h2>

  <div className="row row-cols-1 row-cols-md-3 g-4">
    {products &&
      products.map((product) => (
        <div style={{marginBottom:'30px',width:"25%"}} key={product._id} className="col">
          <div className="card h-100">
            <img src={`http://localhost:5000/uploads/${product.images}`} className="card-img-top" alt="Product Image" />
            <div className="card-body">
              <h5 className="card-title">Title:{product.title}</h5>
              <p className="card-text">Description:{product.description}</p>
              <p className="card-text">Price: ${product.price}</p>
            </div>
          </div>
        </div>
      ))}
  </div>
</div>
 
  </>
  );
}

export default App;