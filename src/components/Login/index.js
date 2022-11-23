import {Component} from 'react'
import Cookie from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    loginErr: false,
    userErr: false,
    passwordErr: false,
  }

  componentDidMount() {
    const jwtToken = Cookie.get('jwt_token')
    if (jwtToken !== undefined) {
      const {history} = this.props
      history.replace('/')
    }
  }

  loginSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    if (username !== '' && password === '') {
      this.setState({
        passwordErr: true,
      })
    }
    if (username === '' && password !== '') {
      this.setState({
        userErr: true,
      })
    }
    if (username === '' && password === '') {
      this.setState({
        loginErr: true,
      })
    }

    if (username !== '' && password !== '') {
      const details = {username, password}
      const options = {
        method: 'POST',

        body: JSON.stringify(details),
      }
      const url = 'https://apis.ccbp.in/login'

      const response = await fetch(url, options)

      if (response.ok) {
        const data = await response.json()
        const JwtToken = data.jwt_token
        Cookie.set('jwt_token', JwtToken, {expires: 30})
        const {history} = this.props
        history.replace('/')
      } else {
        this.setState({
          loginErr: true,
        })
      }
    } else {
      this.setState({
        loginErr: true,
      })
    }
  }

  changeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  changePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  render() {
    const {loginErr, userErr, passwordErr} = this.state

    return (
      <div className="login-container">
        <div className="login-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <form className="login-form-control" onSubmit={this.loginSubmit}>
            <div className="username-container">
              <label htmlFor="username" className="username-label">
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                className="username"
                placeholder="Username"
                onChange={this.changeUsername}
              />
              {userErr && <p>*username is incorrect</p>}
            </div>
            <div className="password-container">
              <label htmlFor="password" className="password-label">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                className="password"
                placeholder="Password"
                onChange={this.changePassword}
              />
              {passwordErr && <p>*password is incorrect</p>}
            </div>

            <button type="submit" className="login-button">
              Login
            </button>
            {loginErr && (
              <p className="login-error">*Username and Password didn't match</p>
            )}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
