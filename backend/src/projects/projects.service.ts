import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from '../schemas/project.schema';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { OrganizationsService } from '../organizations/organizations.service';

@Injectable()
export class ProjectsService {
  private aiServiceUrl: string;

  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
    private configService: ConfigService,
    private orgService: OrganizationsService,
  ) {
    this.aiServiceUrl = this.configService.get<string>('AI_SERVICE_URL') || 'http://localhost:3001';
  }

  async create(createProjectDto: any, organizationId: string): Promise<Project> {
    // Check usage limits
    const org = await this.orgService.findOne(organizationId);
    if (!org.plan || org.plan === 'FREE') {
      const projectCount = await this.projectModel.countDocuments({ organizationId }).exec();
      if (projectCount >= 2) {
        throw new ForbiddenException('Free plan limit reached (2 projects). Please upgrade to PRO for unlimited generation.');
      }
    }

    const { idea, location, budget } = createProjectDto;

    const newProject = new this.projectModel({
      organizationId,
      idea,
      location,
      budget,
      status: 'GENERATING',
    });

    const savedProject = await newProject.save();

    // Trigger AI generation asynchronously (MVP: simple axios call, ideally a queue)
    this.generateAIService((savedProject._id as any).toString(), idea, location, budget).catch(err => {
        console.error('AI Strategy Generation Failed:', err);
    });

    return savedProject;
  }

  private async generateAIService(projectId: string, idea: string, location?: string, budget?: string) {
    try {
      const response = await axios.post(`${this.aiServiceUrl}/generate`, {
        idea,
        location,
        budget,
      });

      await this.projectModel.findByIdAndUpdate(projectId, {
        aiResponse: response.data,
        status: 'COMPLETED',
      });
    } catch (error) {
      await this.projectModel.findByIdAndUpdate(projectId, {
        status: 'FAILED',
      });
      throw error;
    }
  }

  async findAll(organizationId: string): Promise<Project[]> {
    return this.projectModel.find({ organizationId }).sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectModel.findById(id).exec();
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async remove(id: string): Promise<any> {
    const project = await this.projectModel.findByIdAndDelete(id).exec();
    if (!project) throw new NotFoundException('Project not found');
    return { message: 'Project deleted successfully' };
  }
}
