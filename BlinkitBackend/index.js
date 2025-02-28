import { DatabaseConnect } from "./db/index.js";
import { app } from "./app.js";

const port = process.env.PORT;
DatabaseConnect()
  .then(() => {
    app.listen(port, () => {
      console.log(`server running at the port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Connection failed");
  });
