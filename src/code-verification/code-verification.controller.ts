import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CodeVerificationService } from './code-verification.service';
import { CreateCodeVerificationDto } from './dto/create-code-verification.dto';
import { UpdateCodeVerificationDto } from './dto/update-code-verification.dto';

@Controller('code-verification')
export class CodeVerificationController {
  constructor(
    private readonly codeVerificationService: CodeVerificationService,
  ) {}

  @Post()
  create(@Body() createCodeVerificationDto: CreateCodeVerificationDto) {
    return this.codeVerificationService.create(createCodeVerificationDto);
  }

  @Get()
  findAll() {
    return this.codeVerificationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.codeVerificationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCodeVerificationDto: UpdateCodeVerificationDto,
  ) {
    return this.codeVerificationService.update(+id, updateCodeVerificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.codeVerificationService.remove(+id);
  }
}
