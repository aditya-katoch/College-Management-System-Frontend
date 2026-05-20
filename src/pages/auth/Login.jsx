import { useState } from "react";
import ShowIcon from "../../icons/ShowIcon";
import HideIcon from "../../icons/HideIcon";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#F0F6FF] flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-[#185FA5] rounded-xl mb-4">
            <span className="text-white text-xl font-medium">CMS</span>
          </div>

          <h1 className="text-xl font-medium text-[#042C53]">
            College Management System
          </h1>

          <p className="text-sm text-[#378ADD] mt-1">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-xl border border-[#B5D4F4] overflow-hidden">
          <div className="p-6">
            <form onSubmit={(e) => e.preventDefault()}>

              <div className="mb-4">
                <label className="block text-xs font-medium text-[#185FA5] mb-1.5">
                  Email address
                </label>

                <input
                  type="email"
                  placeholder="you@cms.edu"
                  className="w-full px-3 py-2.5 text-sm rounded-lg border border-[#B5D4F4]
                  bg-[#F0F6FF] text-[#042C53] placeholder-[#85B7EB]
                  focus:outline-none focus:border-[#185FA5]
                  focus:bg-white transition"
                />
              </div>

              <div className="mb-6">
                <label className="block text-xs font-medium text-[#185FA5] mb-1.5">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full px-3 py-2.5 text-sm rounded-lg border border-[#B5D4F4]
                    bg-[#F0F6FF] text-[#042C53] placeholder-[#85B7EB]
                    focus:outline-none focus:border-[#185FA5]
                    focus:bg-white transition"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2
    text-[#378ADD] hover:text-[#185FA5] transition"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <ShowIcon /> : <HideIcon />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 text-sm font-medium bg-[#185FA5]
                text-white rounded-lg hover:bg-[#0C447C] transition"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>

        <p className="text-center text-xs text-[#378ADD] mt-6">
          College Management System · Admin Portal
        </p>
      </div>
    </div>
  );
}

export default Login;
