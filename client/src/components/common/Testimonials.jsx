import "../../styles/common/testimonials.css";

function Testimonials() {

  const reviews = [
    {
      id: 1,
      name: "Aarav Sharma",
      rating: "★★★★★",
      review:
        "Absolutely delicious! The pizza was fresh, hot, and delivered on time.",
    },
    {
      id: 2,
      name: "Priya Menon",
      rating: "★★★★★",
      review:
        "Loved the custom pizza builder. Everything tasted amazing!",
    },
    {
      id: 3,
      name: "Rahul Nair",
      rating: "★★★★★",
      review:
        "Best pizza ordering experience. Highly recommended!",
    },
  ];

  return (
    <section className="testimonials">

      <div className="container">

        <p className="testimonial-tag">
          Happy Customers
        </p>

        <h2>What Our Customers Say</h2>

        <div className="testimonial-grid">

          {reviews.map((review) => (

            <div className="testimonial-card" key={review.id}>

              <div className="stars">{review.rating}</div>

              <p>"{review.review}"</p>

              <h4>{review.name}</h4>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Testimonials;