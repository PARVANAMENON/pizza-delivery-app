import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { verifyEmail } from "../../services/authService";
import "../../styles/user/verifyEmail.css";

function VerifyEmail() {
  const { token } = useParams();

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await verifyEmail(token);

        setSuccess(true);
        setMessage(response.data.message);
      } catch (error) {
        setSuccess(false);
        setMessage(
          error.response?.data?.message ||
          "Unable to verify your email."
        );
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [token]);

  return (
    <div className="verify-page">

      <div className="verify-card">

        <h1 className="logo">LaCrosta</h1>

        {loading ? (
          <>
            <h2>Verifying Email...</h2>
            <p>Please wait while we verify your account.</p>
          </>
        ) : success ? (
          <>
            <h2>Email Verified ✅</h2>

            <p className="success-message">
              {message}
            </p>

            <Link to="/login" className="verify-btn">
              Go to Login
            </Link>
          </>
        ) : (
          <>
            <h2>Verification failed</h2>

            <p className="error-message">
              {message}
            </p>

            <Link to="/register" className="verify-btn">
              
            </Link>
          </>
        )}

      </div>

    </div>
  );
}

export default VerifyEmail;