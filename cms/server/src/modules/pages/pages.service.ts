import { Injectable } from "@nestjs/common";
import { InputJsonValue } from "@prisma/client/runtime/library";
import { PrismaService } from "../../prisma";
import { PageContent, SectionContent } from "../../common/types";
import {
  CreatePageDto,
  UpdatePageDto,
  UpdateSectionDto,
} from "../../common/dto";

// Type for Page with sections included from Prisma query
interface PageWithSections {
  id: string;
  schemaId: string;
  slug: string;
  title: string | null;
  description: string | null;
  modifiedBy: string | null;
  createdAt: Date;
  updatedAt: Date;
  sections: Array<{
    id: string;
    pageId: string;
    sectionId: string;
    enabled: boolean;
    order: number;
    data: unknown;
  }>;
}

@Injectable()
export class PagesService {
  constructor(private prisma: PrismaService) {}

  // ============================================
  // CRUD OPERATIONS
  // ============================================

  async findAll(): Promise<PageContent[]> {
    const pages = await this.prisma.page.findMany({
      include: { sections: { orderBy: { order: "asc" } } },
    });

    return pages.map((page: PageWithSections) => this.mapToPageContent(page));
  }

  async findOne(id: string): Promise<PageContent | null> {
    const page = await this.prisma.page.findUnique({
      where: { id },
      include: { sections: { orderBy: { order: "asc" } } },
    });

    return page ? this.mapToPageContent(page) : null;
  }

  async findBySlug(slug: string): Promise<PageContent | null> {
    const page = await this.prisma.page.findUnique({
      where: { slug },
      include: { sections: { orderBy: { order: "asc" } } },
    });

    return page ? this.mapToPageContent(page) : null;
  }

  async findBySchemaId(schemaId: string): Promise<PageContent | null> {
    const page = await this.prisma.page.findFirst({
      where: { schemaId },
      include: { sections: { orderBy: { order: "asc" } } },
    });

    return page ? this.mapToPageContent(page) : null;
  }

  async create(createPageDto: CreatePageDto): Promise<PageContent> {
    const page = await this.prisma.page.create({
      data: {
        schemaId: createPageDto.pageSchemaId,
        slug: createPageDto.slug,
        title: createPageDto.metadata?.title,
        description: createPageDto.metadata?.description,
        modifiedBy: createPageDto.metadata?.modifiedBy,
        sections: {
          create: createPageDto.sections.map((section) => ({
            sectionId: section.id,
            enabled: section.enabled,
            order: section.order,
            data: section.data as InputJsonValue,
          })),
        },
      },
      include: { sections: { orderBy: { order: "asc" } } },
    });

    return this.mapToPageContent(page);
  }

  async update(
    id: string,
    updatePageDto: UpdatePageDto,
  ): Promise<PageContent | null> {
    const existing = await this.prisma.page.findUnique({ where: { id } });
    if (!existing) return null;

    // Update page metadata
    await this.prisma.page.update({
      where: { id },
      data: {
        slug: updatePageDto.slug,
        title: updatePageDto.metadata?.title,
        description: updatePageDto.metadata?.description,
        modifiedBy: updatePageDto.metadata?.modifiedBy,
      },
    });

    // Update sections if provided
    if (updatePageDto.sections) {
      for (const sectionDto of updatePageDto.sections) {
        await this.prisma.section.upsert({
          where: {
            pageId_sectionId: { pageId: id, sectionId: sectionDto.id },
          },
          create: {
            pageId: id,
            sectionId: sectionDto.id,
            enabled: sectionDto.enabled,
            order: sectionDto.order,
            data: sectionDto.data as InputJsonValue,
          },
          update: {
            enabled: sectionDto.enabled,
            order: sectionDto.order,
            data: sectionDto.data as InputJsonValue,
          },
        });
      }
    }

    // Refetch with updated sections
    const updatedPage = await this.prisma.page.findUnique({
      where: { id },
      include: { sections: { orderBy: { order: "asc" } } },
    });
    return updatedPage ? this.mapToPageContent(updatedPage) : null;
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.page.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }

  // ============================================
  // SECTION OPERATIONS
  // ============================================

  async findSection(
    pageId: string,
    sectionId: string,
  ): Promise<SectionContent | null> {
    const section = await this.prisma.section.findUnique({
      where: { pageId_sectionId: { pageId, sectionId } },
    });

    return section ? this.mapToSectionContent(section) : null;
  }

  async updateSection(
    pageId: string,
    sectionId: string,
    updateSectionDto: UpdateSectionDto,
  ): Promise<SectionContent | null> {
    try {
      const section = await this.prisma.section.update({
        where: { pageId_sectionId: { pageId, sectionId } },
        data: {
          enabled: updateSectionDto.enabled,
          order: updateSectionDto.order,
          data: updateSectionDto.data as InputJsonValue,
        },
      });

      // Update page's updatedAt timestamp
      await this.prisma.page.update({
        where: { id: pageId },
        data: { updatedAt: new Date() },
      });

      return this.mapToSectionContent(section);
    } catch {
      return null;
    }
  }

  async reorderSections(
    pageId: string,
    sectionIds: string[],
  ): Promise<boolean> {
    try {
      await this.prisma.$transaction(
        sectionIds.map((sectionId, index) =>
          this.prisma.section.update({
            where: { pageId_sectionId: { pageId, sectionId } },
            data: { order: index },
          }),
        ),
      );

      await this.prisma.page.update({
        where: { id: pageId },
        data: { updatedAt: new Date() },
      });

      return true;
    } catch {
      return false;
    }
  }

  // ============================================
  // HELPER METHODS
  // ============================================

  private mapToPageContent(page: any): PageContent {
    return {
      id: page.id,
      pageSchemaId: page.schemaId,
      slug: page.slug,
      sections: page.sections.map((s: any) => this.mapToSectionContent(s)),
      metadata: {
        title: page.title,
        description: page.description,
        lastModified: page.updatedAt.toISOString(),
        modifiedBy: page.modifiedBy,
      },
    };
  }

  private mapToSectionContent(section: any): SectionContent {
    return {
      id: section.sectionId,
      enabled: section.enabled,
      order: section.order,
      data: section.data as Record<string, unknown>,
    };
  }
}
