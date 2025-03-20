import axios from 'axios';
import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

import dayjs from "dayjs";
import { useState } from 'react';

export default function Register() {

   const [mesage, setMesage] = useState("")
  const navigate = useNavigate()

  async function register (value:any) {
    try {
      // console.log(value);
      
      let x = await axios.post("https://linked-posts.routemisr.com/users/signup" ,  value )
      setMesage(  x.data.message);
    
    //    localStorage.setItem( "token" , x.data.token) ;
      navigate("/login")
      // console.log("done");
      
      
    } catch (error) {
      // console.log(error);
      
    }
  }


  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword:'' ,
      dateOfBirth: '',
      gender: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
        email: Yup.string()
        .email("inValid Email")
        .required('Required'),

        password: Yup.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "must start with capital letter and have a special letter and number").required('Required'),

        rePassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match') ,

        dateOfBirth:  Yup.date()
        .typeError("Invalid date format")
        .max(new Date(), "Birthday cannot be in the future")
        .test("age", "You must be at least 18 years old", (value) => {
          return dayjs().diff(dayjs(value), "year") >= 18;
        })
        .required("Birthday is required"),
        gender: Yup.string().required('Required')

    }),
    onSubmit: values => {
      // console.log(JSON.stringify(values))
      register (values)
    },
 })




  return (
    <>
   
<div className="w-full py-2">
{
        mesage ? <h2 className="bg-blue-500 text-white text-lg font-bold p-2">{mesage}</h2> : ""
    }
</div>
  
<form className='w-[90%] p-6 my-10 mx-auto' onSubmit={formik.handleSubmit} >
  <div className=" gap-6 mb-6 ">
  
    <div>
      <label htmlFor="name" className="block mb-2 text-sm  text-blue-400 font-bold ">First name</label>
      <input type="text" id="name"  onBlur={formik.handleBlur}  onChange={formik.handleChange} value={formik.values.name} className="bg-gray-50 border  dark:bg-slate-500 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 "  required />
      {formik.touched.name && formik.errors.name ? (<div className='bg-red-400 text-white p-2 rounded-md mt-2'>{formik.errors.name}</div>) : null}
    </div>


    <div className='mt-2'>
      <label htmlFor="email" className="block mb-2 text-sm  text-blue-400 font-bold">Email</label>
      <input type="email" id="email" onBlur={formik.handleBlur}  onChange={formik.handleChange} value={formik.values.email} className="bg-gray-50 border  dark:bg-slate-500 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 "  required />
      {formik.touched.email && formik.errors.email ? (<div className='bg-red-400 text-white p-2 rounded-md mt-2'>{formik.errors.email}</div>) : null}
    </div>
  
    <div className="mt-2">
    <label htmlFor="password" className="block mb-2 text-sm  text-blue-400 font-bold">Password</label>
    <input type="password" id="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} className="bg-gray-50  dark:bg-slate-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 "  required />
    {formik.touched.password && formik.errors.password ? (<div className='bg-red-400 text-white p-2 rounded-md mt-2'>{formik.errors.password}</div>) : null}
  </div> 

  <div className="mt-2">
    <label htmlFor="rePassword" className="block mb-2 text-sm  text-blue-400 font-bold">Repassword</label>
    <input type="Password" id="rePassword" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} className="bg-gray-50  dark:bg-slate-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 "  required />
    {formik.touched.rePassword && formik.errors.rePassword ? (<div className='bg-red-400 text-white p-2 rounded-md mt-2'>{formik.errors.rePassword}</div>) : null}
  </div> 

    <div className='my-3'>
      <label htmlFor="gender" className="block mb-2 text-sm  text-blue-400 font-bold">gender</label>
      {/* <input type="" id="gender" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.gender} className="bg-gray-50  dark:bg-slate-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 "  required /> */}

<div className="flex w-full justify-between my-5">
  <div className="flex items-center w-[40%] ps-4 border border-gray-200 rounded-sm dark:border-gray-700">
    <input  type="radio" id="my-gender" onBlur={formik.handleBlur}  onChange={formik.handleChange}  name="gender" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" value="male" />
    <label htmlFor="my-gender" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">male</label>
  </div>
  <div className="flex items-center w-[40%] ps-4 border border-gray-200 rounded-sm dark:border-gray-700">
    <input  id="my-gender2" type="radio" onBlur={formik.handleBlur}  onChange={formik.handleChange} name="gender" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" value="female" />
    <label htmlFor="my-gender2" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">female</label>
  </div>
</div>

      {formik.touched.gender && formik.errors.gender ? (<div className='bg-red-400 text-white p-2 rounded-md mt-2'>{formik.errors.gender}</div>) : null}

    </div>


  </div>
 

  <div className="mb-6">
    <label htmlFor="dateOfBirth" className="block mb-2 text-sm  text-blue-400 font-bold ">date of birthday</label>
    <input type="date" id="dateOfBirth" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.dateOfBirth} className="bg-gray-50  dark:bg-slate-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 "  required />
    {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (<div className='bg-red-400 text-white p-2 rounded-md mt-2'>{formik.errors.dateOfBirth}</div>) : null}
  </div> 

  <button type="submit" className="text-white font-bold bg-blue-400 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:cursor-pointer ">Submit</button>
</form>



    
    </>
  )
}

