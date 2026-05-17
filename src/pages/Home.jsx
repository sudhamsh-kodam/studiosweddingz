import HeroSection from '../components/sections/home/HeroSection';
import FeaturedGallery from '../components/sections/home/FeaturedGallery';
import ServicesOverview from '../components/sections/home/ServicesOverview';
import Testimonials from '../components/sections/home/Testimonials';
import StatsCounter from '../components/sections/home/StatsCounter';
import InstagramFeed from '../components/sections/home/InstagramFeed';
import BookingCTA from '../components/sections/home/BookingCTA';

const Home = () => {
  return (
    <main>
      <HeroSection />
      <FeaturedGallery />
      <ServicesOverview />
      <StatsCounter />
      <Testimonials />
      <InstagramFeed />
      <BookingCTA />
    </main>
  );
};

export default Home;
