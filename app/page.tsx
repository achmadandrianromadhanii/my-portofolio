import Preloader from "@/components/ui/Preloader";
import HeroSection from "@/components/sections/HeroSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
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
      <ExperienceSection id="experience" />
      <SectionDivider />
      <ProjectsSection id="projects" />
      <SectionDivider />
      <SkillsSection id="skills" />
      <SectionDivider />
      <AboutSection id="about" />
      <SectionDivider />
      <ContactSection id="contact" />
    </>
  );
}
