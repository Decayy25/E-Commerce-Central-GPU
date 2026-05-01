import React from "react";
import { RegisterForm } from "../components/templates/RegisterForm";
import logo from "../assets/Logo.png";

const RegisterPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg border border-gray-300 shadow-lg w-full max-w-sm flex flex-col items-center min-h-[500px]">
        {/* Logo Section */}
        <div className="mb-8">
          <div className="w-32 h-32 flex items-center justify-center">
            <img src={logo} />
          </div>
        </div>

        {/* Form Organism */}
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
