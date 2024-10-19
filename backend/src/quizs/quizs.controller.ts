import { Body, Controller, Post, Put } from '@nestjs/common';
import { CreateDto } from './dto/create.dto';
import type { SubmitQuizDto } from './dto/submitquiz.dto';
import { QuizsService } from './quizs.service';

@Controller('quizs')
export class QuizsController {
  constructor(private readonly quizsService: QuizsService) {}

  @Post('generate')
  async create(@Body() dto: CreateDto) {
    return this.quizsService.generate(dto);
  }

  @Put('submit')
  async id(@Body() dto: SubmitQuizDto) {
    return this.quizsService.submit(dto);
  }
}
