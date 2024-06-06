import { useSelector } from 'react-redux';

// components
import Login from './Login';
import Signup from './Signup';

const AuthPage = () => {
  const authForm = useSelector(state => state.authFormSlice.authForm);

  return (
    <div className="container box center-x center-y full-height">
      <div className="box center-x center-y">
        <div className="text box column ai-start full-width">
          <h1 className='disable-guitters text-start full-width'>wast your time</h1>
          <p>Enhance your skills in reading, writing, and more..</p>
        </div>

        {authForm === 0 ? (
          <Login />
        ) : (
          <Signup />
        )}
      </div>
    </div>
  )
}

export default AuthPage