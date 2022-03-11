import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ExpenseEditDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  public amount: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  public text: string;
}
