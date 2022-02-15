import React, {useEffect, useState} from 'react'

const ProfileStatus = (props) => {
  const [editMode, setEditMode] = useState(false)
  const [status, setStatus] = useState(props.status)

  useEffect(() => {
    setStatus(props.status)
  }, [props.status]);

  const activateEditMode = () => {
    setEditMode( true)
}
  const deactivateEditMode = () => {
    setEditMode( false)
    props.updateStatus(status)
  }

  const onStatusChanged = (e) => {
    setStatus(e.currentTarget.value)
  }

  return <>
    {!editMode &&
      <div>
        <span onDoubleClick={activateEditMode}>{status || 'no status'}</span>
      </div>}
    {editMode && <div>
      <input onChange={onStatusChanged} autoFocus={true}
             onBlur={deactivateEditMode} value={status}/>
    </div>}
  </>
}

export default ProfileStatus;

//
//
// componentDidUpdate(prevProps, prevState)
// {
//   if (prevProps.status !== props.status) {
//     setState({
//       status: props.status
//     })
//   }
// }
