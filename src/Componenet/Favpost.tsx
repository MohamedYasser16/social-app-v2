import { Card, CardActionArea, CardActions, CardContent, IconButton, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import logoPerson from "../assets/user-icon-png-27.jpg"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatIcon from '@mui/icons-material/Chat';
import Loading from './Loading';
import emptyList from "../assets/icons8-image-file.svg"
import 'animate.css';
import toast from 'react-hot-toast';



export default function Favpost() {

   


    let arrFav: string[] = []


    arrFav = JSON.parse(localStorage.getItem("favPost"))

    // console.log(arrFav);

    const [IsLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")

    let singlePost = async (id: string) => {

        try {

            setIsLoading(true)
            let { data } = await axios.get(`https://linked-posts.routemisr.com/posts/${id}`, {
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            // console.log(data);

            setError("")
            setIsLoading(false)


            return data.post

        } catch (error) {


            // console.log(error);
            setIsLoading(false)
            setError(error)

        }

    }

    //////////////////////////////
    // test my



    let Arr = []

    const [arrToDis, setArrToDis] = useState([])

    if (arrToDis.length) {
        Arr = [...arrToDis]
    }


    // async function handelGet(index: number) {

    //     let x = await singlePost(arrFav[index])
    //     console.log(x);
    //         Arr.push(x)

    //         setArrToDis(Arr)

    //       console.log(arrToDis);
    //           }

    // let limit = useRef(0)

    //     if ( limit.current != arrFav.length ) {

    //         for (let index = 0; index < arrFav.length; index++) {

    //             handelGet(index)
    //             limit.current = index

    //         }
    //     }






    ///////////////////////////////////

    const favPosts = localStorage.getItem("FavPostsObj");

    let parsedFavPosts = [];

    if (favPosts) {
        try {
            parsedFavPosts = JSON.parse(favPosts);
            // console.log("arr to be used", parsedFavPosts);

            if (!Array.isArray(parsedFavPosts)) {
                throw new Error("FavPostsObj is not an array");
            }
        } catch (error) {
            // console.error("Error parsing FavPostsObj from localStorage:", error);
            parsedFavPosts = []; // Reset to an empty array if parsing fails
        }
    }




    ////////////////////////////////////



    // const [PostsFav, setPostsFav] = useState()
    // useEffect(() => {

    //     if (parsedFavPosts.length == arrFav.length) {

    //         setPostsFav(...parsedFavPosts)

    //     }

    // }, [parsedFavPosts])


    // useEffect(() => {

    //     console.log("fav posts", PostsFav);

    // }, [PostsFav])




    // Fetch all favorite posts only once


    useEffect(() => {

        // if (arrFav.length === 0) {
        //     setIsLoading(false);
        //     return;
        // }

        const fetchAllPosts = async () => {
            try {
                const posts = await Promise.all(arrFav.map(id => singlePost(id)));
                const uniquePosts = Array.from(new Map(posts.filter(Boolean).map(post => [post.id, post])).values()); // Remove duplicates
                setArrToDis(uniquePosts);
            } catch (err) {
                setError("Failed to load posts.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllPosts();
    }, []);



    return (
        <>
            {
                IsLoading ?
                    <>
                        <Loading isloading={IsLoading} />
                    </> :

                    !arrToDis.length ? <div className="animate__animated animate__flip w-[75%] mx-auto h-[80vh] flex flex-col items-center justify-center ">  <img className="w-[290px]" src={emptyList} alt="" />   <h2 className="text-xl text-sky-500 font-semibold capitalize">empty favorite list</h2> </div> :
                        arrToDis?.map((post: typeof post) => <div key={post.id} className="my-7 w-[75%] mx-auto" >

                            <Card sx={{}}>



                                <div className="flex justify-between p-5 items-center relative">
                                    <Link to={`/profile/${post.user._id}`}  >
                                        <div className="flex ">
                                            <img className="w-[40px] rounded-full me-3" src={post.user.photo} alt="user photo" />
                                            <div className="flex flex-col">
                                                <h2>{post.user.name}</h2>
                                                <h3 className="text-slate-500">{post.createdAt}</h3>
                                            </div>
                                        </div>
                                    </Link>
               

                                </div>

                                <CardContent>
                                    <Typography variant="body2" sx={{ color: 'text.secondary', padding: "10px", width: "95%", marginX: "auto" }}>
                                        {post.body}
                                    </Typography>
                                </CardContent>

                                <img className=" w-[90%] h-[280px] mx-auto object-fill " src={post.image} alt="image post" />

                        

                                <Card sx={{marginTop:"13px"}} >
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
                                            <CardContent sx={{ height: '88px', background: "rgba(117, 117, 117, 0.1)" }}>
                                                <div className="flex ">
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
                                            </CardContent>
                                        </CardActionArea>
                                    </Link>
                                </Card>

                            </Card>

                        </div>

                        )
            }


            {
                arrToDis.length ? <button onClick={
                    () => {
                        localStorage.removeItem("favPost")
                        setArrToDis([])
                    }
                } className=" w-[90%] mx-auto my-5 bg-red-500 hover:bg-red-600 duration-200 text-white font-semibold px-3 py-2 rounded-md">Clear Favorite </button>
                    :
                    ""
            }

        </>
    )
}
