import React, { useState, useEffect } from 'react';
import OtpInput from 'react-otp-input';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router';
import { toast } from 'react-hot-toast';
import InterestModel from '../../components/common/InterestModel';
import authServices from '../../services/authServices';
import interestServices from '../../services/interestServices';
import { Loader2, Mail, ArrowLeft, RefreshCw, ShieldCheck } from 'lucide-react';
import useAuthStore from '../../stores/useAuthStore';
import { USER_ROLE } from '../../constants';

const { CUSTOMER, SELLER } = USER_ROLE;

function VerifyEmail() {
  const [isLoading, setIsLoading] = useState(false);
  const [verificationToken, setVerificationToken] = useState('');
  const [showInterestModal, setShowInterestModal] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [countdown, setCountdown] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();
  const { initUserData } = useAuthStore();
  const location = useLocation();
  const { email, userId } = location.state || {};

  // Protect route if no email/userId in state
  useEffect(() => {
    if (!email) {
      navigate('/login');
    }
  }, [email, navigate]);

  const handleVerifyEmail = async () => {
    if (verificationToken.length < 6) {
      toast.error('Vui lòng nhập đầy đủ mã 6 chữ số');
      return;
    }
    setIsLoading(true);
    try {
      const result = await authServices.verifyEmail({
        verificationToken,
        email,
      });
      if (result.status === true) {
        toast.success(result.message);
        if (result.data.needSetInterests && result.data.user.role === CUSTOMER) {
          setShowInterestModal(true);
        } else if (result.data.user.role === SELLER) {
          navigate('/login');
        }
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmInterest = async (selectedIds) => {
    try {
      const res = await interestServices.setUserInterests({
        interests: selectedIds,
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
    setIsResending(true);
    const res = await authServices.resendOtp({ email });
    if (res.status === true) {
      toast.success(res.message);
      setCountdown(60);
    } else {
      toast.error(res.message);
      setIsResending(false);
    }
  };

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else {
      setIsResending(false);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <div className="min-h-screen w-full bg-mesh-gradient relative overflow-hidden flex items-center justify-center p-4">
      {/* Decorative Floating Blobs */}
      <div className="absolute top-20 left-[10%] w-64 h-64 bg-blue-400/20 rounded-full blur-[80px] animate-float" />
      <div className="absolute bottom-20 right-[15%] w-80 h-80 bg-purple-400/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }} />

      <div className="w-full max-w-xl relative z-10">
        <div className="lush-glass rounded-[--radius-extra] p-8 md:p-12 shadow-2xl relative overflow-hidden text-center">
          {/* Top Icon */}
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-blue-200 animate-float">
            <Mail className="w-10 h-10 text-white" />
          </div>

          <div className="mb-10">
            <h1 className="text-3xl font-black text-gray-900 mb-4 tracking-tight uppercase">Xác thực Email</h1>
            <p className="text-gray-500 font-medium leading-relaxed max-w-md mx-auto">
              Chúng tôi đã gửi mã xác thực tới <span className="text-blue-600 font-bold">{email}</span>. Vui lòng kiểm tra hộp thư của bạn.
            </p>
          </div>

          {/* OTP Input Section */}
          <div className="mb-12 flex justify-center">
            <OtpInput
              value={verificationToken}
              onChange={setVerificationToken}
              numInputs={6}
              inputType="tel"
              inputStyle={{
                width: '100%',
                maxWidth: '60px',
                height: '70px',
                margin: '0 6px',
                fontSize: '24px',
                fontWeight: '900',
                borderRadius: '16px',
                border: '2px solid rgba(255, 255, 255, 0.8)',
                backgroundColor: 'rgba(255, 255, 255, 0.4)',
                color: '#1a1a1a',
                outline: 'none',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)',
              }}
              focusStyle={{
                border: '2px solid #2563eb',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                boxShadow: '0 0 0 4px rgba(37, 99, 235, 0.1)',
                transform: 'translateY(-2px)'
              }}
              renderInput={(props) => <input {...props} className="focus:ring-0" />}
              containerStyle="flex justify-center w-full"
            />
          </div>

          {/* Verification Actions */}
          <div className="space-y-6">
            <button
              className="w-full h-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-blue-200 disabled:opacity-50 flex items-center justify-center gap-3"
              onClick={handleVerifyEmail}
              disabled={isLoading || verificationToken.length < 6}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Đang xác thực...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  Xác thực ngay
                </>
              )}
            </button>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm font-bold pt-4">
              <span className="text-gray-400 uppercase tracking-widest text-[10px]">Chưa nhận được mã?</span>
              <button
                className={`flex items-center gap-2 group ${isResending ? 'text-gray-300 cursor-not-allowed' : 'text-blue-600 hover:text-blue-700'}`}
                onClick={handleResendOtp}
                disabled={isResending}
              >
                <RefreshCw className={`w-4 h-4 ${isResending ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
                {countdown > 0 ? (
                  <span className="text-xs">Gửi lại sau {countdown}s</span>
                ) : (
                  <span className="text-xs uppercase tracking-widest">Gửi lại mã OTP</span>
                )}
              </button>
            </div>
          </div>

          {/* Footer Back Link */}
          <Link to="/login" className="inline-flex items-center gap-2 mt-12 text-gray-400 hover:text-gray-600 text-[10px] font-black uppercase tracking-widest transition-colors group">
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
            Quay lại đăng nhập
          </Link>
        </div>
      </div>

      {/* Interest Modal Overlay */}
      {showInterestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar bg-white rounded-[--radius-extra] shadow-2xl animate-in fade-in zoom-in duration-300">
             <InterestModel onConfirm={handleConfirmInterest} />
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;
