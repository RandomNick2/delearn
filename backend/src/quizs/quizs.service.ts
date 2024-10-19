import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
import { HttpsProxyAgent } from 'https-proxy-agent';
import OpenAI from 'openai';
import { PrismaService } from '../prisma/prisma.service';
import type { IGeneratedQuiz } from './aiprompts/generatedQuiz';
import { generateQuizPrompt } from './aiprompts/propmt';
import { CreateDto } from './dto/create.dto';
import type { SubmitQuizDto } from './dto/submitquiz.dto';

const ABI = ['function mint(address to, uint256 amount) public'];

@Injectable()
export class QuizsService {
  private openai: OpenAI;
  private readonly provider: ethers.JsonRpcProvider;
  private readonly wallet: ethers.Wallet;
  private contract: ethers.Contract;

  constructor(
    private prismaService: PrismaService,
    private configService: ConfigService,
  ) {
    this.openai = new OpenAI({
      apiKey: configService.get('OPENAI_KEY'),
      httpAgent: new HttpsProxyAgent(
        'http://GXjt8nK3:ghhPdd4C@5.42.209.120:64270',
      ),
    });

    this.provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    this.wallet = new ethers.Wallet(
      configService.get('PRIVATE_KEY'),
      this.provider,
    );
    this.contract = new ethers.Contract(
      configService.get('TOKEN_ADDRESS'),
      ABI,
      this.wallet,
    );
  }

  async generate(dto: CreateDto) {
    const result = await this.openai.chat.completions.create({
      model: await this.configService.get('MODEL_ID'),
      messages: [
        { content: generateQuizPrompt, role: 'system' },
        { content: dto.topic, role: 'user' },
      ],
    });

    const generatedQuiz: IGeneratedQuiz = JSON.parse(
      result.choices[0].message.content,
    );

    if (generatedQuiz.quizQuestions == undefined) {
      console.log(result.choices[0].message.content);
      return;
    }

    return this.prismaService.quiz.create({
      data: {
        topic: dto.topic,
        questions: {
          create: generatedQuiz.quizQuestions.map((q) => ({
            question: q.question,
            questionOptions: {
              create: q.questionOptions.map((opt) => ({
                answer: opt.answer,
                correct: opt.correct,
              })),
            },
          })),
        },
      },
      select: {
        id: true,
        topic: true,
        questions: {
          select: {
            id: true,
            question: true,
            questionOptions: {
              select: {
                id: true,
                answer: true,
              },
            },
          },
        },
      },
    });
  }

  async submit(dto: SubmitQuizDto) {
    const correctAnswers = await this.prismaService.questionOption.findMany({
      where: {
        question: {
          quiz: {
            id: dto.quizId,
          },
        },
        correct: true,
      },
      select: {
        id: true,
        answer: true,
      },
    });

    const correctAnsweredOptions: number[] = [];
    const correctAnswersArray = correctAnswers.map((answer) => answer.id);

    for (const answer of dto.answers) {
      if (correctAnswersArray.includes(answer)) {
        correctAnsweredOptions.push(answer);
      }
    }

    // const tx = await this.contract.mint(
    //   dto.address,
    //   ethers.parseUnits(String(correctAnsweredOptions.length), 18),
    // );
    // await tx.wait();

    return {
      correctAnswersArray,
      correctAnsweredOptions,
    };
  }
}
