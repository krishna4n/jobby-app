import {BsFillStarFill, BsBriefcase} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const Similar = props => {
  const {similarItem} = props
  const similarList = {
    companyLogoUrl: similarItem.company_logo_url,
    employmentType: similarItem.employment_type,
    jobDescription: similarItem.job_description,
    location: similarItem.location,
    rating: similarItem.rating,
    title: similarItem.title,
  }
  const {
    companyLogoUrl,
    employmentType,

    jobDescription,
    location,
    rating,
    title,
  } = similarList

  return (
    <div className="similar-job-container">
      <div className="similar-logo-rating-container">
        <img src={companyLogoUrl} alt="similar job company logo" />
        <div>
          <p>{title}</p>
          <div>
            <BsFillStarFill className="rating-star" /> {rating}
          </div>
        </div>
      </div>
      <h2>Description</h2>
      <p>{jobDescription}</p>
      <div>
        <MdLocationOn />
        <p>{location}</p>
        <BsBriefcase />
        <p>{employmentType}</p>
      </div>
    </div>
  )
}

export default Similar
