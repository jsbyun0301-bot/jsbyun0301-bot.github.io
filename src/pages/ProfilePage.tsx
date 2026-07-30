import { PROFILE_FEATURED_ASSETS } from '@/config/featured-assets';
import { SideNav } from '@/features/profile/components/SideNav';
import { AboutSection } from '@/features/profile/sections/AboutSection';
import { ContactSection } from '@/features/profile/sections/ContactSection';
import { SkillsSection } from '@/features/profile/sections/SkillsSection';
import { ProjectsSection } from '@/features/profile/sections/ProjectsSection';
import { CareerSection } from '@/features/profile/sections/CareerSection';
import { EducationSection } from '@/features/profile/sections/EducationSection';
import { AwardsSection } from '@/features/profile/sections/AwardsSection';
import { ActivitiesSection } from '@/features/profile/sections/ActivitiesSection';
import { ExperienceSection } from '@/features/profile/sections/ExperienceSection';
import { useImagePreload } from '@/utils/preloadAssets';

function ProfileDivider() {
  return <hr className='my-6 w-full h-px bg-[#ddd] border-0' />;
}

export default function ProfilePage() {
  useImagePreload(PROFILE_FEATURED_ASSETS);

  return (
    <div className='min-h-full w-full bg-[linear-gradient(180deg,#fafafa_0%,#f3f4f6_100%)] text-[#1a1a1a]'>
      <div className='mx-auto w-full max-w-[1480px] px-4 py-4 md:px-6 md:py-6 lg:px-8 lg:py-8'>
        <div className='sticky top-0 z-20 -mx-4 mb-5 border-b border-[#e5e7eb] bg-[#f9f9f9]/95 px-4 py-3 backdrop-blur md:hidden'>
          <SideNav orientation='horizontal' />
        </div>

        <div className='grid grid-cols-1 items-start gap-5 md:grid-cols-[7rem_minmax(0,1fr)] lg:grid-cols-[7.25rem_minmax(0,1fr)] lg:gap-7'>
          <aside className='hidden self-start md:sticky md:top-6 md:block'>
            <SideNav />
          </aside>

          <main className='min-w-0 break-words rounded-[24px] border border-white/70 bg-white/80 px-5 py-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] backdrop-blur-sm md:px-8 md:py-6 [&_img]:h-auto [&_img]:max-w-full'>
            <AboutSection />
            <ProfileDivider />
            <ContactSection />
            <ProfileDivider />
            <SkillsSection />
            <ProfileDivider />
            <ProjectsSection />
            <ProfileDivider />
            <CareerSection />
            <ProfileDivider />
            <EducationSection />
            <ProfileDivider />
            <AwardsSection />
            <ProfileDivider />
            <ActivitiesSection />
            <ProfileDivider />
            <ExperienceSection />
          </main>
        </div>
      </div>
    </div>
  );
}
