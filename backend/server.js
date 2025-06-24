import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import residentRoutes from "./routes/resident.route.js";
import documentRoutes from "./routes/document.route.js";
import establishmentRoutes from './routes/establishment.route.js';
import pedicabRoutes from './routes/vehicle.route.js';
import luponRoutes from './routes/lupon.route.js';
import luponMemberRoutes from './routes/luponMember.route.js';
import blotterRoutes from './routes/blotter.route.js';
import organizationRoutes from './routes/organization.route.js';
import activityRoutes from './routes/activity.routes.js';
import officialRoutes from './routes/officials.routes.js';
import certRoutes from './routes/certificates.route.js';
import brgyDisputeRoutes from './routes/brgyDispute.route.js';

import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

// Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// API Routes
app.use("/api/residents", residentRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/establishments", establishmentRoutes);
app.use("/api/pedicabs", pedicabRoutes);
app.use("/api/lupons", luponRoutes);
app.use("/api/luponMembers", luponMemberRoutes);
app.use("/api/blotters", blotterRoutes);
app.use("/api/organizations", organizationRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/officials", officialRoutes);
app.use("/api/certs", certRoutes);
app.use('/api/brgyDisputes', brgyDisputeRoutes);

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../client/dist')));

// Catch-all route for SPA (must come after other routes)
app.get('/{*any}', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Global error handler (works with Express 5's native async error catching)
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';
  console.error(err.stack || message);
  res.status(statusCode).json({
    success: false,
    message,
  });
});

// Connect to MongoDB and start the server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });
