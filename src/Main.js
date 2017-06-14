import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Main = ({ token }) => {
  if (!token) {
    return <Redirect to="/login" />;
  }

  return <div> You are logged in.</div>;
};

const mapStateToProps = (state) => ({
  token: state.auth.token
});

export default connect(mapStateToProps)(Main);