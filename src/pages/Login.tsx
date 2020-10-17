import * as React from 'react';
import Button from '../components/Button';
import Input from '../components/Input';

interface ILoginState {
  email: string,
  password: string;
}

const Login = () => {
  const [formData, setFormData] = React.useState<ILoginState>({ email: '', password: '' });
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): null => {
    event.preventDefault();
    return null;
  };

  return (
    <div className="container w-1/2 flex h-full px-15 login-page items-center">
      <div className="flex-1">
        <h1 className="text-4xl text-center mb-5">Login to your account</h1>
        <form onSubmit={onSubmit}>
          <Input name="email" id="email" label="Email address" onChange={onChange} value={formData.email} required />
          <Input name="password" id="password" label="Password" onChange={onChange} value={formData.password} required />
          <Button type="submit" className="bg-blue-900 text-white w-full">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
