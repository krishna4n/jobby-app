import {Link} from 'react-router-dom'
import './index.css'
import Header from '../Header'

const Home = () => (
  <>
    <Header />
    <div className="home-container">
      <h1 className="home-heading">Find the Job That Fits Your Life</h1>
      <p className="home-paragraph">
        Millions of people are searching for jobs,salary information, company
        reviews. Find the jo that fits your abilities and potential.
      </p>
      <Link to="/jobs">
        <button type="button" className="home-button">
          Find Jobs
        </button>
      </Link>
    </div>
  </>
)

export default Home
