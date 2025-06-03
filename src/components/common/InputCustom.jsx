import React from 'react';
import { Eye, EyeOff, Lock, Mail, User, Phone } from 'lucide-react';

const getIconByType = (type) => {
  switch (type) {
    case 'password':
      return Lock;
    case 'email':
      return Mail;
    case 'tel':
      return Phone;
    default:
      return User;
  }
};

export default function InputCustom({
  type = 'text',
  name,
  label,
  placeholder,
  showPassword,
  setShowPassword,
  form,
  handleChange,
  ...props
}) {
  const IconComponent = getIconByType(type);
  const isPasswordType = type === 'password';
  const inputType = isPasswordType && showPassword ? 'text' : type;

  return (
    <div className='form-control'>
      {label && (
        <label className='label'>
          <span className='label-text'>{label}</span>
        </label>
      )}
      <div className='relative'>
        <input
          type={inputType}
          name={name}
          placeholder={placeholder}
          className={`input input-bordered w-full pl-10 ${
            isPasswordType ? 'pr-10' : 'pr-4'
          }`}
          value={form?.[name] || ''}
          onChange={handleChange}
          {...props}
        />

        <button
          type='button'
          onClick={() => setShowPassword(!showPassword)}
          className=' absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/40'
          aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
          tabIndex={0}
        >
          <IconComponent className='w-5 h-5' />
        </button>
        {isPasswordType && setShowPassword && (
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='absolute right-3 top-1/2 transform -translate-y-1/2 p-1'
            aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
            tabIndex={0}
          >
            {showPassword ? (
              <EyeOff className='w-5 h-5' />
            ) : (
              <Eye className='w-5 h-5' />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
