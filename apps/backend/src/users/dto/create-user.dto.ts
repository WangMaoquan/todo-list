import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 25)
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 30)
  password: string;
}
