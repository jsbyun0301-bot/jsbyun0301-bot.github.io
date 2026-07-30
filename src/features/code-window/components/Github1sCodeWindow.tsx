type Github1sCodeWindowProps = {
  owner: string;
  repo: string;
  branch?: string;
  path: string;
  title: string;
  onIframeFocus?: () => void;
};

function encodeGithub1sPath(path: string) {
  return path
    .split('/')
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join('/');
}

function buildGithub1sUrl({
  owner,
  repo,
  branch,
  path,
}: Omit<Github1sCodeWindowProps, 'title' | 'onIframeFocus'>) {
  return `https://github1s.com/${encodeURIComponent(owner)}/${encodeURIComponent(
    repo
  )}/blob/${encodeURIComponent(branch ?? 'HEAD')}/${encodeGithub1sPath(path)}`;
}

export function Github1sCodeWindow({
  owner,
  repo,
  branch = 'HEAD',
  path,
  title,
  onIframeFocus,
}: Github1sCodeWindowProps) {
  return (
    <div className='flex h-full min-h-[360px] w-full min-w-0 flex-1 bg-[#eef3f9] md:min-h-[560px]'>
      <iframe
        src={buildGithub1sUrl({ owner, repo, branch, path })}
        title={title}
        loading='lazy'
        referrerPolicy='strict-origin-when-cross-origin'
        className='h-full min-h-[360px] w-full border-0 bg-white md:min-h-[560px]'
        onFocus={onIframeFocus}
      />
    </div>
  );
}
