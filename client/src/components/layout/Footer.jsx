import "../../styles/layout/footer.css";
import { FaInstagram, FaFacebookF, FaTwitter, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <div className="container footer-container">

        <div className="footer-brand">

          <h2 className="logo">LaCrosta</h2>

          <p>
            Freshly handcrafted pizzas made with love, premium ingredients,
            and endless customization.
          </p>

        </div>

        <div className="footer-links">

          <h4>Quick Links</h4>

          <a href="/">Home</a><br/>
          <a href="/pizza-builder">Craft Pizza</a><br/>
          <a href="/orders">My Orders</a><br/>
          <a href="/login">Login</a>

        </div>

        <div className="footer-contact">

          <h4>Contact</h4>

          <p>📍 Thrissur, Kerala</p>
          <p>📞 +91 **********</p>
          <p>✉️ support@lacrosta.com</p>

        </div>

        <div className="footer-social">

          <h4>Follow Us</h4>

          <div className="social-icons">

            <a href="#"><FaInstagram /></a>
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            

          </div>

        </div>

      </div>

      <div className="footer-bottom">
        © 2026 LaCrosta. All Rights Reserved.
      </div>

    </footer>
  );
}

export default Footer;