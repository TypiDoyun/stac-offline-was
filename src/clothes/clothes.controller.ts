import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Query,
    UploadedFile,
    UseInterceptors,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ClothesService } from "./clothes.service";
import { CreateClothesDto } from "./dto/create-clothes.dto";
import { RegisteredMerchantPrivate, UserField } from "src/common/decorators";
import { Merchant } from "src/auth/merchant/merchant.entity";

@Controller("clothes")
@UsePipes(ValidationPipe)
export class ClothesController {
    constructor(private readonly clothesService: ClothesService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(FileInterceptor("images"))
    @RegisteredMerchantPrivate()
    public createClothes(
        @UploadedFile() images: Express.Multer.File[] = [],
        @Body() createClothesDto: CreateClothesDto,
        @UserField() merchant: Merchant
    ) {
        console.log("create clothes requiest received!");
        return this.clothesService.createClothes(
            images,
            createClothesDto,
            merchant
        );
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    public async findClothes(@Query("name") name: string) {
        console.log("clothes find request received!");
        const value = await this.clothesService.findClothes(name);
        return value;
    }

    @Get("/location")
    @HttpCode(HttpStatus.OK)
    public async findClothesByLocation(
        @Query("latitude") latitude: number,
        @Query("longitude") longitude: number
    ) {
        console.log("clothes find by location request received!");
        const clothes = await this.clothesService.findClothesByLocation([
            latitude,
            longitude
        ]);

        return clothes;
    }

    @Delete("/:name")
    @RegisteredMerchantPrivate()
    public async deleteClothesByName(@Param("name") name: string) {
        return this.clothesService.deleteClothesByName(name);
    }
}
