import heroPizza from "../../assets/images/hero-pizza.png";
import "../../styles/common/hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="container hero-container">

        <div className="hero-content">

          <p className="hero-tagline">
            🍕 Where Every Slice Tells a Story
          </p>

          <h1>
            Craft Your <span>Perfect Pizza</span>
          </h1>

          <p className="hero-description">
            Fresh ingredients, handcrafted recipes, and endless
            customization. Build your pizza exactly the way you love it.
          </p>

         

        </div>

        <div className="hero-image">
          <img src={heroPizza} alt="LaCrosta Pizza" />
        </div>

      </div>
    </section>
  );
}

export default Hero;