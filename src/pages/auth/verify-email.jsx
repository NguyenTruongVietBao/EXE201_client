import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import useAuthStore from '../../stores/useAuthStore';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';
import InterestModel from '../../components/common/InterestModel';
import authServices from '../../services/authServies';

function VerifyEmail() {
  const [otp, setOtp] = useState('');
  const [showInterestModal, setShowInterestModal] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState([]);
  console.log('🚀 ~ VerifyEmail ~ selectedInterests:', selectedInterests);
  const { verifyEmail } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || '';

  console.log('🚀 ~ email:', email);

  const handleVerifyEmail = async () => {
    const result = await verifyEmail({ otp, email });
    if (result.status === true) {
      toast.success(result.message);
      setTimeout(() => {
        setShowInterestModal(true);
      }, 1000);
    } else {
      toast.error(result.message);
    }
    console.log('🚀 ~ handleVerifyEmail ~ result:', result);
  };

  const handleConfirmInterest = async (selectedIds) => {
    // Lấy ra array interest id
    const selectedItems = selectedIds.map((i) => i);

    console.log('Sở thích đã chọn:', selectedItems);

    try {
      const res = await authServices.updateInterest({
        interests: selectedItems,
        email: email,
      });
      console.log('🚀 ~ handleConfirmInterest ~ res:', res);
      if (res.status === true) {
        toast.success(res.message);
        navigate('/login');
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setShowInterestModal(false);
      setSelectedInterests(selectedIds);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen gap-10'>
      <div className='flex flex-col items-center justify-center gap-2'>
        <h1 className='text-2xl font-bold'>Verify Email</h1>
        <p className='text-sm text-gray-500'>
          Please enter the 6-digit code sent to your email address to verify
          your account.
        </p>
      </div>
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
      </div>
      <div className='flex justify-between gap-10'>
        <button
          className='link link-primary text-sm'
          onClick={handleVerifyEmail}
        >
          Resend OTP (60s)
        </button>
        <button className='btn btn-primary' onClick={handleVerifyEmail}>
          Verify
        </button>
      </div>
      <div>
        {showInterestModal && (
          <InterestModel onConfirm={handleConfirmInterest} />
        )}
      </div>
    </div>
  );
}

export default VerifyEmail;
