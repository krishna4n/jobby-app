import {Component} from 'react'
import Cookie from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'
import './index.css'

class JobItemDetails extends Component {
  state = {jobDetailsList: '', isLoading: 'loading', similarJobs: ''}

  token = Cookie.get('jwt_token')

  componentDidMount = () => {
    this.getApiData()
  }

  getApiData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const job = data.job_details
      const similarJobsList = data.similar_jobs

      const jobDetails = {
        companyLogoUrl: job.company_logo_url,
        companyWebsiteUrl: job.company_website_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        lifeAtCompany: job.life_at_company,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        skills: job.skills,
        title: job.title,
      }

      this.setState({
        isLoading: 'success',
        jobDetailsList: jobDetails,
        similarJobs: similarJobsList,
      })
      console.log(jobDetails)
    } else {
      this.setState({
        isLoading: 'failed',
      })
    }
  }

  render() {
    const {jobDetailsList, isLoading, similarJobs} = this.state
    console.log(jobDetailsList)
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
    } = jobDetailsList

    return (
      <>
        <Header />

        {isLoading === 'loading' && (
          <div className="loader-container" testid="loading">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )}
        {isLoading === 'success' && (
          <div className="job-details-item-container">
            <div className="company-logo-ratings-container">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="company-details-logo"
              />
              <div>
                <h2>{title}</h2>

                <BsFillStarFill className="rating-star" />
                <p>{rating}</p>
              </div>
            </div>
            <div className="job-details-type-package-container">
              <MdLocationOn />
              <p>{location}</p>

              <BsBriefcaseFill />
              <p>{employmentType}</p>
              <p>{packagePerAnnum}</p>
              <a href={companyWebsiteUrl}>Visit</a>
            </div>

            <hr />
            <div>
              <h4>Description</h4>
              <p>{jobDescription}</p>
            </div>
            <h2>Skills</h2>
            <ul className="skills-container">
              {skills.map(each => (
                <li className="skill-item">
                  <img src={each.image_url} alt="name" />
                  <p>{each.name}</p>
                </li>
              ))}
            </ul>
            <h3>Life At Company</h3>
            <p>{lifeAtCompany.description}</p>
            <img src={lifeAtCompany.image_url} alt="life at company" />
            <ul>
              <h2>Similar Jobs</h2>
              {similarJobs.map(each => (
                <SimilarJobItem key={each.id} similarItem={each} />
              ))}
            </ul>
          </div>
        )}
        {isLoading === 'failed' && (
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
              alt="failure view"
            />
            <h2>Oops! Something Went Wrong</h2>
            <p>We cannot seem to find the page you are looking for</p>
            <button type="button" onClick={this.getApiData()}>
              Retry
            </button>
          </div>
        )}
      </>
    )
  }
}

export default JobItemDetails
