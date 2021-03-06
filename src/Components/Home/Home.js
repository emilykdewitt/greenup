import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Link } from 'react-router-dom';

import usersData from '../../helpers/data/usersData';
import UserProfile from '../UserProfile/UserProfile';

import './Home.scss';

class Home extends React.Component {
  state = {
    user: {
      image: '',
      name: '',
      uid: '',
      location: '',
      id: '',
    },
    userActivities: [],
  }

  getUserInfoByUserId = () => {
    const { uid } = firebase.auth().currentUser;
    usersData.getUserInfoByUserId(uid)
      .then((userPromise) => {
        this.setState({ user: userPromise });
      })
      .catch(err => console.error('cannot get user info', err));
  }

  // getUserActivities = () => {
  //   const { uid } = firebase.auth().currentUser;
  //   userActivitiesData.getUserActivities(uid)
  //     .then((userActivitiesPromise) => {
  //       this.setState({ userActivities: userActivitiesPromise });
  //     })
  //     .catch(err => console.error('cannot get user activities info', err));
  // }

  componentDidMount() {
    this.getUserInfoByUserId();
  }

  render() {
    const { user } = this.state;
    const myActivitiesLink = '/myactivities';
    const allActivitiesLink = '/allactivities';
    const scoreboardLink = '/scoreboard';

    return (
      <div className="Home">
        <UserProfile key={user.uid} user={user} getUserInfoByUserId={this.getUserInfoByUserId}/>
        <div className="my-scores-and-buttons">
          <div className="my-scores">
            <h5>Points this week: 27</h5>
            <h5>Points last week: 23</h5>
            <h5>Total points: 128</h5>
          </div>
          <div className="homepage-buttons-div">
            <Link className="btn my-activities-btn" to={myActivitiesLink}>My Activities!</Link>
            <Link className="btn all-activities-btn" to={allActivitiesLink}>All Activities</Link>
            <Link className="btn scoreboard-btn" to={scoreboardLink}>Scoreboard</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
