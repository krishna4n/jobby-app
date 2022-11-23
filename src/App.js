import {Route, Switch, Redirect} from 'react-router-dom'
import Login from './components/Login'
import NotFound from './components/NotFound'
import Home from './components/Home'
import './App.css'
import ProtectedRoute from './components/ProtectedRoute'
import Jobs from './components/Jobs'
import JobItemDetails from './components/JobItemDetails'

// These are the lists used in the application. You can move them to any component needed.

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

// Replace your code here

const App = () => {
  localStorage.setItem('employmentType', JSON.stringify(employmentTypesList))

  localStorage.setItem('salaryRange', JSON.stringify(salaryRangesList))

  return (
    <Switch>
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={Jobs} />
      <ProtectedRoute path="/jobs/:id" component={JobItemDetails} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/bad-path" component={NotFound} />
      <Redirect to="/bad-path" />
    </Switch>
  )
}
export default App
