import Navigation from '@/components/Navigation'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import StrengthsSection from '@/components/sections/StrengthsSection'
import LeadershipSection from '@/components/sections/LeadershipSection'
import SkillsSection from '@/components/sections/SkillsSection'
import EducationSection from '@/components/sections/EducationSection'
import ContactSection from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <main className="relative min-h-screen bg-slate-50 overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <StrengthsSection />
      <LeadershipSection />
      <SkillsSection />
      <EducationSection />
      <ContactSection />
    </main>
  )
}
