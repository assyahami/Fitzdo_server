import { app, port } from "./app/app";

app.listen(port,()=>{
  console.log(`Server is running at http://localhost:${port}`);
})