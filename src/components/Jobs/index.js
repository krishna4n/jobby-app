import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookie from 'js-cookie'
import {BsSearch, BsFillStarFill, BsBriefcase} from 'react-icons/bs'
import Header from '../Header'

import './index.css'

class Jobs extends Component {
  state = {
    profileLoading: 'loading',
    profileDetails: [],
    jobsList: [],

    selectedCheckBox: '',
    selectedRadioButton: '1000000',
    jobsLoading: 'loading',
    searchInput: '',
  }

  token = Cookie.get('jwt_token')

  options = {
    headers: {
      Authorization: `Bearer ${this.token}`,
    },
  }

  componentDidMount() {
    this.getProfile()
    this.getJobsList()
  }

  getJobsList = async () => {
    const {searchInput, selectedRadioButton, selectedCheckBox} = this.state

    const checkBoxList =
      selectedCheckBox.length !== 0 ? selectedCheckBox.join(',') : ''

    const response = await fetch(
      `https://apis.ccbp.in/jobs?employment_type=${checkBoxList}&minimum_package=${selectedRadioButton}&search=${searchInput}`,
      this.options,
    )

    if (response.ok) {
      const data = await response.json()

      if (data.jobs.length > 0) {
        const jobs = await data.jobs.map(each => ({
          companyLogoUrl: each.company_logo_url,
          employmentType: each.employment_type,
          id: each.id,
          jobDescription: each.job_description,
          location: each.location,
          packagePerAnnum: each.package_per_annum,
          rating: each.rating,
          title: each.title,
        }))

        this.setState({
          jobsLoading: 'success',
          jobsList: jobs,
        })
      } else {
        this.setState({
          jobsLoading: 'no-data',
        })
      }
    } else {
      this.setState({
        jobsLoading: 'failed',
      })
    }
  }

  onRadioButtonClicked = event => {
    this.setState({selectedRadioButton: event.target.id}, this.getJobsList)
  }

  onSelectedCheckBox = event => {
    if (event.target.checked === true) {
      this.setState(
        prevState => ({
          selectedCheckBox: [...prevState.selectedCheckBox, event.target.id],
        }),
        this.getJobsList,
      )
    } else {
      this.setState(
        prevState => ({
          selectedCheckBox: prevState.selectedCheckBox.filter(
            each => each !== event.target.id,
          ),
        }),
        this.getJobsList,
      )
    }
  }

  getProfile = async () => {
    const response = await fetch('https://apis.ccbp.in/profile', this.options)
    if (response.ok) {
      const data = await response.json()
      const profile = await data.profile_details
      console.log(profile)
      const profileData = {
        name: profile.name,
        profileImageUrl: profile.profile_image_url,
        shortBio: profile.short_bio,
      }
      this.setState({
        profileLoading: 'success',
        profileDetails: profileData,
      })
    } else {
      this.setState({
        profileLoading: 'failed',
      })
    }
  }

  profileView = profileDetails => (
    <>
      <img src={profileDetails.profileImageUrl} alt="profile" />
      <h4 className="profile-heading">{profileDetails.name}</h4>
      <p className="profile-shortbio">{profileDetails.shortBio}</p>
    </>
  )

  onSearch = event => {
    this.setState(
      {
        searchInput: event.target.value,
      },
      this.getJobsList,
    )
  }

  profileFailure = () => (
    <div>
      <button type="button" className="retry-button" onClick={this.getProfile}>
        Retry
      </button>
    </div>
  )

  loadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  noDataView = () => (
    <div className="nodata-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1>No Jobs Found</h1>
      <p>We Could not find any jobs. Try other filters.</p>
    </div>
  )

  failureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" className="retry-button" onClick={this.getProfile}>
        Retry
      </button>
    </div>
  )

  render() {
    const {
      profileLoading,
      profileDetails,
      jobsList,
      jobsLoading,
      searchInput,
      selectedRadioButton,
      selectedCheckBox,
    } = this.state
    const employmentType = JSON.parse(localStorage.getItem('employmentType'))
    const salaryRange = JSON.parse(localStorage.getItem('salaryRange'))

    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="job-search-container">
            <button type="button">
              <input
                type="search"
                className="job-search-input"
                placeholder="Search"
                value={searchInput}
                onChange={this.onSearch}
              />
            </button>
            <BsSearch className="search-icon" />
          </div>
          <div className="profile-container">
            {profileLoading === 'loading' && this.loadingView()}
            {profileLoading === 'success' && this.profileView(profileDetails)}
            {profileLoading === 'failed' && this.profileFailure()}
          </div>
          <hr />
          <ul className="employment-type-container">
            <h4>Type of Employment</h4>
            {employmentType.map(each => (
              <li className="employment-type-item" key={each.employmentTypeId}>
                <input
                  type="checkbox"
                  className="input-checkbox"
                  id={each.employmentTypeId}
                  value={selectedCheckBox}
                  onChange={this.onSelectedCheckBox}
                />
                <label htmlFor={each.employmentTypeId} className="input-label">
                  {each.label}
                </label>
              </li>
            ))}
          </ul>
          <hr />
          <ul className="salary-range-container">
            <h4>Salary Range</h4>
            {salaryRange.map(each => (
              <li className="salary-range-item" key={each.salaryRangeId}>
                <input
                  type="radio"
                  className="input-radio-button"
                  id={each.salaryRangeId}
                  value={selectedRadioButton}
                  checked={each.salaryRangeId === selectedRadioButton}
                  onClick={this.onRadioButtonClicked}
                />
                <label htmlFor={each.salaryRangeId} className="input-label">
                  {each.label}
                </label>
              </li>
            ))}
          </ul>
          <ul className="job-item-container">
            {jobsLoading === 'loading' && this.loadingView()}

            {jobsLoading === 'success' &&
              jobsList.map(each => (
                <Link to={`jobs/${each.id}`} className="job-link" key={each.id}>
                  <li className="job-item-list-container">
                    <div className="job-item-logo-container">
                      <img
                        src={each.companyLogoUrl}
                        alt="Company logo"
                        className="company-logo"
                      />
                      <div className="job-title-container">
                        <h4>{each.title}</h4>
                        <p className="job-title-rating">
                          <BsFillStarFill className="rating-star" />
                          {each.rating}
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className="job-type-location-container">
                        <div className="job-location-icon-container">
                          <p>
                            <BsBriefcase className="input-icon" />
                            {each.location}
                          </p>

                          <p>
                            <BsBriefcase className="input-icon" />
                            {each.employmentType}
                          </p>
                        </div>

                        <p>{each.packagePerAnnum}</p>
                      </div>
                    </div>
                    <hr />
                    <h4>Description</h4>
                    <p>{each.jobDescription}</p>
                  </li>
                </Link>
              ))}

            {jobsLoading === 'no-data' && this.noDataView()}
            {jobsLoading === 'failure' && this.failureView()}
          </ul>
        </div>
      </>
    )
  }
}

export default Jobs
