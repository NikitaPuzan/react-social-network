import React from 'react'
import style from "./Post.module.css"

const Post = (props) => {
  return (
      <div className={style.item}>
        <img src="https://i.pinimg.com/736x/f5/27/41/f52741fb62bf1d821948a49204406bdc.jpg" alt=""/>
        {props.message}
      </div>
  )
}

export default Post
