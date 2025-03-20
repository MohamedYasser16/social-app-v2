import React, { useState } from 'react'
import axios from 'axios';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

export default function Login() {

   let navigate = useNavigate()

  // let [ email , setEmail  ] = useState("")
  let [ error , setErorr  ] = useState("")

  async function register (value:any) {
    try {
      // console.log(value);
      
      let x = await axios.post("https://linked-posts.routemisr.com/users/signin" ,  value )
      // console.log("token in login" , x.data.token);
      localStorage.setItem("token" , `${x.data.token}`)
      setErorr("")
      toast.success('Successfully registered !');

      navigate("/")
      
    } catch (error) {
      // console.log(error.response.data.error);
      setErorr(error.response.data.error);
      localStorage.removeItem("token")
      // console.log("delete token from local storage");
      
    }
  }


  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
        email: Yup.string()
        .email("inValid Email")
        .required('Required'),
        password: Yup.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "must start with capital letter and have a special letter and number").required('Required'),
    
    }),
    onSubmit: values => {
      console.log(JSON.stringify(values))
      localStorage.setItem("email" , values.email )
      register (values)
    },
 })


  return (
    <>
   
  {
    error ? <h2 className="text-red-50 bg-red-500 py-2 font-semibold text-center" >{error}</h2> : ""
  }
   
<form className='w-[95%] p-9 my-11 mx-auto' onSubmit={formik.handleSubmit} >
<div className="h-[80vh] flex flex-col justify-center items-center ">

<div className=" gap-6 mb-6 w-full ">

<div className="mt-2 ">
  <label htmlFor="email" className="block mb-2 text-sm  text-blue-400 font-bold ">Email</label>
  <input type="email" id="email" onBlur={formik.handleBlur}  onChange={formik.handleChange} value={formik.values.email} className="bg-gray-50  dark:bg-slate-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "  required />
  {formik.touched.email && formik.errors.email ? (<div className='bg-red-400 text-white p-2 rounded-md mt-2'>{formik.errors.email}</div>) : null}
</div>

</div>

<div className="mb-4 w-full">
<label htmlFor="password" className="block mb-2 text-sm  text-blue-400 font-bold ">Password</label>
<input type="password" id="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} className="bg-gray-50 dark:bg-slate-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "  required />
{formik.touched.password && formik.errors.password ? (<div className='bg-red-400 text-white p-2 rounded-md mt-2'>{formik.errors.password}</div>) : null}
</div> 

<div className="flex flex-col items-start mb-6 w-full">
<div className="flex items-center">
<Link to={"/register"} className='text-md text-blue-400 hover:text-blue-500 font-semibold mb-2 me-2' > Register ? </Link>
{/* <Link to={"/forget"} className='text-md text-blue-400 hover:text-blue-500 font-semibold mb-2' >forget password ? </Link> */}

</div>
<button type="submit" className="text-white mt-2 font-bold bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Submit</button>

</div>

</div>
</form>


    
    </>
  )
}

