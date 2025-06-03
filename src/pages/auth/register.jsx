import React, { useState } from 'react';
import useAuthStore from '../../stores/useAuthStore';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';

function Register() {
  const navigate = useNavigate();
  const { register, isLoading } = useAuthStore();
  const [errors, setErrors] = useState({});
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
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className='hero bg-base-200 min-h-screen'>
      <div className='hero-content flex-col lg:flex-row-reverse'>
        <div className='text-center lg:text-left'>
          <h1 className='text-5xl font-bold'>Register now!</h1>
          <p className='py-6'>
            Join our community and start your journey with us. Create your
            account to get started.
          </p>
        </div>
        <div className='card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl'>
          <div className='card-body'>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>First Name</span>
                </label>
                <input
                  type='text'
                  name='firstName'
                  className={`input input-bordered ${
                    errors.firstName ? 'input-error' : ''
                  }`}
                  placeholder='First Name'
                  value={form.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && (
                  <label className='label'>
                    <span className='label-text-alt text-error'>
                      {errors.firstName}
                    </span>
                  </label>
                )}
              </div>

              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Last Name</span>
                </label>
                <input
                  type='text'
                  name='lastName'
                  className={`input input-bordered ${
                    errors.lastName ? 'input-error' : ''
                  }`}
                  placeholder='Last Name'
                  value={form.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && (
                  <label className='label'>
                    <span className='label-text-alt text-error'>
                      {errors.lastName}
                    </span>
                  </label>
                )}
              </div>

              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Email</span>
                </label>
                <input
                  type='email'
                  name='email'
                  className={`input input-bordered ${
                    errors.email ? 'input-error' : ''
                  }`}
                  placeholder='Email'
                  value={form.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <label className='label'>
                    <span className='label-text-alt text-error'>
                      {errors.email}
                    </span>
                  </label>
                )}
              </div>

              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Password</span>
                </label>
                <input
                  type='password'
                  name='password'
                  className={`input input-bordered ${
                    errors.password ? 'input-error' : ''
                  }`}
                  placeholder='Password'
                  value={form.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <label className='label'>
                    <span className='label-text-alt text-error'>
                      {errors.password}
                    </span>
                  </label>
                )}
              </div>

              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Confirm Password</span>
                </label>
                <input
                  type='password'
                  name='confirmPassword'
                  className={`input input-bordered ${
                    errors.confirmPassword ? 'input-error' : ''
                  }`}
                  placeholder='Confirm Password'
                  value={form.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && (
                  <label className='label'>
                    <span className='label-text-alt text-error'>
                      {errors.confirmPassword}
                    </span>
                  </label>
                )}
              </div>

              <div className='form-control mt-6'>
                <button
                  type='submit'
                  className='btn btn-primary'
                  disabled={isLoading}
                >
                  {isLoading ? 'Registering...' : 'Register'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
