import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { authorize } from './reducer';

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    const login = this.login.value;
    const password = this.password.value;
    this.props.dispatch(authorize(login, password));
  }

  render() {
    const { error, token } = this.props;

    if (token) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <div>
          <input
            ref={_ref => this.login = _ref}
            type="text"
            placeholder="login"
          />
        </div>
        <div>
          <input
            ref={_ref => this.password = _ref}
            type="password"
            placeholder="password"
          />
        </div>
        <div>
          <button onClick={this.onSubmit}>Submit</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
  error: state.auth.error
});

export default connect(mapStateToProps)(Login);
