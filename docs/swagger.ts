import path from "path";

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "API De Fast Delivery",
      description: "Esta API se encarga de manejar los datos de Fast delivery",
      version: "1.12.0",
    },
  },
  servers: [
    {
      url: "http://localhost:3001",
    },
  ],
  apis: [
    path.resolve(__dirname, "./deliverymanDocs/deliverymanRoutes.yml"),
    path.resolve(__dirname, "./deliverymanDocs/deliverymanSchema.yml"),
    path.resolve(__dirname, "./packagesDocs/packageRoutes.yml"),
    path.resolve(__dirname, "./packagesDocs/packageSchema.yml"),
    path.resolve(__dirname, "./userDocs/userRoutes.yml"),
    path.resolve(__dirname, "./userDocs/userSchema.yml")
  ],
};

export default options;
