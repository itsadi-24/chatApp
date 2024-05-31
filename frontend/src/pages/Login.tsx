import { useState } from 'react';
import { Link } from 'react-router-dom';
import useLogin from '../hooks/useLogin';

const Login = () => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });

  const { loading, login } = useLogin();

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    login(inputs.username, inputs.password);
  };

  return (
    <div className='flex flex-col items-center justify-center mx-auto min-w-96'>
      <div className='w-full p-6 bg-gray-400 bg-opacity-0 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg'>
        <h1 className='text-3xl font-semibold text-center text-white'>
          Login
          <span className='text-blue-500'> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmitForm}>
          <div>
            <label className='p-2 label '>
              <span className='text-base label-text'>Username</span>
            </label>
            <input
              type='text'
              placeholder='Enter username'
              className='w-full h-10 input input-bordered'
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          </div>

          <div>
            <label className='label'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input
              type='password'
              placeholder='Enter Password'
              className='w-full h-10 input input-bordered'
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>
          <Link
            to='/signup'
            className='inline-block mt-2 text-sm text-white hover:underline hover:text-blue-600'
          >
            {"Don't"} have an account?
          </Link>

          <div>
            <button className='mt-2 btn btn-block btn-sm' disabled={loading}>
              {loading ? 'Loading...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
