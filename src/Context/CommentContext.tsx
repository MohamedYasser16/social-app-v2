import React, { createContext, useState } from 'react'

export let CommentContext = createContext<any>("")

export default function CommentContextProvider ( {children}:any ) {


   const [comments, setComments] = useState([])

  return (
    <CommentContext.Provider value={ {comments , setComments } } >
        {children}
    </CommentContext.Provider>
  )
}
