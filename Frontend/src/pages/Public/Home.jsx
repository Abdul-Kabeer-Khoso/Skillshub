import HeroSection from "../../components/HeroSection";
import ExpertProfile from "../../components/ExpertProfile";
import Footer from "../../components/Footer";
import { useState } from "react";

const Home = () => {
  const [formData, setFormData] = useState("");
  const onChange = (e) => {
    setFormData(e.target.value);
  };
  return (
    <>
      <HeroSection formData={formData} onChange={onChange} />
      <ExpertProfile inputValue={formData} />
      <Footer />
    </>
  );
};

export default Home;
