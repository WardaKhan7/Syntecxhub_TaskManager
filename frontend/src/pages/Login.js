import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-split-bg">
      <div className="auth-split-card">
        {/* Left Side (Image) */}
        <div className="auth-split-left">
          <img src="/welcome.png" alt="Login Graphic" />
        </div>
        
        {/* Right Side (Form) */}
        <div className="auth-split-right">
          <h2 style={{marginTop: 0, marginBottom: '2rem', fontSize: '2rem'}}>Sign in to your account</h2>
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label style={{fontWeight: 600}}>Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{border: '2px solid #000', borderRadius: '8px', padding: '0.8rem'}}
              />
            </div>
            <div className="form-group">
              <label style={{fontWeight: 600}}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{border: '2px solid #000', borderRadius: '8px', padding: '0.8rem'}}
              />
            </div>
            <button type="submit" className="btn-retro" disabled={loading} style={{width: '100%', marginTop: '1rem'}}>
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
          <div style={{ marginTop: "2rem", textAlign: "center", fontSize: "1rem", fontWeight: 500 }}>
            Don't have an account? <Link to="/register" style={{color: '#000', textDecoration: 'underline'}}>Create one now</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;