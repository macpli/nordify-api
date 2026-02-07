import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { NordifyCommand } from './nordify.command';

@Module({
  imports: [],
  controllers: [],
  providers: [NordifyCommand, ImageService],
})
export class AppModule {}
