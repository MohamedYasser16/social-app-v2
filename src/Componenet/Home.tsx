import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

import 'animate.css';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Skeleton from '@mui/material/Skeleton';

import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { CardActionArea, CardActions } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import { Link, useHref, useNavigate } from 'react-router-dom';
import errorPng from "../assets/icons8-error-64.png"
import logoPerson from "../assets/user-icon-png-27.jpg"
import { string } from 'yup';
import toast from 'react-hot-toast';

export default function Home() {


    const [flagAppear, setFlagAppear] = useState("")


    let navigate = useNavigate()

    // localStorage.removeItem("token")

    if (!localStorage.getItem("token")) {
        navigate("/login")
        // setFirst(true)
        // }
    }

    useEffect(() => {

        // console.log(!localStorage.getItem("token"));
        // if (first.current == false) {
        if (!localStorage.getItem("token")) {
            navigate("/login")
            // setFirst(true)
            // }
        }

    }, [])

    const [token, setToken] = useState<string>("")

    let first = useRef(false)

    let setFirst = (x: any) => {
        first.current = x
    }

    useEffect(() => {

        if (first.current == false) {
            if (localStorage.getItem("token")) {
                // console.log(localStorage.getItem("token"));

                setToken(JSON.stringify(localStorage.getItem("token")))
            }
            first.current = true
        }

    }, [token])


    let posts = async () => axios.get(`https://linked-posts.routemisr.com/posts`, {
        headers: {
            token: localStorage.getItem("token")
        }
    })

    const { data, isLoading, isError, error } = useQuery({ queryKey: ['posts'], queryFn: posts })


    useEffect(() => {
        // console.log(data);
        // console.log(error);



    }, [data, token])


    interface ExpandMoreProps extends IconButtonProps {
        expand: boolean;
    }


    /////////////////////////////

    // console.log(data?.data?.posts);





    const [LastPostDisplay, setLastPostDisplay] = useState([])


    let firstOne = useRef(false)

    useEffect(() => {


        if (data?.data?.posts.length) {

            let lastPost = []

            for (let index = 0; index < data?.data?.posts.length; index++) {

                lastPost.push(data.data.posts[data.data.posts.length - 1 - index])




            }

            // console.log(lastPost);

            setLastPostDisplay(lastPost)

        }




        // console.log(LastPostDisplay);


    }, [data?.data?.posts])


    useEffect(() => {
        // console.log(LastPostDisplay);
    }, [LastPostDisplay]);



    // console.log(firstOne.current);

    ///////////////////////////////

    // data?.data?.posts?.map((post: typeof data.data.posts[number]) => console.log(post.comments[post.comments.length-1]) )


    if ( isError ) {
        
        return <div className="h-[90vh] flex flex-col justify-center items-center " >
                <img className="w-[120px]" src={errorPng} alt="error img" />
                 <h2 className="text-red-600 text-xl font-semibold text-center" >{error.message}</h2>
        </div>
    }

    return (
        <>

            {
                isLoading ?
                    <div className="w-[72%] mx-auto flex flex-col gap-2">
                        <Card sx={{ m: 2 }}>
                            <CardHeader
                                avatar={
                                    isLoading ? (
                                        <Skeleton animation="wave" variant="circular" width={40} height={40} />
                                    ) : (
                                        <Avatar
                                            alt="Ted talk"
                                            src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"
                                        />
                                    )
                                }
                                action={
                                    isLoading ? null : (
                                        <IconButton aria-label="settings">
                                            <MoreVertIcon />
                                        </IconButton>
                                    )
                                }
                                title={
                                    isLoading ? (
                                        <Skeleton
                                            animation="wave"
                                            height={10}
                                            width="80%"
                                            style={{ marginBottom: 6 }}
                                        />
                                    ) : (
                                        'Ted'
                                    )
                                }
                                subheader={
                                    isLoading ? (
                                        <Skeleton animation="wave" height={10} width="40%" />
                                    ) : (
                                        '5 hours ago'
                                    )
                                }
                            />
                            {isLoading ? (
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
                                {isLoading ? (
                                    <React.Fragment>
                                        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                                        <Skeleton animation="wave" height={10} width="80%" />
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
                                    isLoading ? (
                                        <Skeleton animation="wave" variant="circular" width={40} height={40} />
                                    ) : (
                                        <Avatar
                                            alt="Ted talk"
                                            src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"
                                        />
                                    )
                                }
                                action={
                                    isLoading ? null : (
                                        <IconButton aria-label="settings">
                                            <MoreVertIcon />
                                        </IconButton>
                                    )
                                }
                                title={
                                    isLoading ? (
                                        <Skeleton
                                            animation="wave"
                                            height={10}
                                            width="80%"
                                            style={{ marginBottom: 6 }}
                                        />
                                    ) : (
                                        'Ted'
                                    )
                                }
                                subheader={
                                    isLoading ? (
                                        <Skeleton animation="wave" height={10} width="40%" />
                                    ) : (
                                        '5 hours ago'
                                    )
                                }
                            />
                            {isLoading ? (
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
                                {isLoading ? (
                                    <React.Fragment>
                                        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                                        <Skeleton animation="wave" height={10} width="80%" />
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
                    <div className="mt-3">
                        {/* <h1 className="text-3xl text-slate-800 text-center" >home</h1> */}


                        {
                          data?.data?.posts.length ?    <Link to={"/createPost"} >
                                <div className=" w-[75%] mx-auto  border-b-[1.5px] border-slate-400 ">
                                    {/* <h2 className="text-sm text-slate-800 mt-5" >create a post ?? </h2> */}
                                    <div className="flex justify-between items-center mt-0 py-4">
                                        <div className="w-[40px] rounded-full me-3"><img src={logoPerson} alt="logo img person" /></div>
                                        <input className="w-[95%] rounded-md" type="text" placeholder="what are you thinking .." />
                                    </div>
                                </div>
                            </Link>
                            :  ""
                        }


                        {

                            !LastPostDisplay ? "" : LastPostDisplay?.map((post: typeof data.data.posts[number]) => <div key={post.id} className="my-7 w-[75%] mx-auto shadow-xl " >

                                <Card sx={{}}>



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
                                      {
                                        post.image ? <img className=" w-[90%] h-[280px] mx-auto object-fill " src={post.image} alt="image post" /> : "" 
                                      }
                                    

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
                                                <CardContent sx={{ height: '', background: "rgba(117, 117, 117, 0.1)" }}>
                                                    <div className="flex ms-2">
                                                        <img className="w-[28px] me-2 rounded-full"
                                                            src={post.comments[post.comments.length - 1].commentCreator.photo.split("/")[post.comments[post.comments.length - 1].commentCreator.photo.split("/").length - 1] == "undefined" ?
                                                                logoPerson
                                                                : post.comments[post.comments.length - 1].commentCreator.photo.split("/")[post.comments[post.comments.length - 1].commentCreator.photo.split("/").length - 1]
                                                            } alt="" />
                                                        <h6 className="text-slate-800 text-sm font-semibold">
                                                            {post.comments[post.comments.length - 1].commentCreator.name}
                                                        </h6>
                                                    </div>
                                                    <h6 className="text-slate-600 text-xl font-thin ms-2 mt-2"> {post.comments[post.comments.length - 1].content}</h6>
                                                    <small className="text-gray-500 dark:text-slate-500 ms-2">{new Date(post.comments[post.comments.length - 1].createdAt).toLocaleString()}</small>

                                                </CardContent>
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
