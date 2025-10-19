import { useState, type ChangeEvent } from 'react';
import { toast } from "sonner"
import api from '../../../../api/axios';
import { useNavigate } from 'react-router-dom';
import { extractErrorMessages } from '../../../../utils/helpers/extractErrorMessages';
import { validateSignup, type FormErrors } from "../utils/Validators";

interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  companyName: string;
  proofDocument: File | null;
  termsAccepted: boolean;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  companyName: '',
  proofDocument: null,
  termsAccepted: false,
};

export const useSignup = () => {
  const [accountType, setAccountType] = useState<'buyer' | 'seller'>('buyer');
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const navigate = useNavigate();

  const [otpEmail, setOtpEmail] = useState<string | null>(null);
  const [otpExpiresAt, setOtpExpiresAt] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
          : type === 'file'
          ? files?.[0] ?? null
          : value,
    }));
  };
  const handlePhoneChange = (phone: string) => {
  setFormData((prev) => ({ ...prev, phone }));
};


  const handleSubmit = async () => {
    const validationErrors = validateSignup(formData, accountType);
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    toast.error("Please fix the errors in the form");
    return;
  }

  setErrors({}); 

    try {
      setLoading(true);

      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('email', formData.email);
      payload.append('phone', formData.phone);
      payload.append('password', formData.password);
      payload.append('userType', accountType);
      if (accountType === "seller") {
        payload.append("companyName", formData.companyName);
        if (formData.proofDocument) {
          payload.append("companyProof", formData.proofDocument);
        }
      }

      payload.append('purpose', 'signup');

      const response = await api.post('/otp/generate-otp', payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('OTP sent to email. Please verify.');
      
      setOtpEmail(formData.email);
      // Store the expiresAt from backend response
      if (response.data.expiresAt) {
        setOtpExpiresAt(response.data.expiresAt);
      }

    } catch (err: unknown) {
      toast.error(extractErrorMessages(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  const handleOtpVerified = () => {
    // Clear all form data
    setFormData(initialFormData);
    setOtpEmail(null);
    setOtpExpiresAt(null);
    setAccountType('buyer');
    setTimeout(() => {
      navigate('/login');
    }, 500);
  };

  // Handle OTP modal close without verification
  const handleOtpClose = () => {
    setOtpEmail(null);
    setOtpExpiresAt(null);
  };

  return {
    accountType,
    setAccountType,
    formData,
    handleChange,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    loading,
    errors,
    handleSubmit,
    handlePhoneChange,
    handleSignIn,
    otpEmail,
    otpExpiresAt,
    handleOtpVerified,
    handleOtpClose,
  };
};