import Preloader from "@/components/ui/Preloader";
import HeroSection from "@/components/sections/HeroSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <Preloader />
      <HeroSection id="hero" />
      <ExperienceSection id="experience" />
      <ProjectsSection id="projects" />
      <SkillsSection id="skills" />
      <AboutSection id="about" />
      <ContactSection id="contact" />
    </>
  );
}
