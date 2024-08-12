import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstant } from 'src/common/utils';


@Module({
    imports: [
        PassportModule,
        UsersModule,
        JwtModule.register( {
            global: true,
            secret: jwtConstant.secret,
        }),
    ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
