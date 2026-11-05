import { useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { login } from "../../services/authServices";
import { useAuth } from "../../context/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState(searchParams.get("email") ?? "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login: authenticate } = useAuth();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Enter your email address and password to continue.");
      return;
    }

    try {
      setLoading(true);
      const data = await login({ email: email.trim(), password });
      authenticate(data.token);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("We couldn't sign you in. Check your email and password and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="nc-auth">
      <div className="nc-auth__layout">
        <section className="nc-auth__story">
          <div className="nc-auth__story-top">
            <span className="nc-auth__brand">nova<span>cart</span><i>✳</i></span>
            <span className="nc-auth__edition">THE EVERYDAY EDIT · 001</span>
          </div>
          <div className="nc-auth__story-copy">
            <p className="nc-auth__eyebrow"><span /> YOUR GOOD THINGS ARE WAITING</p>
            <h1>Good to<br /><em>see you.</em></h1>
            <p className="nc-auth__story-description">
              The things you love, all in one place. Sign in to pick up where you left off and discover what’s new.
            </p>
            <div className="nc-auth__story-stamp" aria-hidden="true">
              <span>GOOD<br />THINGS</span><b>✳</b>
            </div>
          </div>
          <div className="nc-auth__story-footer">
            <span>CURIOUS BY NATURE.</span>
            <span>BETTER BY DESIGN. ↗</span>
          </div>
        </section>

        <section className="nc-auth__form-panel">
          <div className="nc-auth__form-wrap">
            <Link to="/" className="nc-auth__back">← Back to the store</Link>
            {searchParams.get("registered") === "1" && (
              <div className="nc-auth__notice nc-auth__notice--success" role="status">
                Your account is ready. Sign in with your new credentials.
              </div>
            )}
            <div className="nc-auth__heading">
              <p className="nc-auth__kicker">YOUR NOVACART ACCOUNT</p>
              <h2>Welcome <em>back.</em></h2>
              <p>Good finds are just a sign-in away.</p>
            </div>

            <form onSubmit={handleSubmit} className="nc-auth__form">
              <div className="nc-auth__field">
                <label htmlFor="login-email">Email address</label>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="nc-auth__field">
                <div className="nc-auth__label-row">
                  <label htmlFor="login-password">Password</label>
                </div>
                <div className="nc-auth__password">
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                  />
                  <button type="button" onClick={() => setShowPassword((value) => !value)}>
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {error && <div className="nc-auth__notice nc-auth__notice--error" role="alert">{error}</div>}

              <button type="submit" disabled={loading} className="nc-auth__submit">
                <span>{loading ? "Signing you in..." : "Sign in to NovaCart"}</span>
                <span aria-hidden="true">↗</span>
              </button>
            </form>

            <p className="nc-auth__switch">
              New around here? <Link to="/register">Create your account <span>↗</span></Link>
            </p>
            <p className="nc-auth__fineprint">By continuing, you agree to shop thoughtfully and enjoy the little things.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
