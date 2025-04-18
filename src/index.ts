import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import customerRoutes from './routes/customerRoutes';
import bikeRoutes from './routes/bikeRoutes';
import serviceRoutes from './routes/serviceRoutes';
import { errorHandler } from './middleware/errorMiddleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Bike Servicing Management API',
    endpoints: {
      customers: '/api/customers',
      bikes: '/api/bikes',
      services: '/api/services'
    }
  });
});

app.use('/api/customers', customerRoutes);
app.use('/api/bikes', bikeRoutes);
app.use('/api/services', serviceRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});