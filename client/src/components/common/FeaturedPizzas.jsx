import "../../styles/common/featuredPizzas.css";

function FeaturedPizzas() {

    const pizzas = [

        {
            id: 1,
            name: "Margherita",
            description: "Classic mozzarella with fresh basil",
            price: "₹299",
            image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=600"
        },

        {
            id: 2,
            name: "Pepperoni",
            description: "Loaded with premium pepperoni",
            price: "₹399",
            image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600"
        },

        {
            id: 3,
            name: "Veggie Delight",
            description: "Fresh vegetables & mozzarella",
            price: "₹349",
            image: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Supreme_pizza.jpg"
        }

    ];

    return (

        <section className="featured">

            <div className="container">

                <p className="featured-tag">
                    Our Menu
                </p>

                <h2 className="featured-title">
                    Signature Pizzas
                </h2>

                <p className="featured-subtitle">
                    Freshly baked using premium ingredients and handcrafted recipes.
                </p>

                <div className="pizza-grid">

                    {pizzas.map((pizza) => (

                        <div className="pizza-card" key={pizza.id}>

                            <img src={pizza.image} alt={pizza.name} />

                            <div className="pizza-content">

                                <h3>{pizza.name}</h3>

                                <p>{pizza.description}</p>

                                <div className="pizza-footer">

                                    <span>{pizza.price}</span>

                                    

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>

    );

}

export default FeaturedPizzas;