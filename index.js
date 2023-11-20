import "dotenv/config";
import express from "express";
import { errorMiddleware } from "./middleware/error-middleware.js";
import { publicRouter } from "./route/public-api.js";
import swaggerUi from "swagger-ui-express";
import { tokoBelanjaDocs as docs } from "./docs/toko-belanja-docs.js";
import { userRouter } from "./route/api.js";

const port = process.env.PORT;

export const web = express();

web.use(express.json());

web.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello from Toko Belanja API, open /api for API docs",
  });
});

web.use("/api", swaggerUi.serve, swaggerUi.setup(docs));

web.use(publicRouter);
web.use(userRouter);
web.use(errorMiddleware);

web.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
