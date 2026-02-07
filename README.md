# nordify-cli
![npm version](https://img.shields.io/npm/v/nordify-cli)
![npm downloads](https://img.shields.io/npm/dm/nordify-cli)

A CLI tool that applies a [Nord](https://www.nordtheme.com/) color palette filter to images.

## Install

Requires [Node.js](https://nodejs.org/) (v18+).

```bash
npm install -g nordify-cli
```

## Usage

```bash
nordify -r <path-to-image>
```

The output is saved next to the input file with `-nord` appended to the filename.

### Example

```bash
nordify -r photo.jpg
# => Saved to: photo-nord.jpg
```

## Uninstall

```bash
npm uninstall -g nordify-cli
```
