import LandingContent from "@/components/home/LandingContent";
import LandingHero from "@/components/home/LandingHero";
import LandingNavbar from "@/components/home/LandingNavbar";

export default function LandingPage() {
  return (
    <div className="h-full">
      <LandingNavbar />
      <LandingHero />
      <LandingContent />
    </div>
  );
}
