import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { FormField } from '../molecules/FormField';
import { Button } from '../atoms/Button';
import { register } from '../../api/api';
import type { RegisterPayload } from '../../api/api';

export const RegisterForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState<RegisterPayload>({
    username: '',
    email: '',
    phone: '',
    birthday: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setMessage(null);

    // Validasi sederhana
    if (formData.password !== formData.confirmPassword) {
      setMessage("Password dan Confirm Password tidak sama.");
      return;
    }

    try {
      setLoading(true);
      const response = await register(formData);
      setMessage(response.message);

      // Reset form setelah berhasil
      setFormData({
        username: '',
        email: '',
        phone: '',
        birthday: '',
        password: '',
        confirmPassword: ''
      });

      setStep(1);
    } catch (error) {
      setMessage((error as Error).message || "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  const Icon = {
    profile: <i className="fas fa-user-circle profile-icon text-var(--Radeon--)"></i>,
    email: <i className="fa-regular fa-envelope text-var(--Radeon--)"></i>,
    phone: <i className="fa-solid fa-phone text-var(--Radeon--)"></i>,
    calendar: <i className="fa-solid fa-calendar text-var(--Radeon--)"></i>,
    password: <i className="fa-solid fa-eye text-var(--Radeon--)"></i>
  };

  return (
    <div className="w-full">
      {step === 1 ? (
        <div className="space-y-4">
          <FormField
            type="text"
            name="username"
            placeholder="Username"
            icon={Icon.profile}
            value={formData.username}
            onChange={handleChange}
          />
          <FormField
            type="email"
            name="email"
            placeholder="Email"
            icon={Icon.email}
            value={formData.email}
            onChange={handleChange}
          />
          <FormField
            type="text"
            name="phone"
            placeholder="Phone Number"
            icon={Icon.phone}
            value={formData.phone}
            onChange={handleChange}
          />

          <div className="flex items-center gap-2">
            <label className="text-[#6ba4d9] font-semibold">Birthday</label>
            <FormField
              type="date"
              name="birthday"
              placeholder="dd/mm/yyyy"
              icon={Icon.calendar}
              value={formData.birthday}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col items-start mt-2">
            <div className="text-[11px] text-blue-500">
              Already have an account?
              <Button variant="link">
                <Link to={"/login"} className='p-2'>Login</Link>
              </Button>
            </div>
            <div className="w-full flex justify-end mt-4">
              <Button onClick={() => setStep(2)}>Next</Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <FormField
            type="password"
            name="password"
            placeholder="Password"
            icon={Icon.password}
            value={formData.password}
            onChange={handleChange}
          />
          <FormField
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            icon={Icon.password}
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          {message && (
            <p className="text-sm text-center text-var(--Radeon--)">{message}</p>
          )}

          <div className="pt-10">
            <Button
              className="w-full"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          </div>
          <button
            onClick={() => setStep(1)}
            className="text-xs text-gray-400 mt-2"
          >
            ← Back
          </button>
        </div>
      )}
    </div>
  );
};