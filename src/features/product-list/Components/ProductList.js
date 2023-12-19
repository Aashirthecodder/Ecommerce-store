import React, { useState, useEffect, Fragment } from "react";
import axios from "axios"
import { useSelector, useDispatch } from "react-redux";
import {
 fetchBrandsAsync,
  fetchCategoriesAsync,
  fetchProductsByFilterAsync,
  selectBrands,
  selectCategories,
  selectTotalItems,
} from "../productListSlice";
import { Link } from "react-router-dom";
import { Dialog, Disclosure,Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { MinusIcon, PlusIcon,  } from "@heroicons/react/20/solid";


const sortOptions = [
  { name: "Best Rating", sort: "rating", rder: "desc,", current: false },

  { name: "Price: Low to High", sort: "price", order: "asc,", current: false },
  { name: "Price: High to Low", sort: "price", order: "desc,", current: false },
];



export default function ProductList() {
  const [products, setProducts] = useState([]);
  // const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  // const products = useSelector(selectAllProducts);
  const totalItems = useSelector(selectTotalItems);
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const filters = [
    {
      id: "brands",
      name: "brands",
      options: brands,
    },
    {
      id: "category",
      name: "Category",
      options: categories,
    },
  ];

  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const [page, setPage] = useState(1);

  // const handleFilter = (e, section, option) => {
  //   const newFilter = { ...filter };
  //   if (e.target.checked) {
  //     if (newFilter[section.id]) {
  //       newFilter[section.id].push(option.value);
  //     } else {
  //       newFilter[section.id] = [option.value];
  //     }
  //   } else {
  //     const index = newFilter[section.id].findIndex((el) => el === option.value);
  //     newFilter[section.id].splice(index, 1);
  //   }
  

  //   setFilter(newFilter);


  // };

  const handleSort = (e, option) => {
    const sort = { _sort: option.sort, _order: option.order };

    setSort(sort);
  };

  const handlePage = (page) => {

    setPage(page);
  };



  useEffect(() => {
    dispatch(fetchBrandsAsync());
    dispatch(fetchCategoriesAsync());
  }, []);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/products");
        setProducts(res.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
        // Handle the error, e.g., set an error state or show a message to the user
      }
    };
  
    fetchProducts(); // Call the function immediately
  
    // Note: Removed [fetchProducts] from the dependency array
  }, []);
  

  return (
    <div>
      <div>
        <div className="bg-white">
          <div>
            {/* Mobile filter dialog */}
            <MobileFilter
              mobileFiltersOpen={mobileFiltersOpen}
              setMobileFiltersOpen={setMobileFiltersOpen}
              // handleFilter={handleFilter}
              filters={filters}
            ></MobileFilter>

            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">All Products</h1>

             
              </div>

              <section aria-labelledby="products-heading" className="pb-24 pt-6">
                <h2 id="products-heading" className="sr-only">
                  Products
                </h2>

                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
                  {/* Filters */}
                  <DesktopFilter  filters={filters}></DesktopFilter>

                  {/* Product grid */}
                  <div className="lg:col-span-3">
                    {/* this is our product list */}
                    <ProductGrid products={products}></ProductGrid>
                  </div>
                </div>
              </section>

              {/* section of products and filters end here */}

              {/* <Pagination setPage={setPage} totalItems={totalItems} page={page} handlePage={handlePage}></Pagination> */}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileFilter({ mobileFiltersOpen, setMobileFiltersOpen, handleFilter, filters }) {
  return (
    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
      <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                {filters.map((section) => (
                  <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-6">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  onChange={(e) => handleFilter(e, section, option)}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                  className="ml-3 min-w-0 flex-1 text-gray-500"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

function DesktopFilter({  filters }) {
  return (
    <></>
 
  );
}

function ProductGrid({ products }) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Link to={`/ProductDetails/${product._id}`} key={product.id}>
              <div key={product._id} className="group relative border-solid border-2 p-2 border-gray-200">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={`http://localhost:5000/uploads/${product.images}`}
                    alt={product.title}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <div href={product.images}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.title}
                      </div>
                    </h3>
                    {/* <p className="mt-1 text-sm text-gray-500">
                      <StarIcon className="inline w-6 h-6"> </StarIcon>
                      <span className="align-bottom"> {product.rating}</span>
                    </p> */}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                    ${product.price}
                    </p>
                    {/* <p className="text-sm font-medium line-through text-gray-900">${product.price}</p> */}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
