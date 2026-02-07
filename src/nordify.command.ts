import { RootCommand, CommandRunner, Option } from 'nest-commander';
import { ImageService } from './image.service';

@RootCommand({
  description: 'Apply Nord filter to an image',
})
export class NordifyCommand extends CommandRunner {
  constructor(private readonly imageService: ImageService) {
    super();
  }

  async run(passedParams: string[], options: { input: string }): Promise<void> {
   await this.imageService.applyNordFilter(options.input);
  }

  @Option({
    flags: '-r, --input <string>',
    description: 'Input image path',
    required: true,
  })
  parsePath(val: string): string {
    return val;
  }
}