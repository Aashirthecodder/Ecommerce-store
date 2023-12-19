import React from "react";
import { useForm } from "react-hook-form";

import { checkUserAsync, selectError, selectLoggedInUser } from "../authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const user = useSelector(selectLoggedInUser);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();


  const selectedRole = watch("role");
  return (
    <>
      {/* {user && <Navigate to="/" replace={true}></Navigate>} */}
      <div>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              noValidate
              onSubmit={handleSubmit(async(data) => {
                
debugger;
                const actionResult = await dispatch(checkUserAsync({ email: data.email, password: data.password,role: data.role }, navigate));
                console.log(actionResult);
                if(actionResult.payload){
                  navigate(`/${data.role === 'seller' ? 'sellerpage' : 'homePage'}`);
                }
              })}
              className="space-y-6"
              action="#"
              method="POST"
            >
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    {...register("email", {
                      required: "email is required",
                      pattern: { value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi, message: "email not valid" },
                    })}
                    type="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    {...register("password", {
                      required: "password is required",
                    })}
                    type="password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                </div>
                {error && <p className="text-red-500">{errors.message}</p>}
              </div>
               <div>
        <label className="block text-sm font-medium leading-6 text-gray-900"> Choose your Role</label>
        <div className="mt-2">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="seller"
              {...register("role", { required: "Role is required" })}
              className="form-radio text-indigo-600"
            />
            <span className="ml-2">Sign up as Seller</span>
          </label>
          <label className="inline-flex items-center ml-6">
            <input
              type="radio"
              value="buyer"
              {...register("role", { required: "Role is required" })}
              className="form-radio text-indigo-600"
            />
            <span className="ml-2">Sign up as Buyer</span>
          </label>
        </div>
        {errors.role && <p className="text-red-500">{errors.role.message}</p>}
      </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{" "}
              <Link to="/Signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Create an Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
