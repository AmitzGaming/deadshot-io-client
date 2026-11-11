# Contributing

Thanks for helping improve the Deadshot.io Client.

## Get started

1. Install Node.js and npm on Linux.
2. Run `npm install`.
3. Run `npm start` to launch with XWayland, or `npm run start:wayland` to try native Wayland.

## Changes and reports

- Keep changes focused and describe the user-visible effect.
- For Linux display issues, include the distribution, desktop environment, session backend (Wayland or X11), and how the app was launched.
- Do not include account credentials, session cookies, or other private data in issues or screenshots.
- Check that `npm start` still launches and, when changing packaging, run `npm run dist:linux`.

There is currently no automated test suite configured.
