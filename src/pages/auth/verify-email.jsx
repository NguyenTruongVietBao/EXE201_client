import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import useAuthStore from '../../stores/useAuthStore';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';
import { INTERESTS } from '../../constants';
import InterestModel from '../../components/common/InterestModel';
import authServices from '../../services/authServies';

function VerifyEmail() {
  const [otp, setOtp] = useState('');
  const [showInterestModal, setShowInterestModal] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState([]);

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
  };

  const handleConfirmInterest = async (selectedIds) => {
    // Lấy ra object {id, name}
    const selectedItems = INTERESTS.filter((i) =>
      selectedIds.includes(i.id)
    ).map((i) => ({ id: i.id, name: i.name }));

    console.log('Sở thích đã chọn:', selectedItems);

    try {
      const res = await authServices.updateInterest({
        interests: selectedItems,
      });
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
      </div>
      <div className='flex justify-between gap-10'>
        <button className='btn btn-ghost' onClick={handleVerifyEmail}>
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
