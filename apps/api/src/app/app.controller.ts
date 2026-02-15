import { Controller, Get } from '@nestjs/common';

@Controller() // 👈 remove 'api' here
export class AppController {
  @Get()
  healthCheck() {
    return { message: '🚀 API is running successfully!' };
  }
}
