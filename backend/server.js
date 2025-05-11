import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import residentRoutes from "./routes/resident.route.js";
import documentRoutes from "./routes/document.route.js";
import establishmentRoutes from './routes/establishment.route.js'
import pedicabRoutes from './routes/vehicle.route.js'
import luponRoutes from './routes/lupon.route.js'
import blotterRoutes from './routes/blotter.route.js'
import organizationRoutes from './routes/organization.route.js'
import activityRoutes from './routes/activity.routes.js'
import officialRoutes from './routes/officials.routes.js'
import certRoutes from './routes/certificates.route.js'

import path from 'path';

dotenv.config();

// Fix for __dirname in ES Modules
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const app = express();
// app.use(cors());
app.use(express.json());

app.use("/api/residents", residentRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/establishments", establishmentRoutes);
app.use("/api/pedicabs", pedicabRoutes);
app.use("/api/lupons", luponRoutes);
app.use("/api/blotters", blotterRoutes);
app.use("/api/organizations", organizationRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/officials", officialRoutes);
app.use("/api/certs", certRoutes);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => console.error("Connection error:", err));


  app.use(express.static(path.join(__dirname, '../client/dist')));

  // app.get('*', (req, res) => {
  //   res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
  // });

  app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message
    })  
  
  });