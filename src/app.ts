import express from "express";
import sequelize from "./application/dbconfiq/sequlize.confiq";
import AuthRoutes from "./application/module/auth/auth.routes";

const application = async () => {
  try {
    const app = express();
    app.use(express.json());

    await sequelize.authenticate();
    console.log('Sequelize with Postgres Connected')

    const authRoutes = new AuthRoutes();
    
    app.use('/auth' , authRoutes.getRouterInstance())

    return app;
  } catch (error) {
    throw error
  }
};

export default application;
