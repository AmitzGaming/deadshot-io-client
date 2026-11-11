const fs = require('node:fs/promises');
const path = require('node:path');

exports.default = async function forceX11Launcher(context) {
  if (context.electronPlatformName !== 'linux') return;

  const appDir = context.appOutDir;
  const launcher = path.join(appDir, 'deadshot-io-client');
  const electronBinary = path.join(appDir, 'deadshot-io-client-bin');

  await fs.rename(launcher, electronBinary);
  await fs.writeFile(
    launcher,
    '#!/bin/sh\n' +
      'DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)\n' +
      'exec "$DIR/deadshot-io-client-bin" --ozone-platform=x11 "$@"\n',
    { mode: 0o755 }
  );
  await fs.chmod(launcher, 0o755);
};
