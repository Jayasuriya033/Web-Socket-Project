import express, { Request, Response, Express } from 'express';
import { PrismaClient } from '@prisma/client';

const app: Express = express();
const prisma = new PrismaClient();

app.use(express.json());

app.post('/', async (req: Request, res: Response): Promise<any> => {
  try {
    const { employee_ID, name, email, role } = req.body;

    const userExist = await prisma.employees.findFirst({
      where: {
        OR: [
          { email: email },
          { employee_ID: employee_ID }
        ]
      }
    });

    if (userExist) {
      if (userExist.email === email) {
        return res.status(400).json({ message: 'Email already in use.' });
      }

      if (userExist.employee_ID === employee_ID) {
        return res.status(400).json({ message: 'Employee ID already exists.' });
      }
    }

    const newUser = await prisma.employees.create({
      data: {
        employee_ID,
        name,
        email,
        role,
      },
    });
    console.log("---");
    

    return res.status(201).json({ signup: true, message: 'User created successfully', newUser });
  } catch (error) {
    console.error('Register Error:', error);
    return res.status(500).json({ message: 'server error' });
  }
});

export default app;


