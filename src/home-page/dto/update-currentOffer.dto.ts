import { ApiPropertyOptional, OmitType, PartialType } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { FileSystemStoredFile } from "nestjs-form-data";
import { CreateCurrentOfferDto } from "./create-currentOffer.dto";

export class UpdateCurrentOfferDto extends PartialType(OmitType(CreateCurrentOfferDto, ['image'])) {
    @ApiPropertyOptional({ type: 'string', format: 'binary' })
    @IsOptional()
    image: FileSystemStoredFile | string;
}