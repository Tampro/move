import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from './token.entity';

@Injectable()
export class TokenService {
    constructor(
        @InjectRepository(Token) protected readonly tokenRepository: Repository<Token>
     ){
     }
 
     async save(body){
         return this.tokenRepository.save(body);
     }
 
     async findOne(username){
         return this.tokenRepository.findOne(username);
     }

     async delete(options){
        return this.tokenRepository.delete(options);
     }
}
