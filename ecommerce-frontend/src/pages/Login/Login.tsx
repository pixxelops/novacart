import { useState, type SubmitEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../services/authServices';
import { useAuth } from '../../context/useAuth';


const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error,setError] = useState("");

    const {login:authenticate} = useAuth();

    async function handleSubmit(event : SubmitEvent<HTMLFormElement>){
        event.preventDefault();

        setError("");

        if(!email || !password){
            setError("Please enter your email/password");
            return;
        }


        try{
            setLoading(true);

            const data = await login({
                email,
                password,
            
            });

            authenticate(data.token);
            navigate("/");
        }catch(error){
            console.error(error);
            setError("Invalid Email or password");
        }finally{
            setLoading(false);
        }   
    }
  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#faf9f6]">

      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl lg:grid-cols-2">

        {/* Left side */}
        <div className="hidden items-center justify-center bg-[#e9e5dc] p-12 lg:flex">

          <div className="max-w-md">

            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
              Welcome back
            </p>

            <h1 className="mt-5 text-6xl font-black leading-[0.95] tracking-tight text-gray-950">
              Good to
              <span className="block italic font-medium">
                see you.
              </span>
            </h1>

            <p className="mt-7 text-lg leading-8 text-gray-600">
              Sign in to continue shopping, manage your cart,
              and keep track of your orders.
            </p>

          </div>

        </div>

        {/* Right side */}
        <div className="flex items-center justify-center px-6 py-16">

          <div className="w-full max-w-md">

            <div className="mb-10">

              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
                Account
              </p>

              <h2 className="mt-3 text-4xl font-black tracking-tight text-gray-950">
                Sign in
              </h2>

              <p className="mt-3 text-gray-500">
                Enter your details to access your account.
              </p>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* Email */}
              <div>

                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-gray-900"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black"
                />

              </div>

              {/* Password */}
              <div>

                <div className="mb-2 flex items-center justify-between">

                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-gray-900"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs font-medium text-gray-500 hover:text-black"
                  >
                    Forgot password?
                  </button>

                </div>

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black"
                />

              </div>

              {/* Error */}
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-black px-6 py-4 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>

            </form>

            <p className="mt-8 text-center text-sm text-gray-500">

              Don't have an account?{" "}

              <Link
                to="/register"
                className="font-semibold text-gray-900 underline underline-offset-4"
              >
                Create account
              </Link>

            </p>

          </div>

        </div>

      </div>

    </main>
  )
}

export default Login
