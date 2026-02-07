import { Controller, Get, Put, Post, Body } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { SettingsService } from "./settings.service";
import { CMSSettingsDto, UpdateSettingsDto } from "../../common/dto";

@ApiTags("Settings")
@Controller("settings")
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  @ApiOperation({ summary: "Get CMS settings" })
  @ApiResponse({
    status: 200,
    description: "CMS settings",
    type: CMSSettingsDto,
  })
  async get() {
    return this.settingsService.get();
  }

  @Put()
  @ApiOperation({ summary: "Update CMS settings" })
  @ApiResponse({
    status: 200,
    description: "Settings updated",
    type: CMSSettingsDto,
  })
  async update(@Body() updateDto: UpdateSettingsDto) {
    return this.settingsService.update(updateDto);
  }

  @Post("reset")
  @ApiOperation({ summary: "Reset settings to defaults" })
  @ApiResponse({
    status: 200,
    description: "Settings reset",
    type: CMSSettingsDto,
  })
  async reset() {
    return this.settingsService.reset();
  }
}
