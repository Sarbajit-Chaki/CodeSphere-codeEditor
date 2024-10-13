import About from "@/components/Home/About"
import Features from "@/components/Home/Features"
import Footer from "@/components/Home/Footer"
import HeroSection from "@/components/Home/HeroSection"
import Navbar from "@/components/Home/Navbar"

const Home = () => {
  return (
    <div className=" w-full h-screen relative">
      <Navbar />
      <HeroSection />
      <Features />
      <About />
      <Footer />
    </div>
  )
}

export default Home