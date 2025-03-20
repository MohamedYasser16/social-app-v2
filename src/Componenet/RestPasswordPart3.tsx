import { useFormik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Loading from '../Componenet/Loading'
import * as Yup from 'yup';
import axios from 'axios';


export default function RestPasswordPart3() {

  let navigate = useNavigate()


    if ( !localStorage.getItem("token") ) {
      navigate("/login")
    }



  let [message, setMessage] = useState("")
  let [error, setError] = useState("")
  let [loading, setLoading] = useState(false)


  let [formValue, setFormValue] = useState({})

  let { password, newPassword } = formValue

  let formik = useFormik({
    initialValues: {
      password: "",
      newPassword: ""
    }
    , onSubmit: values => {
      // console.log(JSON.stringify(values));
      setFormValue(values)
    },
    validationSchema: Yup.object({
       password: Yup.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "must start with capital letter and have a special letter and number").required('Required'),
       newPassword: Yup
       .string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "must start with capital letter and have a special letter and number").required('Required'),
       
    })
  })

  let first = useRef(false)
  function changeFirst() {
    first.current = true
  }

  
  /////////////////////   func to change pass   call in use effect

// console.log(localStorage.getItem("token"));

  // let navigate = useNavigate()

  let changePass = async ()=>{

    try {

      setLoading(true)
      let {data} = await axios.patch("https://linked-posts.routemisr.com/users/change-password" , {
        password  ,
        newPassword
      } , {
        headers : {
          token : localStorage.getItem("token")
        }
      } )

      // console.log(data);

      if (data.token) {
        setMessage("data.success")
        navigate("/login")
      }
      
      setError(false)
      setLoading(false)

    } catch (error) {

      // setError(true)
      // console.log(error.response);
      // setMessage(error.response.data.message);
      // setLoading(false)
    }
  }

  useEffect(() => {

    if (first.current) {
      // console.log(password);
      // console.log(newPassword);
      changePass()
    }
    else {

      changeFirst()
    }

  }, [password , newPassword])






  // if (loading) {
  //   return <Loading  isloading={!loading} />
  // }

  return (
    <>
      {
        error && message ? <div className="bg-red-500 text-white text-xl font-semibold p-2 text-center mt-1">{message}</div> : " "
      }
      {
        !error && message ? <div className="bg-sky-400 text-white text-xl font-semibold p-2 text-center mt-1">{message}</div> : " "
      }

      <form onSubmit={formik.handleSubmit}>
        <div className=" h-[75vh] flex justify-center items-center">
          <div className="w-[80%] mx-auto flex flex-col items-start">

            <h2 className="text-sky-400 text-xl font-bold mb-3 ">new password</h2>
            <div className="mb-2 w-full">

              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">password </label>
              <input name="password" id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} onInput={() => {
                setMessage("")
              }} className="w-[100%] mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500" placeholder="Enter Your password" />
              <div className={`w-full mt-2 rounded-lg text-white font-bold ${formik.errors.password && formik.touched.password ? " bg-red-600 p-3 mb-3 " : " "} `}>
                {formik.touched.password && formik.errors.password ? formik.errors.password : ""}
              </div>

              {/* ///////////////// */}

              <label htmlFor="RestPass" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">confirm New Password</label>
              <input type='password' name="newPassword" id="RestPass" value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} onInput={() => {
                setMessage("")
              }} className="w-[100%] mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500" placeholder="Enter Your New password" />
              <div className={`w-full mt-2 rounded-lg text-white font-bold ${ formik.errors.newPassword && formik.touched.newPassword  ? " bg-red-600 p-3 " : " " } `}>
                { formik.touched.newPassword && formik.errors.newPassword ? formik.errors.newPassword : "" }
              </div>

            </div>

            <button type="submit" className="w-[12.8%] px-6- text-white font-bold bg-sky-500 hover:bg-sky-600 duration-500 focus:ring-4 focus:outline-none focus:ring-sky-300 mt-2 rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800">Submit</button>
          </div>
        </div>
      </form>

    </>
  )
}
