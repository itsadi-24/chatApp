import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

type SignupInputs = {
  fullname: string;
  username: string;
  password: string;
  confirmPassword: string;
  gender: string;
};

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async (inputs: SignupInputs) => {
    try {
      setLoading(true);
      if (
        !inputs.fullname ||
        !inputs.username ||
        !inputs.password ||
        !inputs.confirmPassword ||
        !inputs.gender
      ) {
        throw new Error('Please fill in all fields');
      }

      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputs),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      const data = await res.json();

      setAuthUser(data);
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;
