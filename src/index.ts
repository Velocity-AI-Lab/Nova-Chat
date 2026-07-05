import { app } from "./app";

const PORT = Number(Bun.env.PORT) || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
