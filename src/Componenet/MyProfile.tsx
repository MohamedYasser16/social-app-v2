import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Loading from './Loading'
import * as Yup from 'yup';
import palastine from "../assets/palastine2.jpg"
import logoPerson from "../assets/user-icon-png-27.jpg"
import { Avatar, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import emptyList from "../assets/icons8-image-file.svg"
import 'animate.css';
import SettingsIcon from '@mui/icons-material/Settings';
import { useFormik, validateYupSchema } from 'formik'
import toast from 'react-hot-toast'

export default function myProfile() {


    const queryClient = useQueryClient();

    const [flagAppear, setFlagAppear] = useState("")

    let navigate = useNavigate()

    let profileData = () => {
        return axios.get("https://linked-posts.routemisr.com/users/profile-data", {
            headers: {
                token: localStorage.getItem("token")
            }
        })
    }

    let { data, error } = useQuery({ queryKey: ["profileData"], queryFn: profileData })

    // console.log(data?.data);


    useEffect(() => {
        if (data?.data?.user?._id !== undefined) {
            localStorage.setItem("userId", data?.data?.user?._id)
        }
    }, [data])


    let profilePosts = () => {
        return axios.get(`https://linked-posts.routemisr.com/users/${localStorage.getItem("userId")}/posts`, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
    }

    let { data: UserPosts, isLoading, error: UserError } = useQuery({ queryKey: ["profilePosts"], queryFn: profilePosts })

    // console.log(UserPosts?.data?.posts);
    // console.log(UserError);

    let deletePost = async (id: string) => {
        return await axios.delete(`https://linked-posts.routemisr.com/posts/${id}`, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
    }


    let { data: dataDelete, mutate: mutateDelete } = useMutation({
        mutationKey: ["delete"],
        mutationFn: deletePost
    })



    ///////////////////////////////

    const [LastPostDisplay, setLastPostDisplay] = useState([])


    let firstOne = useRef(false)

    useEffect(() => {

        if (firstOne.current) {

            if (UserPosts?.data?.posts.length) {
                let lastPost = []
                for (let index = 0; index < UserPosts?.data?.posts.length; index++) {
                    lastPost.push(UserPosts?.data?.posts[UserPosts?.data?.posts.length - 1 - index])
                }
                      
                setLastPostDisplay(lastPost)
            }
        }
        else {
            firstOne.current = true
        }
        // console.log(LastPostDisplay);
    }, [UserPosts])


    useEffect(() => {
        // console.log(LastPostDisplay);
    }, [LastPostDisplay]);

    ///////////////////////////////
    let [updateImg, setUpdateImg] = useState(false)

    let preventScroll = useCallback(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {

        if ( updateImg ) {
            
            window.addEventListener("scroll", preventScroll)
        } else {
            window.removeEventListener( "scroll" , preventScroll )
        }

    }, [updateImg]);

    // const handleScroll = () => {
    //     if (window.scrollY) {
    //         console.log("Scroll Position:", window.scrollY);
    //     }
    // };

    // window.addEventListener("scroll", handleScroll);

    //////////////////////////////

    const [profileImg, setProfileImg] = useState(null)

    let formik = useFormik({
        initialValues: {
            photo: null
        },
        validationSchema: Yup.object({
            photo: Yup.mixed().required("required")
        })
        ,
        onSubmit: async (values) => {
            let formData = new FormData();
            formData.append("photo", values.photo);
            // console.log("File Uploaded:", values.photo);
            setProfileImg(values.photo);

        },

    })

    let fir = useRef(false)


      let firsMess = useRef(true)



     let uploadProfileImg = async (profileImg) => {

        try {
            let { data } = await axios.put(`https://linked-posts.routemisr.com/users/upload-photo`, {
                photo: profileImg
            }, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    token: localStorage.getItem("token")
                }
            })
            // console.log(data);
            
           if(data.message == 'success'){
            toast.success('Successfully Uploaded !');
            firsMess.current = false
            setUpdateImg(false)
            queryClient.invalidateQueries(["profilePosts"]); 
            // fir.current = true ,
            // navigate("/myProfile")
           }
            
        } catch (error) {
          
            console.log(error);

        }

    }

    let handelProfile = async ()=>{
        if (!fir.current) {

           await uploadProfileImg(profileImg)

            //

        }
    }

    const firstRender = useRef(true);

    useEffect(() => {

        if (firstRender.current) {
            firstRender.current = false; 
          
          } else{

              handelProfile()
          }
      
    }
        , [profileImg])




        const [animation, setAnimation] = useState(false)

                      ///////////////////


        // console.log("Before reversing:", UserPosts?.data?.posts);

        let postsReversed = UserPosts?.data?.posts
          ? [...UserPosts.data.posts].reverse()
          : [];
        
        // console.log("After reversing:", postsReversed);
        // console.log("Original data after:", UserPosts?.data?.posts);



        let handelDelete = async (post)=>{
            mutateDelete(post)
            toast.success('Successfully deleted !');

            window.scrollTo({ top: 0, behavior: 'smooth' });
          await  queryClient.invalidateQueries(['profilePosts'])
        }

    return (
        <>

            {
                updateImg ? <div className={` animate__animated  ${ !animation ?  "animate__flipInX" : "animate__flipOutY" } fixed top-[20%] left-8 right-8 bottom-[20%] bg-slate-800/[0.55] z-20`}>

                    <div className=" p-3 bg-red-500 hover:bg-red-600 text-white font-bold absolute top-[-10px] end-[-10px] rounded-full hover:cursor-pointer "
                        onClick={() => {
                            setUpdateImg(false)
                            setAnimation(true)
                        }} > x </div>


                    <div className=" w-full h-[100%] flex flex-col justify-center items-center" >
                        <form onSubmit={formik.handleSubmit} >
                            <div className="w-[80%] flex flex-col justify-center items-center gap-3 h-[100%] text-start " >
                                <p className="text-white" >  chose the profile image </p>
                              <div className="w-full my-3 rounded-lg bg-slate-100">  <input name="photo" className="rounded-lg w-full" onChange={(event) => {
                                    formik.setFieldValue("photo", event.currentTarget.files[0]);
                                }}
                                    onBlur={formik.handleBlur} type="file" /></div>
                                {
                                    formik.errors.photo && formik.touched.photo ? <div className="bg-red-600 rounded-md my-4 w-full text-white p-2  mx-auto " >  {formik.errors.photo}  </div> : ""
                                }

                                <button className="bg-blue-500 hover:bg-blue-600 rounded-md px-3 py-2 " type="submit" >submit</button>

                            </div>
                        </form>
                    </div>

                </div>
                    :
                    " "
            }

            {
                isLoading ? <Loading isloading={isLoading} /> :
                    <div className=" py-9" >
                        <div className={`w-[72%] mx-auto ${!UserPosts?.data?.posts.length ? "mb-3 h-[450px] " : "mb-12 h-[500px] "} `}>

                            <div className="relative  ">
                                <img className="h-[350px] w-full rounded-md border-slate-800 border-[1.1px]" src={palastine} alt="" />
                                <div className=" absolute top-[200px] translate-x-[-50%] left-[50%]  my-3 mx-auto">

                                    <div className=" bg-white p-1 border-slate-900 border-[1.5px] w-[200px] rounded-full mx-auto">
                                        <img className="w-[200px] h-[200px] rounded-full relative " src={UserPosts?.data?.posts[0]?.user ? UserPosts?.data?.posts[0]?.user.photo : "https://linked-posts.routemisr.com/uploads/default-profile.png"} alt={UserPosts?.data?.posts[0]?.user ? "person photo" : null} />
                                        <div className="absolute bottom-[27%] end-[12%] p-1 rounded-full bg-slate-50/[0.9] hover:cursor-pointer  hover:bg-slate-200 duration-300 " onClick={() => {
                                            setUpdateImg(true)
                                            setAnimation(false)
                                        }} >
                                            < SettingsIcon sx={{ fontSize: "38px" }} />
                                        </div>
                                    </div>

                                    <h1 className="text-slate-800 text-4xl my-4 mb-5 text-center capitalize ">{UserPosts?.data?.posts[0]?.user ? UserPosts?.data?.posts[0].user.name : ""}</h1>
                                </div>

                            </div>

                        </div>

                        <Link className="" to={"/createPost"} >
                            <div className=" w-[75%] mx-auto  border-b-[1.5px] border-t-[1.5px] border-slate-400 ">
                                {/* <h2 className="text-sm text-slate-800 mt-5" >create a post ?? </h2> */}
                                <div className="flex justify-between items-center mt-0 py-4">
                                    <div className=" w-[42px] h-[42px] rounded-full p-[2px] me-3 flex justify-center items-center overflow-hidden "><img className="  w-[44px] h-[44px] object-fill  " src={UserPosts?.data?.posts[0]?.user ? UserPosts?.data?.posts[0]?.user.photo : "https://linked-posts.routemisr.com/uploads/default-profile.png"} alt="logo img person" /></div>
                                    <input className="w-[92%] rounded-md" type="text" placeholder="what are you thinking .." />
                                </div>
                            </div>
                        </Link>


                        {
                            !UserPosts?.data?.posts.length ?
                                <div className="mx-auto h-[38vh] flex flex-col items-center justify-center animate__animated animate__bounceIn ">  <img className="w-[250px]" src={emptyList} alt="" />   <h2 className="text-xl text-sky-500 font-semibold ">There is no Posts </h2> </div>
                                :
                                postsReversed?.map((post: typeof UserPosts.data.posts[0]) => <div key={post.id} className=" relative my-5 p-2 w-[75%] mx-auto rounded-md " >

                                    <Card sx={{}}>
                                        <CardHeader
                                            avatar={
                                                <Avatar sx={{ widows:"42px" , height:"42px" }} aria-label="recipe">
                                                    <CardMedia
                                                        component="img"
                                                        height="120"
                                                        image={post.user.photo}
                                                        alt="Paella dish"
                                                    />
                                                </Avatar>
                                            }
                                            action={
                                                <IconButton aria-label="settings"  >
                                                    <div onClick={() => {
                                                        setFlagAppear(`${post.id}`)
                                                    }}>
                                                        <MoreVertIcon />
                                                    </div>
                                                </IconButton>
                                            }
                                            title={post.user.name}
                                            subheader={new Date(post.createdAt).toLocaleString()}
                                        />

                                        <div className="absolute top-[20px] end-[20px] ">

                                            {
                                                flagAppear == post?.id ? <div className=" animate__animated animate__bounceIn z-10 bg-slate-200 p-1 rounded-lg">

                                                    <p
                                                        className="p-2 bg-slate-300 hover:bg-slate-400 capitalize rounded-md cursor-pointer"
                                                        onClick={() => {

                                                            // console.log(post?.id);
                                                          handelDelete(post?.id)


                                                        }}
                                                    > <DeleteIcon /> delete </p>

                                                    <p
                                                        onClick={() => {

                                                            // console.log(post?.id);

                                                            navigate(`/updatePost/${post?.id}`)

                                                        }}
                                                        className="p-2 bg-slate-300 hover:bg-slate-400 capitalize rounded-md mt-1 cursor-pointer"> <UpdateIcon /> update </p>
                                                </div> : ""
                                            }

                                        </div>

                                        <CardContent>
                                            <Typography variant="body2" sx={{ color: "text.secondary", padding: "10px", width: "95%", marginX: "auto" }}>
                                                {post.body}
                                            </Typography>
                                        </CardContent>
                                        <CardMedia
                                            sx={{ height: "300px", width: "70%", objectFit: "fill", marginX: "auto" }}
                                            component="img"
                                            height="120"
                                            image={post.image}
                                            alt="Paella dish"
                                        />

                                        <CardActions disableSpacing sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <IconButton aria-label="add to favorites">
                                                <FavoriteIcon />
                                            </IconButton>
                                            <Link to={`/comments/${post.id}`} >
                                                <IconButton aria-label="chat">
                                                    <ChatIcon />
                                                </IconButton>
                                            </Link>
                                        </CardActions>

                                        <Card>
                                            <Link to={`/comments/${post.id}`} >
                                                <CardActionArea
                                                    // onClick={ }
                                                    // data-active={ }
                                                    sx={{
                                                        height: '100%',
                                                        '&[data-active]': {
                                                            backgroundColor: 'action.selected',
                                                            '&:hover': {
                                                                backgroundColor: 'action.selectedHover',
                                                            },
                                                        },
                                                    }}
                                                >

                                                    {
                                                        !post.comments[post.comments?.length - 1] ? " " :
                                                            <CardContent sx={{ height: '', background: "rgba(117, 117, 117, 0.1)" }}>
                                                                <div className="flex ">
                                                                    <div className="bg-blue-400 w-[28px] me-2 rounded-full">
                                                                        <img className="w-[28px]  rounded-full"
                                                                            src={post.comments[post.comments?.length - 1]?.commentCreator?.photo.split("/")[post.comments[post.comments?.length - 1]?.commentCreator?.photo.split("/").length - 1] == "undefined" ?
                                                                                logoPerson
                                                                                : post.comments[post.comments?.length - 1]?.commentCreator?.photo.split("/")[post.comments[post.comments?.length - 1]?.commentCreator?.photo.split("/").length - 1]
                                                                            } alt="" />
                                                                    </div>
                                                                    <h6 className="text-slate-800 text-sm font-semibold">
                                                                        {post.comments[post.comments?.length - 1]?.commentCreator?.name}
                                                                    </h6>
                                                                </div>
                                                                <h6 className="text-slate-600 text-xl font-thin ms-2 mt-2"> {post.comments[post.comments?.length - 1]?.content}</h6>
                                                                <small className="text-gray-500 dark:text-slate-500 ms-2">{new Date(post.comments[post.comments?.length - 1]?.createdAt).toLocaleString()}</small>

                                                            </CardContent>
                                                    }
                                                </CardActionArea>
                                            </Link>
                                        </Card>




                                    </Card>


                                </div>)
                        }

                    </div>
            }

        </>
    )
}
