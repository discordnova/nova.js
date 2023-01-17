import { fetch, request } from 'undici';
import { open } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const download = async () => {
  const architecture = process.arch;
  const os = process.platform;

  const releases = await fetch(
    'https://api.github.com/repos/discordnova/nova/releases'
  );
  if (!releases.ok) {
    throw new Error('Failed to fetch latest releases');
  }
  const releasesData = (await releases.json()) as {
    tag_name: string;
    prerelease: boolean;
    assets: { browser_download_url: string; name: string }[];
  }[];

  const release = releasesData[0];

  console.log('Using release ' + release.tag_name);

  const asset = release.assets.filter(
    (asset) =>
      asset.name === `nova-${os}-${architecture}${os === 'win32' ? '.exe' : ''}`
  )[0];

  if (!asset) {
    throw new Error(`No releases found for ${os}/${architecture}.`);
  }

  const path = join(
    dirname(fileURLToPath(import.meta.url)),
    '..',
    '..',
    'bin',
    'nova'
  );
  const handle = await open(path, 'w+');
  await handle.chmod('755');
  const write = handle.createWriteStream();
  const { body } = await request(asset.browser_download_url, {
    maxRedirections: 10,
  });
  body.pipe(write, { end: true });

  console.log('Wrote ' + write.bytesWritten + ' bytes');
};

download();
