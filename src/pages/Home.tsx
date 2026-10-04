import { Hero } from '@/components/sections/home/Hero'
import { ServicesSection } from '@/components/sections/home/ServicesSection'
import { ProcessSection } from '@/components/sections/home/ProcessSection'
import { WhyChooseUsSection } from '@/components/sections/home/WhyChooseUsSection'
import { TestimonialsMarquee } from '@/components/sections/home/TestimonialsMarquee'
import { TrustLogosSection } from '@/components/sections/home/TrustLogosSection'
import { FinalCtaSection } from '@/components/sections/home/FinalCtaSection'
import { Seo } from '@/components/seo/Seo'

export default function Home() {
  return (
    <>
      <Seo
        title="Movers Packers Dubai — Premium Moving & Packing Services"
        description="Dubai’s easiest move. Premium movers, packers, junk removal and delivery services in Dubai — from a single item to full villa relocation."
        canonicalPath="/"
      />
      <Hero />
      <ServicesSection />
      <ProcessSection />
      <WhyChooseUsSection />
      <TestimonialsMarquee />
      <TrustLogosSection />
      <FinalCtaSection />
    </>
  )
}
