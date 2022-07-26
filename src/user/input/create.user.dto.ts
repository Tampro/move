
import { IsEmail, Length} from "class-validator";
import { Match } from "src/input/match.decorator";

export class CreateUserDto {
    @Length(5)
    username: string;

    @Length(8)
    password: string;

    @Match('password')
    @Length(8)
    passwordConfirm: string;

    @Length(2)
    firstName: string;

    @Length(2)
    lastName: string;

    @IsEmail()
    email: string;
}