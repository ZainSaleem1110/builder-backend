import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from "@nestjs/common";
import { ImageUploadService } from "./image-upload.service";
import { CreateImageUploadDto } from "./dto/create-image-upload.dto";
import { UpdateImageUploadDto } from "./dto/update-image-upload.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("image-upload")
// @UseGuards(AuthGuard)
export class ImageUploadController {
  constructor(private readonly imageUploadService: ImageUploadService) {}

  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.imageUploadService.uploadFile(file);
  }

  @Post()
  create(@Body() createImageUploadDto: CreateImageUploadDto) {
    return this.imageUploadService.create(createImageUploadDto);
  }

  @Get()
  findAll() {
    return this.imageUploadService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.imageUploadService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateImageUploadDto: UpdateImageUploadDto
  ) {
    return this.imageUploadService.update(+id, updateImageUploadDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.imageUploadService.remove(+id);
  }
}
