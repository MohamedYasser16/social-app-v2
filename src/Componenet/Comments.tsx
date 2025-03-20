import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import personImg from "../assets/user-icon-png-27.jpg"
import { Avatar, Card, CardContent, CardHeader, CardMedia, IconButton, Skeleton, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useFormik } from 'formik'
import * as yup from 'yup';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import emptyList from "../assets/icons8-image-file.svg"
import 'animate.css';

export default function Comments() {

  const [HandelDis, setHandelDis] = useState<boolean>(false)

  const [idComment, setIdComment] = useState("")
  const [isUpDate, setIsUpDate] = useState<boolean>(false)


  let formik = useFormik<any>({
    initialValues: {
      content: "",
      // post: idCreate
    },
    validationSchema: yup.object().shape({
      content: yup.string().min(1).max(30).required(),
      // post : yup.string().min(1).required()
    }),
    onSubmit: (value) => {
      // console.log(value);
      // console.log(value.content);

      mutateCreate(value.content)
      setFlagCreate(true)
    }

  })

  let handelUpdate = async (value) => {
    setIsUpDate(false)
   await updateMutation(value.content)
   await posts()
    setFlagAppear("")
  }

  let formikUpdate = useFormik<any>({
    initialValues: {
      content: "",
      // post: idCreate
    },
    validationSchema: yup.object().shape({
      content: yup.string().min(1,"min letters is 1 ").max(30 , "max letters is 30 less the comment ").required("required !!"),
      // post : yup.string().min(1).required()
    }),
    onSubmit: (value) => {
   
    
      
      handelUpdate(value)
     

    }

  })

  const [seeMore, setSeeMore] = useState<number>(10)
  const [flagAppear, setFlagAppear] = useState<string>("")

  let more = () => {
    setSeeMore(seeMore + 10)
  }

  let { id } = useParams<string>()
  // console.log(id);

  let token = localStorage.getItem("token")


  const [errPosts, setErrPosts] = useState<string>("")
  const [loadingPosts, setLoadingPosts] = useState<boolean>(false)
  const [dataPosts, setDataPosts] = useState([])


  let handelDelete = async (x) => {

  //  console.log("handel delete");
   
    mutate(x)
    // console.log("delete called");
    
    setIdComment(x)
    setHandelDis(false)
  
 

    // console.log("handel deleteeeeeeeeeeeeeeee call posts ");
     
  }
    


  let posts = async () => {
// console.log("call comentssssssssssssssssssssssssssss");

    setLoadingPosts(true)
    try {

      let { data } = await axios.get(`https://linked-posts.routemisr.com/posts/${id}/comments`, { headers: { token: localStorage.getItem("token") } })

      // console.log("data after call post fun   ",data.comments);
      setDataPosts(data.comments);


    } catch (error) {

      // console.log(error);

    }
    finally {

      
      setLoadingPosts(false)
    }

  }




  let deleteMutation = async (id: string) => {

    return await axios.delete(`https://linked-posts.routemisr.com/comments/${idComment}`, {
      headers: {
        token: localStorage.getItem("token") || ""
      },
    }
    )
  }


  let CreteMutation = async (value: string) => {
    // console.log(`content ${value}  post  ${id}`);

    return await axios.post(`https://linked-posts.routemisr.com/comments`, {
      "content": `${value}`,
      "post": `${id}`
    }, {
      headers: {
        token: localStorage.getItem("token")
      },
    }
    )
  }


  let updateMutation = async (value: string) => {
    // console.log(`content ${value}  post  ${id}`);

    return await axios.put(`https://linked-posts.routemisr.com/comments/${idComment}`, { "content": `${value}` }
      , {
        headers: { token: localStorage.getItem("token") },
      }
    )
  }



  const { data: dataMutation, error: errorMutation, isPending, mutate } = useMutation({
    mutationFn: deleteMutation,
  })

  // console.log( "delete data message" , dataMutation?.data?.message );

  // console.log( "delete error message" , errorMutation );

  useEffect(() => {
  
    posts()
 
  }, [ dataMutation ])
  
  


  const { data: dataCommentsCreated, error: errorMutationCreate, isPending: createIsPending, mutate: mutateCreate } = useMutation({
    mutationFn: CreteMutation,

  })

  // console.log("create error " ,errorMutationCreate , "dataCommentsCreated" , dataCommentsCreated );
  

  const { data: dataCommentsUpdate, error: errorMutationUpdate, isPending: UpdateIsPending, mutate: mutateUpdate } = useMutation({
    mutationFn: updateMutation,

  })


  useEffect(() => {
    posts()
    // console.log(dataCommentsUpdate);

  }, [])


  


  interface CommentCreator {
    _id: string;
    name: string;
    photo: string;
  }

  interface Comment {
    _id: string;
    id: string;
    content: string;
    createdAt: string;
    post: string;
    commentCreator: CommentCreator;
  }



// if i create it will be true
  const [flagCreate, setFlagCreate] = useState(false)

  //// test to delete
  return (
    <>
  
      {
        loadingPosts ?
          <div className="w-[72%]  mx-auto flex flex-col gap-2">
            <Card sx={{ m: 2 }}>
              <CardHeader
                avatar={
                  loadingPosts ? (
                    <Skeleton animation="wave" variant="circular" width={40} height={40} />
                  ) : (
                    <Avatar
                      alt="Ted talk"
                      src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"
                    />
                  )
                }
                action={
                  loadingPosts ? null : (
                    <IconButton aria-label="settings">
                    </IconButton>
                  )
                }
                title={
                  loadingPosts ? (
                    <Skeleton
                      animation="wave"
                      height={10}
                      width="72%"
                      style={{ marginBottom: 6 }}
                    />
                  ) : (
                    'Ted'
                  )
                }
                subheader={
                  loadingPosts ? (
                    <Skeleton animation="wave" height={10} width="40%" />
                  ) : (
                    '5 hours ago'
                  )
                }
              />
              {loadingPosts ? (
                <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
              ) : (
                <CardMedia
                  component="img"
                  height="140"
                  image="https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512"
                  alt="Nicola Sturgeon on a TED talk stage"
                />
              )}
              <CardContent>
                {loadingPosts ? (
                  <React.Fragment>
                    <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                    <Skeleton animation="wave" height={10} width="72%" />
                  </React.Fragment>
                ) : (
                  <Typography variant="body2" component="p" sx={{ color: 'text.secondary' }}>
                    {
                      "Why First Minister of Scotland Nicola Sturgeon thinks GDP is the wrong measure of a country's success:"
                    }
                  </Typography>
                )}
              </CardContent>
            </Card>

            <Card sx={{ m: 2 }}>
              <CardHeader
                avatar={
                  loadingPosts ? (
                    <Skeleton animation="wave" variant="circular" width={40} height={40} />
                  ) : (
                    <Avatar
                      alt="Ted talk"
                      src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"
                    />
                  )
                }
                action={
                  loadingPosts ? null : (
                    <IconButton aria-label="settings">
                    </IconButton>
                  )
                }
                title={
                  loadingPosts ? (
                    <Skeleton
                      animation="wave"
                      height={10}
                      width="72%"
                      style={{ marginBottom: 6 }}
                    />
                  ) : (
                    'Ted'
                  )
                }
                subheader={
                  loadingPosts ? (
                    <Skeleton animation="wave" height={10} width="40%" />
                  ) : (
                    '5 hours ago'
                  )
                }
              />
              {loadingPosts ? (
                <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
              ) : (
                <CardMedia
                  component="img"
                  height="140"
                  image="https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512"
                  alt="Nicola Sturgeon on a TED talk stage"
                />
              )}
              <CardContent>
                {loadingPosts ? (
                  <React.Fragment>
                    <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                    <Skeleton animation="wave" height={10} width="72%" />
                  </React.Fragment>
                ) : (
                  <Typography variant="body2" component="p" sx={{ color: 'text.secondary' }}>
                    {
                      "Why First Minister of Scotland Nicola Sturgeon thinks GDP is the wrong measure of a country's success:"
                    }
                  </Typography>
                )}
              </CardContent>
            </Card>

          </div>

          :
          <div className=" w-[72%] min-h-[82vh] mx-auto my-5 dark:bg-black ">

            {
              (errorMutation?.message || errorMutationCreate?.response?.data?.error || errorMutationUpdate || (formik.errors.content && formik.touched.content) ) ?
                <div className="bg-red-500 p-2 text-white text-center mb-2  rounded-md">
                  {errorMutation?.response?.data?.message || errorMutationCreate?.response?.data?.error || errorMutationUpdate?.response?.data?.error  || formik.errors.content }

                </div>
                : " "
            }
           

            {
              !dataCommentsCreated?.data?.comments?.length  && !dataPosts.length ?   <div className="animate__animated animate__bounceIn h-[60vh] flex flex-col justify-center items-center">
                 <img className="w-[400px]" src={emptyList} alt="empty list" />
                <h2 className=" text-blue-600 capitalize text-3xl text-center font-semibold" >empty comments</h2>
               </div> :  <h2 className="capitalize text-xl text-slate-900 dark:text-slate-300 mb-4" >comments</h2>
            }

            {
              
              (dataCommentsCreated?.data?.comments?.length > 0  && flagCreate ? dataCommentsCreated?.data?.comments : dataPosts )?.map((comment: Comment, index: number) => (

                index < seeMore ? <div key={comment._id} className=" border p-3 rounded-md my-7 bg-slate-800/[0.09] dark:bg-slate-800 ">
                  <div className=" relative flex items-center justify-between">
                    <div className="flex items-center" > <img className="w-[40px] rounded-full  me-3" src={comment.commentCreator.photo == "https://linked-posts.routemisr.com/uploads/undefined"
                      ? personImg : comment.commentCreator.photo} alt='person' />
                      <h3 className="font-bold dark:text-slate-200 ">{comment.commentCreator.name}</h3>
                    </div>
                    <div className="cursor-pointer absolute top-[-4px] right-[-4px]" onClick={() => {
                      setFlagAppear(`${comment?.id}`)
                    }}>
                  
                      {
                        ( ( flagAppear == comment?.id ) && ( comment?.commentCreator?._id == localStorage.getItem("userId") ) && HandelDis ) ? 
                        <div className=" animate__animated  animate__bounceIn  z-10 bg-slate-200 p-1 rounded-lg">
                          <p className="p-2 bg-slate-300 hover:bg-slate-400 capitalize rounded-md"
                            onClick={() => {

                           handelDelete(comment?._id)
                          //  mutate(comment?._id)
                           setFlagCreate(false)

                            }}
                          > <DeleteIcon /> delete </p>
                          <p
                            onClick={() => {

                              setIsUpDate(true)
                              // console.log(comment.id)
                              setIdComment(comment.id)
                              setHandelDis(false)
                              setFlagCreate(false)

                            }}
                            className="p-2 bg-slate-300 hover:bg-slate-400 capitalize rounded-md mt-1"> <UpdateIcon /> update </p>
                        </div> 
                        : 
                         (comment?.commentCreator?._id == localStorage.getItem("userId") &&  ( !HandelDis || flagAppear !== comment?.id || !flagAppear ) ) ? 
                         <div 
                          // className="animate__animated animate__bounceIn"
                         onClick={ ()=>{
                          setHandelDis(true)
                         } }
                         ><MoreVertIcon /></div> : ""
                      }

                    </div>
                  </div>
                  <p className="my-3 text-slate-800 dark:text-slate-400">{comment.content}</p>
                  <small className="text-gray-500 dark:text-slate-500">{new Date(comment.createdAt).toLocaleString()}</small>
                </div> 
                :
                " "

              ))
            }

            {
              dataCommentsCreated?.data?.comments.length > 5 || dataPosts.length > 5 ?   <p className="cursor-pointer my-2 mb-5 text-gray-700 dark:text-slate-400 text-sm ms-2" onClick={more}>see more ..</p>
              : ""
            }
          
          </div>
      }




      {loadingPosts ? "" :

        !isUpDate ?

          <div onClick={() => {
            // setIdCreate(id)
          }} className="fixed bottom-0 start-[0%] end-[0%] bg-slate-100/[1] p-2 py-4 shadow-2xl shadow-slate-800 " >
            <form onSubmit={formik.handleSubmit}>
              <div className="flex justify-between w-[85%] mx-auto p-2">
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.content} name='content' className="w-[95%] rounded-lg" type="text" placeholder="Comment.." />
                <button 
                 className="w-[30px] ms-6" type="submit"> <SendIcon /> </button>
              </div>
            </form>
          </div>

          : 
          <div onClick={() => {
            // setIdCreate(id)
          }} className="fixed bottom-0 start-[0%] end-[0%] bg-slate-100/[1] p-2 py-4 shadow-2xl shadow-slate-800 " >
            <form onSubmit={formikUpdate.handleSubmit}>
              <div className="flex justify-between w-[85%] mx-auto p-2">
                <input onChange={formikUpdate.handleChange} onBlur={formikUpdate.handleBlur} value={formikUpdate.values.content} name='content' className="w-[95%] rounded-lg" type="text" placeholder="update Comment.." />
                <button className="w-[30px] ms-6" type="submit"> <SendIcon /> </button>
              </div>
            </form>
          </div>
      }







    </>
  )
}
