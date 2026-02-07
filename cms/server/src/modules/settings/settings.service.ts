import { Injectable } from "@nestjs/common";
import { CMSSettings } from "../../common/types";
import { UpdateSettingsDto } from "../../common/dto";

@Injectable()
export class SettingsService {
  // In-memory storage for settings
  private settings: CMSSettings = {
    siteName: "UtterLore",
    siteDescription: "A creative studio that believes in the power of ideas",
    logo: "/assets/images/logo.png",
    favicon: "/favicon.ico",
    theme: "system",
    language: "en",
    timezone: "UTC",
  };

  async get(): Promise<CMSSettings> {
    return this.settings;
  }

  async update(updateDto: UpdateSettingsDto): Promise<CMSSettings> {
    this.settings = {
      ...this.settings,
      ...updateDto,
    };
    return this.settings;
  }

  async reset(): Promise<CMSSettings> {
    this.settings = {
      siteName: "UtterLore",
      siteDescription: "A creative studio that believes in the power of ideas",
      logo: "/assets/images/logo.png",
      favicon: "/favicon.ico",
      theme: "system",
      language: "en",
      timezone: "UTC",
    };
    return this.settings;
  }
}
