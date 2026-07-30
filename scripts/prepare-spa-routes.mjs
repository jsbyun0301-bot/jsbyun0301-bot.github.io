import { copyFile, mkdir } from 'node:fs/promises';

const source = new URL('../dist/index.html', import.meta.url);
const fallback = new URL('../dist/404.html', import.meta.url);
const routes = [
  'profile',
  'prize',
  'github',
  'work',
  'card',
  'settings',
  'inobus',
  'hirax',
  'grace',
  'dongnae',
  'cafe',
  'game',
];

await copyFile(source, fallback);

await Promise.all(
  routes.map(async (route) => {
    const routeDir = new URL(`../dist/${route}/`, import.meta.url);

    await mkdir(routeDir, { recursive: true });
    await copyFile(source, new URL('index.html', routeDir));
  })
);
