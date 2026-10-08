import { spawnSync } from 'node:child_process';
import { existsSync, rmSync } from 'node:fs';

// OneDrive on Windows can crash Node's fs.rmSync while Astro empties dist.
// Remove it first so Astro's own cleanup is a no-op. Cloudflare builds start clean.
if (!existsSync('dist')) {
  process.exit(0);
}

if (process.platform === 'win32') {
  const result = spawnSync(
    'powershell',
    ['-NoProfile', '-Command', "if (Test-Path -LiteralPath 'dist') { Remove-Item -LiteralPath 'dist' -Recurse -Force }"],
    { stdio: 'inherit' },
  );
  process.exit(result.status ?? 1);
}

rmSync('dist', { recursive: true, force: true });
