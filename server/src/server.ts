import { config } from './config';
import app from './app';

const startServer = () => {
  try {
    console.log('Starting server with config:', config);

    // Ensure config and port are defined
    if (!config || !config.port) {
      throw new Error('Port configuration is missing');
    }

    const server = app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
      console.log(`Environment: ${config.environment}`);
    });

    return server;
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

const server = startServer();

// Optional: Handle process termination
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
    process.exit(0);
  });
});

export default server;