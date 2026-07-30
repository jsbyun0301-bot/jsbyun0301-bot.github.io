import { useState } from 'react';
import { AWARDS_FEATURED_ASSETS } from '@/config/featured-assets';
import PrizeCard from '@/features/prize/components/PrizeCard';
import PrizeModal from '@/features/prize/components/PrizeModal';
import { prizeList } from '@/features/prize/data/prizeData';
import { useImagePreload } from '@/utils/preloadAssets';

export default function PrizePage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useImagePreload(AWARDS_FEATURED_ASSETS);

  return (
    <div className='min-h-full bg-[#f9f9f9] px-4 py-4 md:px-[30px] md:py-[18px]'>
      <div className='grid [grid-template-columns:repeat(auto-fill,minmax(300px,1fr))] gap-5'>
        {prizeList.map((prize, idx) => (
          <PrizeCard
            key={idx}
            src={prize.src}
            title={prize.title}
            date={prize.date}
            organization={prize.organization}
            description={prize.description}
            priority={idx < 4}
            onClick={() => setSelectedImage(prize.src)}
          />
        ))}
      </div>
      {selectedImage && (
        <PrizeModal
          imageSrc={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}
