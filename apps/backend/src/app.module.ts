import { Module } from '@nestjs/common'; 
import { TasksModule } from './modules/tasks/tasks.module'; 
import { PrismaService } from './prisma/prisma.service'; 
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TasksModule,
    AuthModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
