import Navigation from './layout/Navigation';
import Footer from './layout/Footer';
import HeroSection from './home/HeroSection';
import AboutSection from './home/AboutSection';
import EventsSection from './home/EventsSection';
import GallerySection from './home/GallerySection';
import MembersSection from './home/MembersSection';
import ContestsSection from './home/ContestsSection';
import CTASection from './home/CTASection';
import Chatbot from './shared/Chatbot';

function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        <HeroSection />
        <AboutSection />
        <EventsSection />
        <GallerySection />
        <MembersSection />
        <ContestsSection />
        <CTASection />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}

export default Home;
