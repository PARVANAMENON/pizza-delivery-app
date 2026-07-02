import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/common/Hero";
import FeaturedPizzas from "../../components/common/FeaturedPizzas";
import WhyChoose from "../../components/common/WhyChoose";
import HowItWorks from "../../components/common/HowItWorks";
import Testimonials from "../../components/common/Testimonials";
import CTA from "../../components/common/CTA";
import Footer from "../../components/layout/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedPizzas />
      <WhyChoose />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}

export default Home;