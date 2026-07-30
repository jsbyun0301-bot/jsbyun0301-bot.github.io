import { useState } from 'react';
import { Chips } from './Chips';
import {
  Divider,
  FieldRow,
  ProjectLayout,
  SectionTitle,
} from './ProjectLayout';
import { GitHubLink } from './GitHubLink';
import type { ProjectData, ProjectImageItem } from './types';
import { ProjectImageGrid } from './ProjectImageGrid';
import { ProjectImageModal } from './ProjectImageModal';
import { useImagePreload } from '@/utils/preloadAssets';

export function ProjectDetail({ data: D }: { data: ProjectData }) {
  const [selectedImage, setSelectedImage] = useState<ProjectImageItem | null>(
    null
  );

  useImagePreload(D.featuredAssets ?? [D.hero]);

  // 이미지가 없는 섹션은 2열 카드 그리드로, 이미지가 있는 섹션은 full-width로 렌더한다.
  const textSections =
    D.sections?.filter((s) => !s.images || s.images.length === 0) ?? [];
  const imageSections =
    D.sections?.filter((s) => s.images && s.images.length > 0) ?? [];

  return (
    <ProjectLayout>
      <div className='grid grid-cols-1 lg:grid-cols-10 gap-4 mb-6 items-stretch'>
        <div
          className={`${
            D.hero ? 'lg:col-span-7' : 'lg:col-span-10'
          } border border-[#e2e2e2] rounded-[16px] p-5 bg-white shadow-sm`}
        >
          <div className='flex flex-wrap items-center gap-3'>
            <h1 className='text-2xl md:text-[28px] font-bold'>{D.title}</h1>
            {D.category && <Chips items={[D.category]} />}
          </div>
          {D.summary && (
            <p className='text-[15px] text-[#444] mt-2'>{D.summary}</p>
          )}

          {D.highlights && D.highlights.length > 0 && (
            <div className='flex flex-wrap gap-2 mt-3'>
              {D.highlights.map((h) => (
                <span
                  key={h}
                  className='text-xs font-semibold text-[#1f2937] bg-[#e6eefc] px-2 py-1 rounded-full'
                >
                  {h}
                </span>
              ))}
            </div>
          )}

          <div className='mt-4'>
            {D.skills && (
              <FieldRow label='Skills'>
                <Chips items={D.skills} />
              </FieldRow>
            )}
            {D.tools && (
              <FieldRow label='Tools'>
                <Chips items={D.tools} />
              </FieldRow>
            )}
            {D.period && (
              <FieldRow label='진행기간'>
                <div>{D.period}</div>
              </FieldRow>
            )}
            {D.members && (
              <FieldRow label={D.membersLabel ?? '개발 인원'}>
                <div>{D.members}</div>
              </FieldRow>
            )}
            {D.roles && (
              <FieldRow label='역할'>
                <Chips items={D.roles} />
              </FieldRow>
            )}
            {D.contribution && (
              <FieldRow label='기여도'>
                <div>{D.contribution}</div>
              </FieldRow>
            )}
            {D.result && (
              <FieldRow label='성과'>
                {Array.isArray(D.result) ? (
                  <div className='flex flex-col gap-1'>
                    {D.result.map((r) => (
                      <div key={r}>{r}</div>
                    ))}
                  </div>
                ) : (
                  <div>{D.result}</div>
                )}
              </FieldRow>
            )}
            {D.githubUrl && (
              <FieldRow label='GitHub'>
                <GitHubLink url={D.githubUrl} />
              </FieldRow>
            )}
          </div>
        </div>

        {D.hero && (
          <div className='lg:col-span-3 h-full'>
            <div className='border border-[#e2e2e2] rounded-[16px] bg-white shadow-sm w-full max-w-[360px] mx-auto lg:ml-auto h-full flex items-center justify-center'>
              <img
                src={D.hero}
                alt={`프로젝트 대표 이미지: ${D.title}`}
                className='w-full h-full max-h-[450px] object-contain'
                loading='eager'
                decoding='async'
              />
            </div>
          </div>
        )}
      </div>

      {D.responsibilities && D.responsibilities.length > 0 && (
        <div className='mb-6'>
          <SectionTitle>기여도 및 역할</SectionTitle>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
            {D.responsibilities.map((r) => (
              <div
                key={r.title}
                className='border border-[#e2e2e2] rounded-[14px] p-4 bg-white shadow-sm'
              >
                <div className='text-[15px] font-bold mb-2'>{r.title}</div>
                <ul className='text-sm text-[#333] leading-relaxed list-disc pl-5'>
                  {r.items.map((it, i) => (
                    <li key={i} className='mb-2'>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {D.outcomes && D.outcomes.length > 0 && (
        <div className='mb-6'>
          <SectionTitle>성과</SectionTitle>
          <div className='border border-[#e2e2e2] rounded-[14px] p-4 bg-white shadow-sm'>
            <ul className='text-sm text-[#333] leading-relaxed list-disc pl-5'>
              {D.outcomes.map((o, i) => (
                <li key={i} className='mb-2'>
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <Divider />

      {textSections.length > 0 && D.sectionsTitle && (
        <div className='mb-3'>
          <SectionTitle>{D.sectionsTitle}</SectionTitle>
          {D.sectionsIntro && (
            <p className='text-[15px] text-[#444] -mt-1'>{D.sectionsIntro}</p>
          )}
        </div>
      )}

      {textSections.length > 0 && (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6 items-start'>
          {textSections.map((s) => (
            <div
              key={s.title}
              className='border border-[#e2e2e2] rounded-[16px] p-5 bg-white shadow-sm h-full'
            >
              <div className='text-[16px] font-bold mb-3'>{s.title}</div>
              <ul className='text-sm text-[#333] leading-relaxed list-disc pl-5'>
                {s.bullets?.map((b, i) => (
                  <li key={i} className='mb-2'>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {imageSections.map((s) => (
        <div
          key={s.title}
          className='border border-[#e2e2e2] rounded-[16px] p-5 bg-white shadow-sm mb-6'
        >
          {/* 1~2장 섹션은 제목을 왼쪽 칸 안에 넣어 내용과 함께 중앙 정렬한다 */}
          {!(
            s.layout !== 'showcase' &&
            (s.images?.length ?? 0) > 0 &&
            (s.images?.length ?? 0) < 3
          ) && <SectionTitle>{s.title}</SectionTitle>}
          {(() => {
            const images = (s.images ?? []) as (string | ProjectImageItem)[];
            const items = images.map((img) =>
              typeof img === 'string'
                ? { src: img, alt: s.title }
                : {
                    src: img.src,
                    alt: img.alt ?? s.title,
                    description: img.description,
                    points: img.points,
                  }
            );

            // showcase: 화면(왼쪽) + 설명(오른쪽)을 한 행씩 나열
            if (s.layout === 'showcase') {
              return (
                <div className='flex flex-col gap-4'>
                  {s.bullets && s.bullets.length > 0 && (
                    <ul className='text-sm text-[#333] leading-relaxed list-disc pl-5'>
                      {s.bullets.map((b, i) => (
                        <li key={i} className='mb-2'>
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className='flex flex-col divide-y divide-[#eee]'>
                    {items.map((item) => (
                      <div
                        key={item.src}
                        className='flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:gap-6'
                      >
                        <button
                          type='button'
                          onClick={() => setSelectedImage(item)}
                          className='w-[170px] shrink-0 cursor-zoom-in self-center rounded-[12px] border border-[#e5e7eb] bg-white p-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.07)] sm:self-start'
                        >
                          <img
                            src={item.src}
                            alt={item.alt ?? ''}
                            className='w-full object-contain'
                            loading='lazy'
                            decoding='async'
                          />
                        </button>
                        <div className='min-w-0 flex-1 max-w-[720px]'>
                          <div className='text-[17px] font-bold text-[#111]'>
                            {item.alt}
                          </div>
                          {item.points && item.points.length > 0 ? (
                            <ul className='mt-3 list-disc pl-5 text-[15px] leading-relaxed text-[#333]'>
                              {item.points.map((p, i) => (
                                <li key={i} className='mb-1.5'>
                                  {p}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            item.description && (
                              <p className='mt-3 text-[15px] leading-relaxed text-[#333]'>
                                {item.description}
                              </p>
                            )
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            const hasBullets = Boolean(s.bullets && s.bullets.length > 0);
            // 이미지가 3장 이상일 때만 아래에 나열하고, 1~2장은 글 오른쪽에 배치한다.
            const stacked = items.length >= 3;

            const bulletList = hasBullets ? (
              <ul className='text-[15px] text-[#333] leading-relaxed list-disc pl-5'>
                {s.bullets?.map((b, i) => (
                  <li key={i} className='mb-2'>
                    {b}
                  </li>
                ))}
              </ul>
            ) : null;

            if (stacked) {
              return (
                <div className='flex flex-col gap-4'>
                  {bulletList}
                  <ProjectImageGrid
                    items={items}
                    onImageClick={(item) => setSelectedImage(item)}
                    layout='gallery'
                  />
                </div>
              );
            }

            return (
              <div className='flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-8'>
                <div className='min-w-0 flex-1'>
                  <SectionTitle>{s.title}</SectionTitle>
                  {bulletList}
                </div>
                {items.length > 0 && (
                  <div
                    className={
                      hasBullets
                        ? 'w-full lg:w-[460px] lg:shrink-0'
                        : 'w-full'
                    }
                  >
                    <ProjectImageGrid
                      items={items}
                      onImageClick={(item) => setSelectedImage(item)}
                      layout='gallery'
                    />
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      ))}

      {selectedImage && (
        <ProjectImageModal
          imageSrc={selectedImage.src}
          alt={selectedImage.alt}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </ProjectLayout>
  );
}
