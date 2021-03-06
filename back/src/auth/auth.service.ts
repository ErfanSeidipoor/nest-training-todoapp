import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository) private userRepository:UserRepository,
        private jwtService: JwtService
    ){}
    
    
    async signUp(authCredentialsDto: AuthCredentialsDto):Promise<void> {
        return this.userRepository.singUp(authCredentialsDto)
    }

    async signIn(authCredentialsDto: AuthCredentialsDto):Promise<{accessToken:string}> {
        const username = await this.userRepository.validateUserPassword(authCredentialsDto)
        
        if (!username) {
            throw new UnauthorizedException("username or password is incorrect")
        }
        
        const payload:JwtPayload = { username } 
        const accessToken = await this.jwtService.sign(payload)

        return ({ accessToken })

    }
}
