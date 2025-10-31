import { Module } from '@nestjs/common';
import { TasksModule } from './modules/tasks/tasks.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [TasksModule],
  providers: [PrismaService],
})
export class AppModule {}
