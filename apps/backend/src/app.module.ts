import { Module } from '@nestjs/common';
import { TasksModule } from './modules/tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config'; // Needed for .env usage
import { AppController } from './app.controller'; // For /health route

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Load env globally
    TasksModule,
    AuthModule,
  ],
  controllers: [AppController], // Hook controller
  providers: [PrismaService],
})
export class AppModule {}
