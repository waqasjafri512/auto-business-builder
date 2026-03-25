import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Organization, Membership } from '../schemas/organization.schema';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectModel(Organization.name) private orgModel: Model<Organization>,
    @InjectModel(Membership.name) private membershipModel: Model<Membership>,
  ) {}

  async create(name: string, ownerId: string): Promise<Organization> {
    const newOrg = new this.orgModel({ name, ownerId });
    const savedOrg = await newOrg.save();
    
    // Auto-create membership for owner
    await this.createMembership(ownerId, (savedOrg._id as any).toString(), 'OWNER');
    
    return savedOrg;
  }

  async createMembership(userId: string, organizationId: string, role: string = 'MEMBER'): Promise<Membership> {
    const newMembership = new this.membershipModel({ userId, organizationId, role });
    return newMembership.save();
  }

  async findUserOrganizations(userId: string): Promise<Membership[]> {
    return this.membershipModel.find({ userId }).populate('organizationId').exec();
  }

  async update(id: string, data: any): Promise<Organization> {
    const org = await this.orgModel.findByIdAndUpdate(id, data, { new: true }).exec();
    if (!org) throw new NotFoundException('Organization not found');
    return org;
  }

  async findByStripeCustomerId(stripeCustomerId: string): Promise<Organization | null> {
    return this.orgModel.findOne({ stripeCustomerId }).exec();
  }

  async findOne(id: string): Promise<Organization> {
    const org = await this.orgModel.findById(id).exec();
    if (!org) throw new NotFoundException('Organization not found');
    return org;
  }
}
