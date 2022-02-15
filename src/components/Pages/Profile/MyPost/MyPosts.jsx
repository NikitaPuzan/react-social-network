import React from 'react';
import style from './MyPosts.module.css'
import Post from "./Post/Post";
import {Button, TextField} from "@mui/material";
import * as yup from 'yup'
import {useFormik} from 'formik';

const MyPosts = React.memo((props) => {
  let postElements = props.postData.map(el => <Post message={el.text} key={el.id}/>)
  return (
    <div>
      <div className={style.postsBlock}>
        <h3>My posts</h3>
        <AddPostsForm addPost={props.addPost} />
        <div className={style.posts}>
          {postElements}
        </div>
      </div>
    </div>
  );
})

const AddPostsForm = (props) => {
  const formik = useFormik({
    initialValues: {
      postText: '',
    },
    validationSchema: yup.object({
      postText: yup.string('')
        .required('Text is required')
        .max(40, 'Maximum 40 characters length'),
    }),
    onSubmit: (values) => {
      props.addPost(values.postText)
    }
  });

  return (
        <form onSubmit={formik.handleSubmit}>
          <TextField
            id="outlined-multiline-flexible"
            name="postText"
            value={formik.values.postText}
            onChange={formik.handleChange}
            error={formik.touched.postText && Boolean(formik.errors.postText)}
            helperText={formik.touched.postText && formik.errors.postText}
          />
          <br/>
          <Button color="primary" variant="contained" type="submit">Send</Button>
        </form>
  )
}

export default MyPosts;
