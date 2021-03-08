const express = require('express');
const app = express();
const port = 8080
const middleware = require('./middleware')
require('./data/database')
const userRoutes = require('./routes/user.routes');
const projectRoutes = require('./routes/project.routes');
const taskRoutes = require('./routes/task.routes');
const parseBody = require('body-parser');

// Middlewares
app.use(parseBody.json());
app.use(parseBody.urlencoded({ extended: false}));
app.use(middleware.authMiddleware.isValidToken);

// Routes
app.use(userRoutes);
app.use(projectRoutes);
app.use(taskRoutes);

app.listen(port, () => console.log(`App running in port ${port}`));
