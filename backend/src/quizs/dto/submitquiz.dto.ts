import {
  IsArray,
  IsEthereumAddress,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class SubmitQuizDto {
  @IsNumber()
  @IsNotEmpty()
  quizId: number;

  @IsNotEmpty()
  @IsArray()
  answers: number[];

  @IsNotEmpty()
  @IsEthereumAddress()
  address: string;
}
