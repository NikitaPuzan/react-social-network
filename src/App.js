import React, {Component} from 'react';
import { Route, Routes, useParams} from "react-router-dom";
import './App.css'
import Navbar from "./components/Navbar/Navbar";
import News from "./components/Pages/News/News";
import Music from "./components/Pages/Music/Music";
import Videos from "./components/Pages/Videos/Videos";
import Groups from "./components/Pages/Groups/Groups";
import Settings from "./components/Pages/Settings/Settings";
import MessagesContainer from "./components/Pages/Messages/MessagesContainer";
import HeaderComponent from "./components/Header/HeaderComponent";
import LoginPage from "./components/Pages/Login/Login";
import {connect} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import {compose} from "redux";
import Preloader from "./components/common/Preloader/Preloader";
import loadable from '@loadable/component'


const UsersContainer = loadable(() => import('./components/Pages/Users/UsersContainer'))
const ProfileContainer = loadable(() => import('./components/Pages/Profile/ProfileContainer'))
 

class App extends Component {

  componentDidMount() {
    this.props.initializeApp()
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader/>
    }

    return (
          <div className="app-wrapper">
            <HeaderComponent/>
            <Navbar/>
            <div className="app-wrapper-content">
              <Routes>
                <Route path="/users" element={<UsersContainer/>}/>
                <Route path="/profile" element={<ProfileContainer/>}>
                  <Route path=":userId" element={<ProfileContainer/>}/>
                </Route>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/news" element={<News/>}/>
                <Route path="/music" element={<Music/>}/>
                <Route path="/videos" element={<Videos/>}/>
                <Route path="/messages/*" element={<MessagesContainer/>}/>
                <Route path="/groups" element={<Groups/>}/>
                <Route path="/settings" element={<Settings/>}/>
              </Routes>
            </div>
          </div>
    )
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

const withRouter = WrappedComponent => props => {
  const params = useParams();
  return (
    <WrappedComponent {...props} params={params}/>
  )
}

export default compose(
  withRouter,
  connect(mapStateToProps, {initializeApp}))
(App)
