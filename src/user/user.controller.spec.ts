import { NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";
import { TokenService } from "./token.service";
import { UserController } from "./user.controller";
import { User } from "./user.entity";
import { UserService } from "./user.service";

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  let jwtService: JwtService;
  let userRepository: Repository<User>;
  let tokenService: TokenService
  // beforeAll(() => console.log('this logged once'));
  beforeEach(() => {
    userService = new UserService(userRepository);
    userController = new UserController(userService,jwtService,tokenService);
  });
});
