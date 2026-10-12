import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { AlertPreview, ConvergencePreview } from "@/components/sections/AlertPreviews";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <AlertPreview />
        <ConvergencePreview />
        {/* Plus tard : <LiveAlerts /> — dernières alertes du bot lues dans Supabase */}
        <Pricing />
        <Faq />
      </main>
      <Footer />
      <RevealOnScroll />
    </>
  );
}
