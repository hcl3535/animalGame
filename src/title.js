import { forwardRef, useEffect, useImperativeHandle, useState } from "react"

const Title = forwardRef((playing, ref) => {

    const [title, setTitle] = useState('find the pocket purse')
    
    useImperativeHandle(ref,() =>({
      changeTitle(playing){
        console.log("here")
        if(playing) setTitle('find the pocket purse')
        if(!playing) setTitle('you found the pocket purse!')
      }
    }))
  return(
    <h1>{title}</h1>
  )
})

export default Title