import { useState, type FormEvent } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { registerUser } from "../../services/authServices";

function getRegistrationError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data: unknown = error.response?.data;
    if (data && typeof data === "object") {
      const record = data as Record<string, unknown>;
      if (typeof record.message === "string") return record.message;
      const fieldMessage = Object.values(record).find(
        (value): value is string => typeof value === "string"
      );
      if (fieldMessage) return fieldMessage;
    }
  }
  return "We couldn't create your account. Please check your details and try again.";
}

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [createdEmail, setCreatedEmail] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Choose a password with at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Your passwords don't match. Please check and try again.");
      return;
    }
    if (!/^[0-9]{10}$/.test(phone)) {
      setError("Enter a 10-digit phone number.");
      return;
    }

    try {
      setLoading(true);
      const user = await registerUser({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        phone,
        password,
      });
      setCreatedEmail(user.email || email.trim().toLowerCase());
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      setError(getRegistrationError(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="nc-auth nc-auth--register">
      <div className="nc-auth__layout">
        <section className="nc-auth__story nc-auth__story--register">
          <div className="nc-auth__story-top">
            <span className="nc-auth__brand">nova<span>cart</span><i>✳</i></span>
            <span className="nc-auth__edition">A NEW CHAPTER · 001</span>
          </div>
          <div className="nc-auth__story-copy">
            <p className="nc-auth__eyebrow"><span /> COME ON IN</p>
            <h1>Make room<br />for <em>good things.</em></h1>
            <p className="nc-auth__story-description">
              Create your account and make every visit feel a little more personal. Your next favourite find is waiting.
            </p>
            <div className="nc-auth__register-orbit" aria-hidden="true"><b>✳</b><span>THE GOOD<br />FINDS CLUB</span></div>
          </div>
          <div className="nc-auth__story-footer">
            <span>YOUR EVERYDAY,</span>
            <span>WITH A LITTLE EXTRA. ↗</span>
          </div>
        </section>

        <section className="nc-auth__form-panel">
          <div className="nc-auth__form-wrap nc-auth__form-wrap--register">
            <Link to="/" className="nc-auth__back">← Back to the store</Link>
            {createdEmail ? (
              <div className="nc-auth__success-state">
                <span className="nc-auth__success-mark">✓</span>
                <p className="nc-auth__kicker">YOU’RE ON THE LIST</p>
                <h2>Account <em>created.</em></h2>
                <p>Your NovaCart account is ready for <strong>{createdEmail}</strong>. Sign in to start exploring.</p>
                <Link className="nc-auth__submit nc-auth__success-link" to={`/login?registered=1&email=${encodeURIComponent(createdEmail)}`}>
                  <span>Continue to sign in</span><span aria-hidden="true">↗</span>
                </Link>
              </div>
            ) : (
              <>
                <div className="nc-auth__heading">
                  <p className="nc-auth__kicker">JOIN THE GOOD FINDS CLUB</p>
                  <h2>Create your <em>account.</em></h2>
                  <p>A few details and you’re good to go.</p>
                </div>

                <form onSubmit={handleSubmit} className="nc-auth__form">
                  <div className="nc-auth__field-grid">
                    <div className="nc-auth__field">
                      <label htmlFor="register-first-name">First name</label>
                      <input id="register-first-name" type="text" value={firstName} onChange={event => setFirstName(event.target.value)} placeholder="First name" autoComplete="given-name" required />
                    </div>
                    <div className="nc-auth__field">
                      <label htmlFor="register-last-name">Last name</label>
                      <input id="register-last-name" type="text" value={lastName} onChange={event => setLastName(event.target.value)} placeholder="Last name" autoComplete="family-name" required />
                    </div>
                  </div>
                  <div className="nc-auth__field">
                    <label htmlFor="register-email">Email address</label>
                    <input id="register-email" type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="you@example.com" autoComplete="email" required />
                  </div>
                  <div className="nc-auth__field">
                    <label htmlFor="register-phone">Phone number</label>
                    <input id="register-phone" type="tel" value={phone} onChange={event => setPhone(event.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="10-digit mobile number" autoComplete="tel" inputMode="numeric" maxLength={10} required />
                  </div>
                  <div className="nc-auth__field-grid">
                    <div className="nc-auth__field">
                      <label htmlFor="register-password">Password</label>
                      <div className="nc-auth__password">
                        <input id="register-password" type={showPassword ? "text" : "password"} value={password} onChange={event => setPassword(event.target.value)} placeholder="At least 8 characters" autoComplete="new-password" minLength={8} required />
                        <button type="button" onClick={() => setShowPassword(value => !value)}>{showPassword ? "Hide" : "Show"}</button>
                      </div>
                    </div>
                    <div className="nc-auth__field">
                      <label htmlFor="register-confirm-password">Confirm password</label>
                      <input id="register-confirm-password" type={showPassword ? "text" : "password"} value={confirmPassword} onChange={event => setConfirmPassword(event.target.value)} placeholder="Repeat password" autoComplete="new-password" required />
                    </div>
                  </div>

                  {error && <div className="nc-auth__notice nc-auth__notice--error" role="alert">{error}</div>}

                  <button type="submit" disabled={loading} className="nc-auth__submit">
                    <span>{loading ? "Creating your account..." : "Create my account"}</span>
                    <span aria-hidden="true">↗</span>
                  </button>
                </form>

                <p className="nc-auth__switch">
                  Already have an account? <Link to="/login">Sign in <span>↗</span></Link>
                </p>
                <p className="nc-auth__fineprint">Your details stay with your account. We’ll never ask for your payment credentials here.</p>
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
