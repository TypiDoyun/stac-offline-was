import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query,
    UploadedFiles,
    UseInterceptors,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { ClothesService } from "./clothes.service";
import { CreateClothesDto } from "./dto/create-clothes.dto";
import { RegisteredMerchantPrivate, UserField } from "src/common/decorators";
import { Merchant } from "src/auth/merchant/merchant.entity";
import { UpdateClothesDto } from "./dto/update-clothes.dto";

@Controller("clothes")
@UsePipes(ValidationPipe)
export class ClothesController {
    constructor(private readonly clothesService: ClothesService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @RegisteredMerchantPrivate()
    public createClothes(
        @Body() createClothesDto: CreateClothesDto,
        @UserField() merchant: Merchant
    ) {
        console.log("create clothes requiest received!");
        return this.clothesService.createClothes(createClothesDto, merchant);
    }

    @Post("/images")
    @UseInterceptors(FilesInterceptor("images"))
    @RegisteredMerchantPrivate()
    public uploadImages(@UploadedFiles() images: Express.Multer.File[] = []) {
        return this.clothesService.uploadImages(images);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    public async findClothes(@Query("name") name: string) {
        console.log("clothes find request received!");
        const value = await this.clothesService.findClothes(name);
        return value;
    }

    @Get("/own")
    @RegisteredMerchantPrivate()
    public async getOwnClothes(@UserField() merchant: Merchant) {
        return this.clothesService.getOwnClothes(merchant);
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

    @Get("/shopid/:id")
    public async findClothesByShopId(@Param("id") id: string) {
        return this.clothesService.findClothesByShopId(id);
    }

    @Delete("/:name")
    @RegisteredMerchantPrivate()
    public async deleteClothesByName(
        @Param("name") name: string,
        @UserField() merchant: Merchant
    ) {
        return this.clothesService.deleteClothesByName(name, merchant);
    }

    @Patch("/:name")
    @RegisteredMerchantPrivate()
    public async updateClothes(
        @Param("name") name: string,
        @Body() updateClothesDto: UpdateClothesDto
    ) {
        return this.clothesService.updateClothes(name, updateClothesDto);
    }
}
