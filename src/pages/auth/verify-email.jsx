import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';
import InterestModel from '../../components/common/InterestModel';
import authServices from '../../services/authServices';
import interestServices from '../../services/interestServices';
import { Loader2 } from 'lucide-react';
import useAuthStore from '../../stores/useAuthStore';
import { USER_ROLE } from '../../constants';

const { CUSTOMER, SELLER } = USER_ROLE;

function VerifyEmail() {
  const [isLoading, setIsLoading] = useState(false);
  const [verificationToken, setVerificationToken] = useState('');
  const [showInterestModal, setShowInterestModal] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState([]);
  console.log('🚀 ~ VerifyEmail ~ selectedInterests:', selectedInterests);
  const [countdown, setCountdown] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();
  const { initUserData } = useAuthStore();
  const location = useLocation();
  const { email, userId } = location.state;

  const handleVerifyEmail = async () => {
    setIsLoading(true);
    const result = await authServices.verifyEmail({
      verificationToken,
      email,
    });
    if (result.status === true) {
      toast.success(result.message);
      if (result.data.needSetInterests && result.data.user.role === CUSTOMER) {
        setTimeout(() => {
          setShowInterestModal(true);
        }, 1000);
      } else if (result.data.user.role === SELLER) {
        navigate('/login');
      }
    } else {
      toast.error(result.message);
    }
    setIsLoading(false);
  };

  const handleConfirmInterest = async (selectedIds) => {
    const selectedItems = selectedIds.map((i) => i);

    console.log('Sở thích đã chọn:', selectedItems);

    try {
      const res = await interestServices.setUserInterests({
        interests: selectedItems,
        userId,
      });
      if (res.status === true) {
        toast.success(res.message);
        const response = await initUserData(res);
        if (response.status === true && res.data.user.role === CUSTOMER) {
          navigate('/customer');
        } else {
          toast.error(response.message);
        }
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

  const handleResendOtp = async () => {
    const res = await authServices.resendOtp({ email });
    if (res.status === true) {
      toast.success(res.message);
      setIsResending(true);
      setCountdown(60);
      if (countdown > 0) {
        const timer = setInterval(() => {
          setCountdown((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
      } else {
        setIsResending(false);
      }
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen gap-10'>
      <div className='flex flex-col items-center justify-center gap-2'>
        <h1 className='text-2xl font-bold'>Xác thực email</h1>
        <p className='text-sm text-gray-500'>
          Vui lòng nhập mã 6 chữ số đã được gửi đến email của bạn để xác thực
          tài khoản của bạn.
        </p>
      </div>
      <div className='flex flex-col items-center justify-center'>
        <OtpInput
          value={verificationToken}
          onChange={setVerificationToken}
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
          onClick={handleResendOtp}
          disabled={isResending}
        >
          Gửi lại OTP ({countdown > 0 ? countdown : '60s'})
        </button>
        <button
          className='btn btn-primary'
          onClick={handleVerifyEmail}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className='w-5 h-5 mr-2 animate-spin' />
          ) : (
            'Xác thực'
          )}
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
