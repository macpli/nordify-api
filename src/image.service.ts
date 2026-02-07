import { Injectable } from '@nestjs/common';
import sharp from 'sharp';

@Injectable()
export class ImageService {
  private readonly NORD_COLORS = {
    dark: { r: 46, g: 52, b: 64 },  // #2e3440
    mid1: { r: 59, g: 66, b: 82 }, // #3b4252
    mid2: { r: 67, g: 76, b: 94 }, // #434c5e
    mid3: { r: 76, g: 86, b: 106 }, // #4c566a
  };

  async applyNordFilter(inputPath: string): Promise<void> {
    const outputPath = inputPath.replace(/(\.[\w\d]+)$/, '-nord$1');

    const palette = [
      this.NORD_COLORS.dark,
      this.NORD_COLORS.mid1,
      this.NORD_COLORS.mid2,
      this.NORD_COLORS.mid3,
    ];

    const paletteLuma = palette.map((c) => (54 * c.r + 183 * c.g + 19 * c.b) >> 8);
    const t0 = (paletteLuma[0] + paletteLuma[1]) >> 1;
    const t1 = (paletteLuma[1] + paletteLuma[2]) >> 1;
    const t2 = (paletteLuma[2] + paletteLuma[3]) >> 1;

    const { data, info } = await sharp(inputPath)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const out = Buffer.allocUnsafe(data.length);
    const channels = info.channels;

    const blend = 0.2;
    const nordW = 1 - blend;

    for (let i = 0; i < data.length; i += channels) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = channels >= 4 ? data[i + 3] : 255;

      const luma = (54 * r + 183 * g + 19 * b) >> 8;
      const c = luma < t0 ? palette[0] : luma < t1 ? palette[1] : luma < t2 ? palette[2] : palette[3];
      out[i] = (r * blend + c.r * nordW + 0.5) | 0;
      out[i + 1] = (g * blend + c.g * nordW + 0.5) | 0;
      out[i + 2] = (b * blend + c.b * nordW + 0.5) | 0;
      if (channels >= 4) out[i + 3] = a;
    }

    await sharp(out, {
      raw: {
        width: info.width,
        height: info.height,
        channels: info.channels,
      },
    }).toFile(outputPath);

    console.log(`Saved to: ${outputPath}`);
  }
}
