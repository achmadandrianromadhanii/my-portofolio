import Preloader from "@/components/ui/Preloader";
import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";

function SectionDivider() {
  return (
    <div className="w-full max-w-5xl mx-auto px-6">
      <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Preloader />
      <HeroSection id="hero" />
      <SectionDivider />
      {/* Penjelasan: ExperienceSection telah dihapus dari halaman utama sesuai dengan permintaan. Layout tetap dipertahankan dengan SectionDivider yang ada. */}
      <ProjectsSection id="projects" />
      <SectionDivider />
      <SkillsSection id="skills" />
      <SectionDivider />
      <AboutSection id="about" />
      <SectionDivider />
      {/* Penjelasan: ContactSection telah dikembalikan sesuai dengan instruksi terbaru Anda agar halaman Contact dapat digunakan kembali. */}
      <ContactSection id="contact" />
    </>
  );
}
