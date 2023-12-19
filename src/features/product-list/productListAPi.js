// A mock function to mimic making an async request for data
export default function fetchAllProducts() {
  return new Promise(async (resolve) => {

    const res = await fetch("http://localhost:5000/products");
    const data = await res.json();

    resolve({ data });
  });
}

export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const res = await fetch("http://localhost:8080/products/" + id);
    const data = await res.json();
    resolve({ data });
  });
}

export function fetchProductsByFilter(filter, sort, pagination) {
  //pagination ={_page:1_limit=10}
  //filter ={"category":["smartphones","laptops"]
  //sort ={sort:["price",_order="desc"]

  let queryString = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];

      queryString += `${key}=${lastCategoryValue}&`;
    }
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  return new Promise(async (resolve) => {
    const res = await fetch("http://localhost:8080/products?" + queryString);
    const data = await res.json();
    const totalItems = await res.headers.get("X-Total-Count");
    resolve({ data: { products: data, totalItems: +totalItems } });
  });
}

export function fetchCategories() {
  return new Promise(async (resolve) => {
    const res = await fetch("http://localhost:8080/categories");
    const data = await res.json();
    resolve({ data });
  });
}

export function fetchBrands() {
  return new Promise(async (resolve) => {
    const res = await fetch("http://localhost:8080/brands");
    const data = await res.json();
    resolve({ data });
  });
}
