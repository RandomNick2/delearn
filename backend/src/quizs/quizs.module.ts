import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { QuizsController } from './quizs.controller';
import { QuizsService } from './quizs.service';

@Module({
  controllers: [QuizsController],
  providers: [QuizsService, PrismaService],
})
export class QuizsModule {}
