import { Avatar, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';

import palastine from "../assets/palastine2.jpg"
import logoPerson from "../assets/user-icon-png-27.jpg"
import Loading from './Loading';
import toast from 'react-hot-toast';


export default function Profile() {


    const [flagAppear, setFlagAppear] = useState("")
 

   useEffect(() => {
  
     window.scrollY = 0
   
   }, [])
   

  interface User {
    _id: string;
    name: string;
    photo: string;
  }

  interface Comment {
    [key: string]: any; // Define a more specific structure if needed
  }

  interface Post {
    image: string;
    body: string;
    comments: Comment[];
    createdAt: string;
    id: string;
    user: User;
    _id: string;
  }

  let { id } = useParams()
  // console.log(id);


  let profilePosts = async () => {
    return await axios.get(`https://linked-posts.routemisr.com/posts?limit=500`, {
      headers: {
        token: localStorage.getItem("token")
      }
    })
  }


  let { data, error , isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: profilePosts
  })


  let UserArr = []
  let [userPosts, setUserPosts] = useState<Post[]>()






  useEffect(() => {
    // console.log(data?.data.posts);

    data?.data?.posts?.map((postObj: any) => {

      // console.log( postObj.user._id , ' ' ,  id , "  --> " ,  postObj.user._id == id );
      // console.log(postObj);


      if (postObj.user._id == id) {

        // console.log(postObj);
        // setUserPosts([])
        let obj: Post = structuredClone(postObj)
        // console.log(obj);

        UserArr.push(obj)
        // console.log(UserArr);

        setUserPosts(UserArr)

      }
    })



  }, [data])

  useEffect(() => {
    // console.log(userPosts);


  }, [userPosts])


  // console.log(UserArr);


  // setUserPosts(UserArr)

  /////////////////////////////////////////////////////////

  // console.log(error);


  ////////////////////////////


    const [LastPostDisplay, setLastPostDisplay] = useState([])
    
    
        let firstOne = useRef(false)
    
        useEffect(() => {
    
            if (firstOne.current) {
    
                if (userPosts?.length) {
    
                    let lastPost = []
    
                    for (let index = 0; index < userPosts?.length ; index++) {
    
                        lastPost.push( userPosts[ userPosts?.length - 1 - index ] )
    
    
    
    
                    }
    
                    // console.log(lastPost);
    
                    setLastPostDisplay(lastPost)
    
                }
    
            }
            else {
                firstOne.current = true
            }
    
        // console.log(LastPostDisplay);
        
    
        }, [ userPosts ])
    
    
        useEffect(() => {
            // console.log(LastPostDisplay);
          }, [LastPostDisplay]);
    
    
   
  ///////////////////////////


  return (
    <>
    {
      isLoading ? <Loading isloading={isLoading} /> : 
      <div className=" py-9" >
      <div className="w-[72%] h-[500px] mx-auto mb-12 ">

        <div className="relative  ">
       <img className="h-[350px] w-full rounded-md border-slate-800 border-[1.1px]" src={palastine} alt="" />
          <div className=" absolute top-[200px] translate-x-[-50%] left-[50%]  my-3 mx-auto">

            <div className=" bg-white p-1 border-slate-900 border-[1.5px] w-[200px] rounded-full mx-auto">    
            <img className="w-[200px] h-[200px] rounded-full  " src={userPosts?.length > 0 ? userPosts[0]?.user.photo : ""} alt={userPosts?.length > 0 ? "person photo" : null} />
            </div>

            <h1 className="text-slate-800 text-4xl my-2 mb-5 text-center">{userPosts?.length > 0 ? userPosts[0].user.name : ""}</h1>
          </div>

        </div>

      </div>


      {
        LastPostDisplay?.map((post: typeof LastPostDisplay[number]) => <div key={post.id} className="my-5 p-2 w-[75%] mx-auto rounded-md " >

          <Card sx={{}}>
            {/* <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  <CardMedia
                    component="img"
                    height="120"
                    image={post.user.photo}
                    alt="Paella dish"
                  />
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={post.user.name}
              subheader={ new Date(post.createdAt).toLocaleString()}
            /> */}

<div className="flex justify-between p-5 items-center relative">
                                        <Link to={`/profile/${post.user._id}`}  >
                                            <div className="flex ">
                                                <img className="w-[40px] rounded-full me-2" src={post.user.photo} alt="user photo" />
                                                <div className="flex flex-col">
                                                    <h2>{post.user.name}</h2>
                                                    <h3 className="text-slate-500">{new Date(post.createdAt).toLocaleString()}</h3>
                                                </div>
                                            </div>
                                        </Link>
                                        <div
                                            className="cursor-pointer"
                                            onClick={() => {
                                                setFlagAppear(`${post.id}`)
                                            }} >
                                            <MoreVertIcon />
                                        </div>


                                        <div className="absolute top-[20px] end-[20px] ">

                                            {
                                                flagAppear == post?.id ? <div className=" animate__animated animate__bounceIn z-10 bg-slate-200 p-1 rounded-lg">

                                                    <p
                                                        className="p-2 bg-slate-300 hover:bg-slate-400 capitalize rounded-md cursor-pointer"
                                                        onClick={() => {


                                                            // console.log(post?.id);
                                                            var arrFav = []

                                                            if (localStorage.getItem("favPost")) {
                                                                arrFav = JSON.parse(localStorage.getItem("favPost"))
                                                                // console.log(arrFav);

                                                            }

                                                            arrFav.push(`${post?.id}`)
                                                            localStorage.setItem("favPost", JSON.stringify(arrFav))

                                                            toast.success('Successfully added to favorite!');

                                                        }}
                                                    > add To Favorite </p>

                                                </div> : ""
                                            }
                                        </div>

                                    </div>

            <CardContent>
              <Typography variant="body2" sx={{ color: 'text.secondary', padding: "10px", width: "95%", marginX: "auto" }}>
                {post.body}
              </Typography>
            </CardContent>
            <CardMedia
              sx={{ height: "250px", width: "80%", marginX: "auto" }}
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
                                               !post.comments[post.comments?.length - 1]      ?       " "                 : 
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
