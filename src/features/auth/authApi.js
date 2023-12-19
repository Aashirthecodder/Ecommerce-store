// A mock function to mimic making an async request for data
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

export function createUser(userData) {


  return new Promise(async (resolve) => {


    const response = await fetch("http://localhost:5000/signup/", {
      method: "POST",
      body: JSON.stringify(userData),

      headers: { "content-type": "application/json" },
    });
    

    const data = await response.json();
    resolve({ data });
  });
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/users/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),

      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    const { email, password, role } = loginInfo;

    try {
      const response = await axios.post("http://localhost:5000/login/", {
        email: email,
        password: password,
        role: role,
      });

      localStorage.setItem('userData', response.data.userId);
      resolve({ data: response.data });

    } catch (error) {
      alert('wrong Credentials')
      reject({ message: "Wrong credentials or user not found" });
    
    }
  });
}
