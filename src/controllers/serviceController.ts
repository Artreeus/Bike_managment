import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import asyncHandler from 'express-async-handler';
import { AppError } from '../middleware/errorMiddleware';

const prisma = new PrismaClient();

export const createService = asyncHandler(async (req: Request, res: Response) => {
  const { bikeId, serviceDate, description, status } = req.body;
  
  if (!bikeId || !serviceDate || !description || !status) {
    throw new AppError('Please provide bikeId, serviceDate, description, and status', 400);
  }
  
  const bike = await prisma.bike.findUnique({
    where: { bikeId }
  });
  
  if (!bike) {
    throw new AppError('Bike not found', 404);
  }
  
  const service = await prisma.serviceRecord.create({
    data: {
      bikeId,
      serviceDate: new Date(serviceDate),
      description,
      status
    }
  });
  
  res.status(201).json({
    success: true,
    message: 'Service record created successfully',
    data: service
  });
});

export const getServices = asyncHandler(async (req: Request, res: Response) => {
  const services = await prisma.serviceRecord.findMany();
  
  res.status(200).json({
    success: true,
    message: 'Service records fetched successfully',
    data: services
  });
});

export const getServiceById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  
  const service = await prisma.serviceRecord.findUnique({
    where: { serviceId: id }
  });
  
  if (!service) {
    throw new AppError('Service record not found', 404);
  }
  
  res.status(200).json({
    success: true,
    message: 'Service record fetched successfully',
    data: service
  });
});

export const completeService = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { completionDate } = req.body;
  
  const service = await prisma.serviceRecord.findUnique({
    where: { serviceId: id }
  });
  
  if (!service) {
    throw new AppError('Service record not found', 404);
  }
  
  const updatedService = await prisma.serviceRecord.update({
    where: { serviceId: id },
    data: {
      completionDate: completionDate ? new Date(completionDate) : new Date(),
      status: 'done'
    }
  });
  
  res.status(200).json({
    success: true,
    message: 'Service marked as completed',
    data: updatedService
  });
});

export const getOverdueServices = asyncHandler(async (req: Request, res: Response) => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  const overdueServices = await prisma.serviceRecord.findMany({
    where: {
      status: {
        in: ['pending', 'in-progress']
      },
      serviceDate: {
        lt: sevenDaysAgo
      }
    }
  });
  
  res.status(200).json({
    success: true,
    message: 'Overdue or pending services fetched successfully',
    data: overdueServices
  });
});