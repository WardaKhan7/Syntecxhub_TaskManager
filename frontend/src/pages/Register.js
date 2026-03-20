import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        "http://localhost:5000/api/auth/register",
        { name, email, password }
      );

      alert("Registration successful! Please log in.");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-split-bg">
      <div className="auth-split-card">
        {/* Left Side (Image) */}
        <div className="auth-split-left">
          <img src="/welcome.png" alt="Signup Graphic" />
        </div>
        
        {/* Right Side (Form) */}
        <div className="auth-split-right">
          <h2 style={{marginTop: 0, marginBottom: '2rem', fontSize: '2rem'}}>Create an account</h2>
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label style={{fontWeight: 600}}>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{border: '2px solid #000', borderRadius: '8px', padding: '0.8rem'}}
              />
            </div>
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
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>
          <div style={{ marginTop: "2rem", textAlign: "center", fontSize: "1rem", fontWeight: 500 }}>
            Already have an account? <Link to="/login" style={{color: '#000', textDecoration: 'underline'}}>Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
