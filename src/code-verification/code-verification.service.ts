import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCodeVerificationDto } from './dto/create-code-verification.dto';
import { UpdateCodeVerificationDto } from './dto/update-code-verification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CodeVerification } from './entities/code-verification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CodeVerificationService {
  constructor(
    @InjectRepository(CodeVerification)
    private codeVerificationRepository: Repository<CodeVerification>,
  ) { }
  async create(createCodeVerificationDto: CreateCodeVerificationDto) {
    try {
      console.log('CODE VERIFICATION : ', createCodeVerificationDto);
      const findOldCode = await this.findOneByUserId(
        createCodeVerificationDto.userId,
      );
      console.log('FINAL OLD CODE : ', findOldCode);
      if (findOldCode) {
        this.remove(findOldCode.id);
      }
      const codeCreated = await this.codeVerificationRepository.create(
        createCodeVerificationDto,
      );
      const savedCode = await this.codeVerificationRepository.save(codeCreated);
      return savedCode;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  findAll() {
    return `This action returns all codeVerification`;
  }

  async findOneByUserId(id: number) {
    try {
      const data = await this.codeVerificationRepository.findOne({
        where: { userId: id },
      });

      return data;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async removeByUserId(id: number) {
    try {
      await this.codeVerificationRepository.delete({userId : id});
      return 'Successfully removed';
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: number) {
    try {
      const data = await this.codeVerificationRepository.findOne({
        where: { id },
      });
      if (!data) {
        throw new NotFoundException('Not Found');
      }
      return data;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  update(id: number, updateCodeVerificationDto: UpdateCodeVerificationDto) {
    return `This action updates a #${id} codeVerification`;
  }

  async remove(id: number) {
    try {
      const isDelete = await this.codeVerificationRepository.delete(id);
      if (isDelete?.affected <= 0) {
        throw new NotFoundException('Not Found any data against this id.');
      }
      return 'Successfully removed';
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
