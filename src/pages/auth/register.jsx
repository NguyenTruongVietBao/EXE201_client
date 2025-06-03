import React, { useState } from 'react';
import useAuthStore from '../../stores/useAuthStore';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import { UserPlus } from 'lucide-react';
import InputCustom from '../../components/common/InputCustom';

function Register() {
  const navigate = useNavigate();
  const { register, isLoading } = useAuthStore();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    firstName: 'Bao',
    lastName: 'Nguyen',
    email: 'bao@gmail.com',
    password: 'Baonguyen1303.',
    confirmPassword: 'Baonguyen1303.',
  });

  const validateForm = () => {
    const newErrors = {};

    // Validate First Name
    if (!form.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (form.firstName.length < 2) {
      newErrors.firstName = 'First name must be at least 3 characters';
    }

    // Validate Last Name
    if (!form.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (form.lastName.length < 2) {
      newErrors.lastName = 'Last name must be at least 3 characters';
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Validate Password
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (!passwordRegex.test(form.password)) {
      newErrors.password =
        'Password > 8 characters with 1 uppercase and number';
    }

    // Validate Confirm Password
    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('🚀 ~ handleSubmit: ~ form:', form);
    if (validateForm()) {
      try {
        const result = await register(form);
        console.log('🚀 ~ handleSubmit: ~ result:', result);
        if (result.status === true) {
          toast.success('Register successfully');
          navigate('/verify-email', {
            state: {
              email: form.email,
            },
          });
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        console.log('An error occurred: ', error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className='min-h-screen bg-base-200 flex items-center justify-center p-4'>
      <div className='card w-full max-w-lg bg-base-100 shadow-xl'>
        <div className='card-body'>
          <div className='text-center mb-8'>
            <Link
              href='/'
              className='btn btn-ghost normal-case text-2xl font-bold text-primary mb-2'
            >
              StudySphere
            </Link>
            <h2 className='text-3xl font-semibold'>Create Your Account</h2>
            <p className='text-base-content/70'>
              Join StudySphere and unlock a world of learning.
            </p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-3'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <InputCustom
                type='text'
                name='firstName'
                label='First Name'
                placeholder='John'
                form={form}
                handleChange={handleChange}
              />
              <InputCustom
                type='text'
                name='lastName'
                label='Last Name'
                placeholder='Doe'
                form={form}
                handleChange={handleChange}
              />
            </div>

            <InputCustom
              type='email'
              name='email'
              label='Email'
              placeholder='Nhập email'
              form={form}
              handleChange={handleChange}
            />

            <InputCustom
              type='password'
              name='password'
              label='Mật khẩu'
              placeholder='Nhập mật khẩu'
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              form={form}
              handleChange={handleChange}
            />

            <InputCustom
              type='password'
              name='password'
              label='Mật khẩu'
              placeholder='Nhập mật khẩu'
              showPassword={showConfirmPassword}
              setShowPassword={setShowConfirmPassword}
              form={form}
              handleChange={handleChange}
            />

            <div className='form-control mt-6'>
              <button
                type='submit'
                className='btn btn-primary w-full'
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className='loading loading-spinner'></span>
                ) : (
                  <UserPlus className='w-5 h-5 mr-2' />
                )}
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>
          </form>

          <div className='divider my-6'>OR</div>

          <div className='space-y-2'>
            <button className='btn btn-outline btn-neutral w-full'>
              {/* <GoogleIcon className="w-5 h-5 mr-2" /> */}{' '}
              {/* Replace with actual icon */}
              Sign up with Google
            </button>
          </div>

          <p className='mt-8 text-center text-sm'>
            Already have an account?{' '}
            <Link href='/login' className='link link-primary font-medium'>
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
