import React from "react";
import { LoginForm } from "@/components/login-form";

const AdminSignin = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full pt-6 max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  );
};

export default AdminSignin;
