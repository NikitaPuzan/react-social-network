import React from 'react';
import style from './Messages.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Button, TextField} from "@mui/material";
import * as yup from "yup";
import {useFormik} from "formik";

const Messages = (props) => {
  let dialogElements = props.dialogData.map(dialog => <DialogItem name={dialog.name} key={dialog.id} id={dialog.id}/>)
  let messagesElements = props.messagesData.map(text => <Message value={text.message} key={text.id}/>)

  return (
    <div className={style.dialogs}>
      <div className={style.dialogItems}>
        {dialogElements}
      </div>
      <div className={style.messages}>
        {messagesElements}
        <AddMessageForm sendMessage={props.sendMessage}/>
      </div>
    </div>
  );
};


const AddMessageForm = (props) => {

  const formik = useFormik({
    initialValues: {
      messageText: '',
    },
    validationSchema: yup.object({
      messageText: yup.string('')
        .required('Text is required')
        .max(40, 'Maximum 40 characters length'),
    }),
    onSubmit: (values) => {
    props.sendMessage(values.messageText)
  }
})

return (
  <form onSubmit={formik.handleSubmit}>
    <TextField
      id="outlined-multiline-flexible"
      name="messageText"
      value={formik.values.messageText}
      onChange={formik.handleChange}
      error={formik.touched.messageText && Boolean(formik.errors.messageText)}
      helperText={formik.touched.messageText && formik.errors.messageText}
    />
    <br/>
    <Button color="primary" variant="contained" type="submit">Send</Button>
  </form>
)
}


export default Messages;