import { useEffect, useMemo, useState } from 'react';

type GitHubUser = {
  avatar_url: string;
  name: string | null;
  login: string;
  bio: string | null;
  blog: string;
  location: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
};

type GitHubRepo = {
  id: number;
  name: string;
  html_url: string;
  homepage: string | null;
  description: string | null;
  language: string | null;
  updated_at: string;
  stargazers_count: number;
};

type GitHubState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; user: GitHubUser; repos: GitHubRepo[] };

const GITHUB_OWNER = 'jsbyun0301-bot';
const USER_API_URL = `https://api.github.com/users/${GITHUB_OWNER}`;

// 보여줄 "대표 저장소" 목록 (public 저장소만 가능).
const FEATURED_REPOS: string[] = [
  'my-vibe-ai-chat',
  'AI-dubbing-app',
  'mococobot',
];

const repoApiUrl = (name: string) =>
  `https://api.github.com/repos/${GITHUB_OWNER}/${name}`;

function formatUpdatedAt(value: string) {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(value));
}

function normalizeExternalUrl(value: string) {
  if (!value) {
    return null;
  }

  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

function LoadingPanel() {
  return (
    <div className='grid h-full gap-5 bg-[linear-gradient(180deg,#f8fafc_0%,#eef3f9_100%)] p-6 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]'>
      <div className='rounded-[28px] border border-white/70 bg-white/75 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)]'>
        <div className='h-24 w-24 animate-pulse rounded-full bg-[#dbe5f1]' />
        <div className='mt-5 h-7 w-40 animate-pulse rounded-full bg-[#dbe5f1]' />
        <div className='mt-3 h-4 w-28 animate-pulse rounded-full bg-[#e6edf7]' />
        <div className='mt-6 space-y-2'>
          <div className='h-4 w-full animate-pulse rounded-full bg-[#e6edf7]' />
          <div className='h-4 w-11/12 animate-pulse rounded-full bg-[#e6edf7]' />
          <div className='h-4 w-9/12 animate-pulse rounded-full bg-[#e6edf7]' />
        </div>
      </div>

      <div className='space-y-5'>
        <div className='grid gap-4 md:grid-cols-3'>
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className='h-28 animate-pulse rounded-[24px] border border-white/70 bg-white/70'
            />
          ))}
        </div>
        <div className='grid gap-4 lg:grid-cols-2'>
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className='h-44 animate-pulse rounded-[24px] border border-white/70 bg-white/70'
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function GitHubProfilePanel() {
  const [state, setState] = useState<GitHubState>({ status: 'loading' });

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const headers = { Accept: 'application/vnd.github+json' };

        const userResponse = await fetch(USER_API_URL, {
          headers,
          signal: controller.signal,
        });

        if (!userResponse.ok) {
          throw new Error('GitHub API response was not successful.');
        }

        const user = (await userResponse.json()) as GitHubUser;

        // 지정한 대표 저장소만 개별 조회 (실패한 항목은 제외)
        const repoResults = await Promise.all(
          FEATURED_REPOS.map(async (name) => {
            try {
              const response = await fetch(repoApiUrl(name), {
                headers,
                signal: controller.signal,
              });
              if (!response.ok) {
                return null;
              }
              return (await response.json()) as GitHubRepo;
            } catch {
              return null;
            }
          })
        );

        const repos = repoResults.filter(
          (repo): repo is GitHubRepo => repo !== null
        );

        setState({
          status: 'success',
          user,
          repos,
        });
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        setState({
          status: 'error',
          message:
            error instanceof Error
              ? error.message
              : 'GitHub 데이터를 불러오지 못했습니다.',
        });
      }
    }

    void load();

    return () => controller.abort();
  }, []);

  const links = useMemo(() => {
    if (state.status !== 'success') {
      return [];
    }

    const { user } = state;
    return [
      user.blog
        ? {
            label: 'Blog',
            href: normalizeExternalUrl(user.blog),
          }
        : null,
      user.location
        ? {
            label: 'Location',
            href: null,
            text: user.location,
          }
        : null,
    ].filter(Boolean) as Array<{
      label: string;
      href: string | null;
      text?: string;
    }>;
  }, [state]);

  if (state.status === 'loading') {
    return <LoadingPanel />;
  }

  if (state.status === 'error') {
    return (
      <div className='grid h-full place-items-center bg-[linear-gradient(180deg,#f8fafc_0%,#eef3f9_100%)] p-8'>
        <div className='w-full max-w-[720px] rounded-[28px] border border-white/70 bg-white/90 p-8 text-[#0f172a] shadow-[0_24px_60px_rgba(15,23,42,0.12)]'>
          <div className='text-[28px] font-semibold tracking-[-0.03em]'>
            GitHub 요약을 불러오지 못함
          </div>
          <p className='mt-4 text-sm leading-7 text-[#475569]'>
            네트워크 제한이나 GitHub API 응답 문제로 카드형 요약을 만들지 못했습니다.
            대신 프로필 원본 페이지로 바로 이동할 수 있습니다.
          </p>
          <div className='mt-5 rounded-[20px] border border-[#dbe4f0] bg-[#f8fafc] px-4 py-3 text-sm text-[#334155]'>
            오류 메시지: {state.message}
          </div>
          <div className='mt-6 flex flex-wrap gap-3'>
            <a
              href='https://github.com/jsbyun0301-bot'
              target='_blank'
              rel='noreferrer'
              className='rounded-[18px] bg-[#0b61d8] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#084eaf]'
            >
              GitHub 프로필 열기
            </a>
            <a
              href='https://github.com/jsbyun0301-bot?tab=repositories'
              target='_blank'
              rel='noreferrer'
              className='rounded-[18px] border border-[#cbd5e1] bg-white px-5 py-3 text-sm font-semibold text-[#0f172a] transition-colors hover:bg-[#f8fafc]'
            >
              저장소 목록 보기
            </a>
          </div>
        </div>
      </div>
    );
  }

  const { user, repos } = state;

  return (
    <div className='min-h-full bg-[linear-gradient(180deg,#f8fafc_0%,#eef3f9_100%)] p-6'>
      <div className='grid gap-5 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)]'>
        <section className='rounded-[30px] border border-white/70 bg-white/90 p-6 text-[#0f172a] shadow-[0_24px_60px_rgba(15,23,42,0.08)]'>
          <img
            src={user.avatar_url}
            alt={user.login}
            className='h-24 w-24 rounded-full border border-[#dbe4f0] object-cover shadow-[0_12px_24px_rgba(15,23,42,0.12)]'
          />
          <div className='mt-5 text-[30px] font-semibold tracking-[-0.04em]'>
            {user.name ?? user.login}
          </div>
          <div className='mt-1 text-sm font-medium text-[#475569]'>
            @{user.login}
          </div>
          <p className='mt-5 text-sm leading-7 text-[#334155]'>
            {user.bio ?? 'GitHub 프로필 소개 문구가 없습니다.'}
          </p>

          <div className='mt-6 flex flex-wrap gap-2'>
            {links.map((link) =>
              link.href ? (
                <a
                  key={link.label}
                  href={link.href}
                  target='_blank'
                  rel='noreferrer'
                  className='rounded-full border border-[#dbe4f0] bg-[#f8fafc] px-3 py-1.5 text-sm text-[#334155] transition-colors hover:bg-white'
                >
                  {link.label}: {link.href.replace(/^https?:\/\//, '')}
                </a>
              ) : (
                <div
                  key={link.label}
                  className='rounded-full border border-[#dbe4f0] bg-[#f8fafc] px-3 py-1.5 text-sm text-[#334155]'
                >
                  {link.label}: {link.text}
                </div>
              )
            )}
          </div>

          <a
            href={user.html_url}
            target='_blank'
            rel='noreferrer'
            className='mt-6 inline-flex rounded-[18px] bg-[#0b61d8] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#084eaf]'
          >
            GitHub 원본 열기
          </a>
        </section>

        <section className='space-y-5'>
          <div className='rounded-[30px] border border-white/70 bg-white/90 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)]'>
            <div>
              <div className='text-[24px] font-semibold tracking-[-0.03em] text-[#0f172a]'>
                대표 저장소
              </div>
              <p className='mt-2 text-sm leading-6 text-[#64748b]'>
                완성도 있는 대표 프로젝트를 직접 선별해 정리했습니다.
              </p>
            </div>

            {repos.length === 0 ? (
              <div className='mt-5 rounded-[24px] border border-dashed border-[#cbd5e1] bg-[#fbfdff] p-8 text-center text-sm text-[#64748b]'>
                대표 저장소를 준비 중입니다.
              </div>
            ) : null}
            <div className='mt-5 grid gap-4 xl:grid-cols-2'>
              {repos.map((repo) => (
                <article
                  key={repo.id}
                  className='rounded-[24px] border border-[#e2e8f0] bg-[#fbfdff] p-5 shadow-[0_12px_28px_rgba(15,23,42,0.04)]'
                >
                  <div className='flex items-start justify-between gap-4'>
                    <div>
                      <div className='text-[20px] font-semibold tracking-[-0.03em] text-[#0f172a]'>
                        {repo.name}
                      </div>
                      <div className='mt-2 flex flex-wrap items-center gap-2 text-xs text-[#64748b]'>
                        {repo.language ? (
                          <span className='rounded-full bg-[#e8f0fb] px-2.5 py-1 font-medium text-[#245a9a]'>
                            {repo.language}
                          </span>
                        ) : null}
                        <span>업데이트 {formatUpdatedAt(repo.updated_at)}</span>
                        <span>스타 {repo.stargazers_count}</span>
                      </div>
                    </div>
                  </div>

                  <p className='mt-4 min-h-[72px] text-sm leading-7 text-[#334155]'>
                    {repo.description ?? '저장소 설명이 아직 등록되지 않았습니다.'}
                  </p>

                  <div className='mt-5 flex flex-wrap gap-3'>
                    <a
                      href={repo.html_url}
                      target='_blank'
                      rel='noreferrer'
                      className='rounded-[16px] bg-[#0f172a] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1e293b]'
                    >
                      Repo
                    </a>
                    {repo.homepage ? (
                      <a
                        href={normalizeExternalUrl(repo.homepage) ?? repo.homepage}
                        target='_blank'
                        rel='noreferrer'
                        className='rounded-[16px] border border-[#cbd5e1] bg-white px-4 py-2 text-sm font-semibold text-[#0f172a] transition-colors hover:bg-[#f8fafc]'
                      >
                        Live
                      </a>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
