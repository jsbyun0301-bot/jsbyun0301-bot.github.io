export const BROWSER_HOME_URL = 'https://www.google.com/webhp?igu=1';

export const BROWSER_IFRAME_ALLOWLIST = [
  {
    host: 'www.google.com',
    label: 'Google',
    match: (url: URL) =>
      url.hostname === 'www.google.com' &&
      url.pathname === '/webhp' &&
      url.searchParams.get('igu') === '1',
  },
  {
    host: 'jsbyun0301-bot.vercel.app',
    label: 'Tech Blog',
    match: (url: URL) => url.hostname === 'jsbyun0301-bot.vercel.app',
  },
] as const;

type BrowserTarget =
  | {
      mode: 'iframe';
      url: string;
      address: string;
      title: string;
    }
  | {
      mode: 'external';
      url: string;
      address: string;
      title: string;
      reason: string;
    };

function prettifyHostTitle(url: URL) {
  if (
    url.hostname === 'www.google.com' &&
    url.pathname === '/webhp' &&
    url.searchParams.get('igu') === '1'
  ) {
    return 'Google';
  }

  if (url.hostname === 'jsbyun0301-bot.vercel.app') {
    return 'Tech Blog';
  }

  if (url.hostname === 'www.linkedin.com') {
    return 'LinkedIn';
  }

  return url.hostname.replace(/^www\./, '');
}

export function normalizeBrowserInput(rawInput: string) {
  const trimmed = rawInput.trim();

  if (!trimmed || trimmed === BROWSER_HOME_URL || /^home$/i.test(trimmed)) {
    return BROWSER_HOME_URL;
  }

  if (/^[a-z]+:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

export function resolveBrowserTarget(rawInput: string): BrowserTarget {
  const normalized = normalizeBrowserInput(rawInput);

  let parsedUrl: URL;

  try {
    parsedUrl = new URL(normalized);
  } catch {
    return {
      mode: 'external',
      url: normalized,
      address: normalized,
      title: 'External handoff',
      reason:
        '주소 형식을 내부 브라우저 셸이 해석하지 못했습니다. 안전하게 새 탭 전환만 지원합니다.',
    };
  }

  if (parsedUrl.hostname === 'github.com') {
    return {
      mode: 'external',
      url: parsedUrl.toString(),
      address: parsedUrl.toString(),
      title: 'GitHub',
      reason:
        'GitHub 메인 페이지와 저장소 페이지는 iframe으로 직접 렌더링하지 않습니다. 대신 GitHub 요약 페이지나 새 탭 전환을 사용합니다.',
    };
  }

  const allowlistEntry = BROWSER_IFRAME_ALLOWLIST.find((entry) =>
    entry.match(parsedUrl)
  );

  if (allowlistEntry) {
    return {
      mode: 'iframe',
      url: parsedUrl.toString(),
      address: parsedUrl.toString(),
      title: allowlistEntry.label,
    };
  }

  return {
    mode: 'external',
    url: parsedUrl.toString(),
    address: parsedUrl.toString(),
    title: prettifyHostTitle(parsedUrl),
    reason:
      '이 Browser 앱은 허용된 iframe 대상만 내부에 렌더링합니다. 나머지 URL은 외부 브라우저로 전환합니다.',
  };
}
