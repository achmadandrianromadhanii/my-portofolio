import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection id="hero" />
      <ProjectsSection id="projects" />
      <SkillsSection id="skills" />
      <AboutSection id="about" />
      <ContactSection id="contact" />
    </>
  );
}
