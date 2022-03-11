import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  public username: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  public password: string;
}