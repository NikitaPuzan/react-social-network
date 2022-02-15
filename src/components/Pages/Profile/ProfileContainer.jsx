import React, {Component} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, getUserStatus, updateUserStatus} from "../../../redux/profile-reducer";
import {useParams } from "react-router-dom";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {compose} from "redux";


class ProfileContainer extends Component {

  componentDidMount() {
    let userId = this.props.params.userId
    if(!userId) {
      userId = this.props.authorizedUserId
    }
    this.props.getUserProfile(userId)
    this.props.getUserStatus(userId)
  }

  render() {
    return (
        <Profile {...this.props} profile={this.props.profile}
                 status={this.props.status}
                 updateStatus={this.props.updateUserStatus}/>
    );
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth
})

const withRouter = WrappedComponent => props => {
  const params = useParams();
  return (
    <WrappedComponent {...props} params={params} />
  )
}

export default compose(
  connect(mapStateToProps,{ getUserProfile, getUserStatus, updateUserStatus}),
  withRouter,
  withAuthRedirect
)(ProfileContainer)




