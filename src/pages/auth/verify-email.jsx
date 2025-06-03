import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import useAuthStore from '../../stores/useAuthStore';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';

function VerifyEmail() {
  const [otp, setOtp] = useState('');
  const { verifyEmail } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || '';

  console.log('🚀 ~ email:', email);

  const handleVerifyEmail = async () => {
    const result = await verifyEmail({ otp, email });
    if (result.status === true) {
      toast.success(result.message);
      navigate('/login');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-2xl font-bold'>Verify Email</h1>
      <div className='flex flex-col items-center justify-center'>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          inputType='tel'
          inputStyle={{
            width: '40px',
            height: '40px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            margin: '0 10px',
            fontSize: '16px',
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#000',
            backgroundColor: '#fff',
          }}
          renderSeparator={<span> - </span>}
          renderInput={(props) => <input {...props} />}
        />
        <button className='btn btn-primary' onClick={handleVerifyEmail}>
          Verify
        </button>
      </div>
    </div>
  );
}

export default VerifyEmail;
