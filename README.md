# Deadshot.io Client

An unofficial Linux desktop wrapper for [Deadshot.io](https://deadshot.io/), built with Electron.

> This project is an independent community client and is not affiliated with or endorsed by Deadshot.io. The game, name, and branding belong to their respective owners.

## Features

- Opens the official Deadshot.io site in a standalone Electron window.
- Uses XWayland by default for compatibility with Wayland desktops; this applies to both direct AppImage launches and the Debian package.
- Includes the official Deadshot.io favicon as the application icon.
- Opens unrelated external links in the system browser.
- Keeps Node.js APIs isolated from the remote game page.

An internet connection is required because the game itself is served by Deadshot.io.

## Install on Linux

### AppImage

Download the AppImage from the repository's Releases page, then run:

```sh
chmod +x Deadshot.io.Client-1.0.0.AppImage
./Deadshot.io.Client-1.0.0.AppImage
```

### Debian or Ubuntu

Download the .deb package from Releases, then install it with:

```sh
sudo apt install ./deadshot-io-client_1.0.0_amd64.deb
```

## Development

Requirements: Node.js and npm on Linux.

```sh
npm install
npm start
```

`npm start` launches through XWayland. To try native Wayland instead:

```sh
npm run start:wayland
```

## Build Linux packages

```sh
npm run dist:linux
```

The AppImage and Debian package are written to `dist/`. Building may download Electron and packaging tools on the first run.

## Repository details

GitHub description: Unofficial Linux desktop wrapper for Deadshot.io, built with Electron.

Topics: `deadshot-io`, `electron`, `linux`, `desktop-client`, `appimage`.

## License

This project is licensed under the GNU General Public License v3.0. See [LICENSE](LICENSE). The Deadshot.io game and its branding remain the property of their respective owners.

## Release checklist

Before publishing packages, replace the placeholder `example.invalid` maintainer contact in `package.json` with a project contact address.
