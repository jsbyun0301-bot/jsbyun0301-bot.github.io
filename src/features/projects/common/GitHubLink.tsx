export function GitHubLink({ url }: { url: string }) {
  return (
    <a
      href={url}
      target='_blank'
      rel='noopener noreferrer'
      className='text-blue-600 underline underline-offset-2 hover:opacity-80'
      aria-label='GitHub 링크 보기'
    >
      {url}
    </a>
  );
}
