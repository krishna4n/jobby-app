import Cookie from 'js-cookie'
import {AiOutlineHome} from 'react-icons/ai'
import {BsBriefcase} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import {Link, withRouter} from 'react-router-dom'
import './index.css'

const Header = props => {
  const logout = () => {
    console.log(props)
    const {history} = props
    Cookie.remove('jwt_token')
    localStorage.removeItem('employmentType')
    localStorage.removeItem('salaryRange')
    history.replace('/login')
  }
  return (
    <nav className="header-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="header-logo"
        />
      </Link>
      <ul className="nav-menu">
        <li>
          <Link to="/" className="nav-link">
            <AiOutlineHome className="header-icon" />
            Home
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="nav-link">
            <BsBriefcase className="header-icon" />
            Jobs
          </Link>
        </li>
        <li>
          <button type="button" onClick={logout} className="logout-button">
            <FiLogOut className="header-icon" />
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
