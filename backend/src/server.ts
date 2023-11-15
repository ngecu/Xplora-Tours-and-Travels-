import express, { json } from "express";
// import { testConnection } from "./config/sqlConfig";
import cors from 'cors'
import user_router from "./routes/userRoutes";
import category_router from "./routes/categoryRoutes";
import event_router from "./routes/eventRoutes";
import bookingRouter from "./routes/bookingRoutes";
import reviewRouter from "./routes/reviewRoutes";
const app = express();

app.use(cors())
app.use(json())

// app.use("/", () => {
//   console.log("api is working");
// });


app.use('/user', user_router)
app.use('/category', category_router)
app.use('/events', event_router)
app.use('/booking', bookingRouter)
app.use('/review', reviewRouter)






const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT} `);

});
