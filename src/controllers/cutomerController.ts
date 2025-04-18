import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import asyncHandler from 'express-async-handler';
import { AppError } from '../middleware/errorMiddleware';

const prisma = new PrismaClient();

export const createCustomer = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, phone } = req.body;
  
  if (!name || !email || !phone) {
    throw new AppError('Please provide name, email, and phone', 400);
  }
  
  const existingCustomer = await prisma.customer.findUnique({
    where: { email }
  });
  
  if (existingCustomer) {
    throw new AppError('Customer with this email already exists', 400);
  }
  
  const customer = await prisma.customer.create({
    data: {
      name,
      email,
      phone
    }
  });
  
  res.status(201).json({
    success: true,
    message: 'Customer created successfully',
    data: customer
  });
});

export const getCustomers = asyncHandler(async (req: Request, res: Response) => {
  const customers = await prisma.customer.findMany();
  
  res.status(200).json({
    success: true,
    message: 'Customers fetched successfully',
    data: customers
  });
});

export const getCustomerById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  
  const customer = await prisma.customer.findUnique({
    where: { customerId: id }
  });
  
  if (!customer) {
    throw new AppError('Customer not found', 404);
  }
  
  res.status(200).json({
    success: true,
    message: 'Customer fetched successfully',
    data: customer
  });
});

export const updateCustomer = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  
  const customer = await prisma.customer.findUnique({
    where: { customerId: id }
  });
  
  if (!customer) {
    throw new AppError('Customer not found', 404);
  }
  
  const updatedCustomer = await prisma.customer.update({
    where: { customerId: id },
    data: {
      name: name || customer.name,
      email: email || customer.email,
      phone: phone || customer.phone
    }
  });
  
  res.status(200).json({
    success: true,
    message: 'Customer updated successfully',
    data: updatedCustomer
  });
});

export const deleteCustomer = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  
  const customer = await prisma.customer.findUnique({
    where: { customerId: id }
  });
  
  if (!customer) {
    throw new AppError('Customer not found', 404);
  }
  
  await prisma.customer.delete({
    where: { customerId: id }
  });
  
  res.status(200).json({
    success: true,
    message: 'Customer deleted successfully'
  });
});