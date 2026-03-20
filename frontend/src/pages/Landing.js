import { Link, useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <div className="landing-split">
      {/* Left Side */}
      <div className="landing-left">
        <nav className="landing-nav">
          <div className="landing-nav-logo">
            <img src="/icon.png" alt="TaskMaster Logo" width="40" height="40" />
            TaskMaster
          </div>
          <div className="landing-nav-links">
            {user ? (
              <Link to="/dashboard">Dashboard</Link>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Sign up</Link>
              </>
            )}
          </div>
        </nav>

        <div className="landing-content">
          <h1 className="landing-title">
            &rarr; Manage<br />your tasks<br />productively
          </h1>
          <div className="landing-cta-row">
            {user ? (
              <button onClick={() => navigate("/dashboard")} className="btn-retro">
                Open Dashboard &rarr;
              </button>
            ) : (
              <button onClick={() => navigate("/register")} className="btn-retro">
                Get Started &rarr;
              </button>
            )}
            <p className="landing-desc">
              TaskMaster helps you create and manage tasks in one convenient place.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="landing-right">
        <div className="graphic-container">

          {/* Connective lines */}
          <div className="connective-lines">
            <svg width="100%" height="100%">
              <path d="M 120,380 Q 200,650 400,650 T 600,800" fill="none" stroke="#000" strokeWidth="1.5" />
              <circle cx="120" cy="380" r="6" fill="#000" />
              <circle cx="400" cy="650" r="6" fill="#a855f7" />

              {/* Large outer rings */}
              <circle cx="500" cy="550" r="300" fill="none" stroke="#000" strokeWidth="1" />
              <circle cx="500" cy="550" r="200" fill="none" stroke="#000" strokeWidth="1" />
            </svg>
          </div>

          {/* User Avatar Card */}
          <div className="avatar-card">
            <div className="avatar-img">
              <div style={{ width: '100%', height: '100%', borderRadius: '20px', backgroundColor: '#e2e8f0', backgroundImage: 'url("/imageava.jpg")', backgroundSize: 'cover' }}></div>
            </div>
          </div>

          {/* Purple Asterisk */}
          <div className="purple-asterisk">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L12 22M2 12L22 12M5 5L19 19M5 19L19 5" stroke="#a855f7" strokeWidth="3" />
            </svg>
          </div>

          {/* App Card: Dashboard screenshot replacing Web design-conception */}
          <div className="floating-card card-1">
            <div style={{ width: '100%', height: '200px', borderRadius: '8px', overflow: 'hidden' }}>
              <img src="/dashboard.png?v=2" alt="Dashboard" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '10% 100%', transform: 'scale(1.6)', transformOrigin: '10% 100%' }} />
            </div>
          </div>

          {/* Decorative squiggles */}
          <div className="squiggle">
            <svg width="50" height="50" viewBox="0 0 100 100">
              <path d="M20,50 Q40,20 60,50 T100,50" fill="none" stroke="#000" strokeWidth="4" />
            </svg>
          </div>
          <div className="spiral">
            <svg width="50" height="50" viewBox="0 0 100 100">
              <path d="M50,50 m0,-10 a10,10 0 1,1 0,20 a20,20 0 1,1 0,-40 a30,30 0 1,1 0,60" fill="none" stroke="#000" strokeWidth="4" />
            </svg>
          </div>

          {/* Circle with diamond */}
          <div className="circle-diamond">
            <div className="diamond"></div>
          </div>

          {/* Floating Pills */}
          <div className="floating-pill pill-purple">
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', color: '#a855f7', fontSize: '8px', textAlign: 'center', lineHeight: '10px' }}>&#10003;</div>
              </div>
              Meeting - Marketing
            </span>
            <span className="pill-tag">Details</span>
          </div>
          <div className="floating-pill pill-black">
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', color: '#000', fontSize: '8px', textAlign: 'center', lineHeight: '10px' }}>&#10003;</div>
              </div>
              Design Mobile Version
            </span>
            <span className="pill-tag" style={{ background: 'rgba(255,255,255,0.1)' }}>Details</span>
          </div>
          <div className="floating-pill pill-white">
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', color: 'white', fontSize: '8px', textAlign: 'center', lineHeight: '10px' }}>&#10003;</div>
              </div>
              View Analytics
            </span>
            <span className="pill-tag" style={{ border: '1px solid #ccc', color: '#000' }}>Details</span>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Landing;
