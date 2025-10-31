import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // 👈 можно глобально, чтобы не импортировать в каждом модуле
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // 👈 ОБЯЗАТЕЛЬНО
})
export class PrismaModule {}
