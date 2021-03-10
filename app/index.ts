import * as express from 'express';
import { Middlewares } from './middleware';
import { Database } from './data/database';
import userRoutes from './routes/user.routes';
import projectRoutes from'./routes/project.routes';
import taskRoutes from './routes/task.routes';

const app = express();
const port = 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(Middlewares.isValidToken);
Database.Connect();

// Routes
app.use(userRoutes);
app.use(projectRoutes);
app.use(taskRoutes);

app.listen(port, () => console.log(`App running in port ${port}`));
