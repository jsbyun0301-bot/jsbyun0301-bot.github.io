import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  DEFAULT_SEO,
  ROUTE_SEO,
  SEO_BASE_URL,
  SEO_IMAGE_URL,
  SEO_SITE_NAME,
} from '@/config/seo';

const getCanonicalUrl = (canonicalPath: string) =>
  new URL(canonicalPath, SEO_BASE_URL).toString();

const upsertMeta = (
  attribute: 'name' | 'property',
  key: string,
  content: string
) => {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`
  );

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.content = content;
};

const upsertCanonical = (href: string) => {
  let element = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]'
  );

  if (!element) {
    element = document.createElement('link');
    element.rel = 'canonical';
    document.head.appendChild(element);
  }

  element.href = href;
};

export const useSeoMetadata = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const normalizedPath =
      pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname;
    const metadata = ROUTE_SEO[normalizedPath] ?? DEFAULT_SEO;
    const canonicalUrl = getCanonicalUrl(metadata.canonicalPath);

    document.documentElement.lang = 'ko';
    document.title = metadata.title;

    upsertCanonical(canonicalUrl);
    upsertMeta('name', 'description', metadata.description);
    upsertMeta('name', 'robots', 'index, follow');
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:locale', 'ko_KR');
    upsertMeta('property', 'og:site_name', SEO_SITE_NAME);
    upsertMeta('property', 'og:title', metadata.title);
    upsertMeta('property', 'og:description', metadata.description);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:image', SEO_IMAGE_URL);
    upsertMeta(
      'property',
      'og:image:alt',
      '변지섭 데이터 기반 기획자 포트폴리오'
    );
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', metadata.title);
    upsertMeta('name', 'twitter:description', metadata.description);
    upsertMeta('name', 'twitter:image', SEO_IMAGE_URL);
  }, [pathname]);
};
