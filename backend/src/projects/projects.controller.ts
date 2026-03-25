import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async create(@Request() req, @Body() body: any) {
    return this.projectsService.create(body, req.user.organizationId);
  }

  @Get()
  async findAll(@Request() req) {
    return this.projectsService.findAll(req.user.organizationId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}
