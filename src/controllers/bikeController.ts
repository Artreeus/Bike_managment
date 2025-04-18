import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import asyncHandler from 'express-async-handler';
import { AppError } from '../middleware/errorMiddleware';

const prisma = new PrismaClient();

export const createBike = asyncHandler(async (req: Request, res: Response) => {
  const { brand, model, year, customerId } = req.body;
  
  if (!brand || !model || !year || !customerId) {
    throw new AppError('Please provide brand, model, year, and customerId', 400);
  }
  
  const customer = await prisma.customer.findUnique({
    where: { customerId }
  });
  
  if (!customer) {
    throw new AppError('Customer not found', 404);
  }
  
  const bike = await prisma.bike.create({
    data: {
      brand,
      model,
      year,
      customerId
    }
  });
  
  res.status(201).json({
    success: true,
    message: 'Bike added successfully',
    data: bike
  });
});

export const getBikes = asyncHandler(async (req: Request, res: Response) => {
  const bikes = await prisma.bike.findMany();
  
  res.status(200).json({
    success: true,
    message: 'Bikes fetched successfully',
    data: bikes
  });
});

export const getBikeById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  
  const bike = await prisma.bike.findUnique({
    where: { bikeId: id }
  });
  
  if (!bike) {
    throw new AppError('Bike not found', 404);
  }
  
  res.status(200).json({
    success: true,
    message: 'Bike fetched successfully',
    data: bike
  });
});