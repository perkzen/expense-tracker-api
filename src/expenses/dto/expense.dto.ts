import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ExpenseDto {
  @ApiProperty()
  @IsNumber()
  public amount: number;

  @ApiProperty()
  @IsString()
  public text: string;

  @ApiProperty()
  @IsNumber()
  public userId: number;
}
