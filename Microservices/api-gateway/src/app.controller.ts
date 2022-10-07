import { Body, Controller, Get, Inject, Post } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello() {
    return 'HelloWorld';
  }
}
