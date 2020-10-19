import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { RootState } from 'store';
import AppButton from '../components/AppButton';
import AppFlash from '../components/AppFlash';
import AppInput from '../components/AppInput';
import { AuthState, ILoginState } from '../interfaces/auth';
import { IRoute } from '../interfaces/route';
import { login } from '../store/auth';

const Login = () => {
  const [formData, setFormData] = React.useState<ILoginState>({ email: '', password: '' });
  const [isLoading, setIsLoading] = React.useState(false);

  const dispatch = useDispatch();
  const authUser = useSelector<RootState, AuthState>((state) => state.auth);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    try {
      setIsLoading(true);
      await dispatch(login(formData));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  if (authUser.isAuthenticated) {
    return <Redirect to={IRoute.market} />;
  }

  return (
    <div className="container w-1/2 flex h-full px-15 login-page items-center">
      <div className="flex-1">
        <AppFlash className="mb-5" />
        <h1 className="text-4xl text-center mb-5">Login to your account</h1>
        <form onSubmit={onSubmit}>
          <AppInput name="email" type="email" id="email" label="Email address" onChange={onChange} value={formData.email} required />
          <AppInput name="password" type="password" id="password" label="Password" onChange={onChange} value={formData.password} required />
          <AppButton disabled={isLoading} type="submit" className="bg-blue-900 text-white w-full">
            Login
          </AppButton>
        </form>
      </div>
    </div>
  );
};

export default Login;
