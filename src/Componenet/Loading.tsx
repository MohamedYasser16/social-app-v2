import { Avatar, Card, CardContent, CardHeader, CardMedia, IconButton, Skeleton, Typography } from '@mui/material'
import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function Loading({isloading}) {
    
  return (
    <>
        <div className="w-[72%] mx-auto flex flex-col gap-2">
                        <Card sx={{ m: 2 }}>
                            <CardHeader
                                avatar={
                                    isloading ? (
                                        <Skeleton animation="wave" variant="circular" width={40} height={40} />
                                    ) : (
                                        <Avatar
                                            alt="Ted talk"
                                            src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"
                                        />
                                    )
                                }
                                action={
                                    isloading ? null : (
                                        <IconButton aria-label="settings">
                                            <MoreVertIcon />
                                        </IconButton>
                                    )
                                }
                                title={
                                    isloading ? (
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
                                    isloading ? (
                                        <Skeleton animation="wave" height={10} width="40%" />
                                    ) : (
                                        '5 hours ago'
                                    )
                                }
                            />
                            {isloading ? (
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
                                {isloading ? (
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
                                    isloading ? (
                                        <Skeleton animation="wave" variant="circular" width={40} height={40} />
                                    ) : (
                                        <Avatar
                                            alt="Ted talk"
                                            src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"
                                        />
                                    )
                                }
                                action={
                                    isloading ? null : (
                                        <IconButton aria-label="settings">
                                            <MoreVertIcon />
                                        </IconButton>
                                    )
                                }
                                title={
                                    isloading ? (
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
                                    isloading ? (
                                        <Skeleton animation="wave" height={10} width="40%" />
                                    ) : (
                                        '5 hours ago'
                                    )
                                }
                            />
                            {isloading ? (
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
                                {isloading ? (
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
    </>
  )
}
