import "../../styles/common/howItWorks.css";

function HowItWorks() {

    const steps = [

        {
            number: "01",
            title: "Choose Pizza",
            description: "Browse our delicious collection of handcrafted pizzas."
        },

        {
            number: "02",
            title: "Customize",
            description: "Select your favourite base, sauce, cheese and toppings."
        },

        {
            number: "03",
            title: "Secure Payment",
            description: "Checkout safely using Razorpay with quick payment."
        },

        {
            number: "04",
            title: "Fast Delivery",
            description: "Sit back while we prepare and deliver your pizza hot."
        }

    ];

    return (

        <section className="how-it-works">

            <div className="container">

                <p className="section-tag">
                    Simple Process
                </p>

                <h2 className="section-heading">
                    How It Works
                </h2>

                <div className="steps">

                    {steps.map((step) => (

                        <div className="step-card" key={step.number}>

                            <div className="step-number">
                                {step.number}
                            </div>

                            <h3>{step.title}</h3>

                            <p>{step.description}</p>

                        </div>

                    ))}

                </div>

            </div>

        </section>

    );

}

export default HowItWorks;