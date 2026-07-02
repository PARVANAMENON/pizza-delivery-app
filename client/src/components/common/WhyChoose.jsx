import "../../styles/common/whyChoose.css";

function WhyChoose() {

  const features = [
    {
      icon: "🍅",
      title: "Fresh Ingredients",
      text: "Every pizza is made with handpicked fresh ingredients."
    },
    {
      icon: "👨‍🍳",
      title: "Expert Chefs",
      text: "Crafted by experienced chefs with passion and care."
    },
    {
      icon: "🚚",
      title: "Fast Delivery",
      text: "Hot and fresh pizzas delivered to your doorstep."
    },
    {
      icon: "⭐",
      title: "Premium Quality",
      text: "Only premium ingredients for the perfect taste."
    }
  ];

  return (
    <section className="why-choose">

      <div className="container">

        <p className="why-tag">Why Choose Us</p>

        <h2>Why Choose LaCrosta?</h2>

        <div className="feature-grid">

          {features.map((feature, index) => (

            <div className="feature-card" key={index}>

              <div className="feature-icon">
                {feature.icon}
              </div>

              <h3>{feature.title}</h3>

              <p>{feature.text}</p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default WhyChoose;