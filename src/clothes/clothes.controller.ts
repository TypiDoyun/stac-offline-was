import {
    Body,
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ClothesService } from "./clothes.service";
import { CreateClothesDto } from "./dto/create-clothes.dto";

@Controller("clothes")
@UsePipes(ValidationPipe)
export class ClothesController {
    constructor(private readonly clothesService: ClothesService) {}

    @Post()
    @UseInterceptors(FileInterceptor("images"))
    public createClothes(
        @UploadedFile() images: Express.Multer.File[],
        @Body() createClothesDto: CreateClothesDto
    ) {
        console.log(images, "image");
        console.log(createClothesDto, "body");
        // return this.clothesService.createClothes(images, createClothesDto);
    }
}
