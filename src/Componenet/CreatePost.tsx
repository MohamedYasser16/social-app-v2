import {  useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import imageCompression from 'browser-image-compression';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function CreatePost() {

    const [postBody, setPostBody] = useState({})

    let formik = useFormik( {
        initialValues:{
          body:"" ,
          image : null
        } , 
        validationSchema: Yup.object().shape({
          body: Yup.string().min(1,"min letter is 1").required("required")

        }),
        onSubmit(values) {
         
            const formData = new FormData();
            formData.append("body", values.body);
            formData.append("image", values?.image);
        
            uploadPost(formData);
         
        },
    } )


let navigate = useNavigate()


    async function uploadPost(formData:any) {

        try {
            const response = await axios.post(
                'https://linked-posts.routemisr.com/posts',
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        token: localStorage.getItem("token"),
                    },
                }
            );
            // console.log("Response Data:", response.data);
             
            if (response.data.message == "success" ) {
              toast.success('Successfully created!');

                navigate(`/myProfile`)
            }


        } catch (error) {
            console.error("error : ", error?.response?.data || error.message || error );
            toast.error(`${error?.response?.data || error.message || error}`);

        }
    }


    async function handleFileUpload(event) {
      //  console.log(event);
       
        const file = event.target.files[0];
    
        const options = {
            maxSizeMB: 1, // Maximum size in MB
            maxWidthOrHeight: 1024, // Resize to max width/height
            useWebWorker: true,
        };
    
        try {
            const compressedFile = await imageCompression(file, options);
            // console.log("Compressed File:", compressedFile); // Debugging compressed file
            formik.setFieldValue("image", compressedFile);

        } catch (error) {
            // console.error("Compression error:", error);
        }
    }

  return (
    <>
  <div className="my-9 h-[80vh] flex items-center">
  
  <form onSubmit={formik.handleSubmit} className="w-[75%] mx-auto">
  <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your post</label>
  <textarea id="body" name="body" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.body} rows={5} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="what's on your mind . . ." defaultValue={""} />

<div className="mt-4">
  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="user_avatar">Upload file</label>
 



  {/* <input id="image" name="image" type="file" onChange={(event) => {
                    formik.setFieldValue("image", event.currentTarget.files[0]);
                  }} className="form-control" /> */}


<input
            id="image"
            name="image"
            type="file"
            accept="image/*"

            onChange={handleFileUpload}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          />
 
 </div>

<button type="submit" className="text-white my-6 bg-gray-700 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Upload the post</button>

</form>
  </div>

    
    </>
  )
}
