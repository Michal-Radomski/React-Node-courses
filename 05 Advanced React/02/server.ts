import http from "http";
import path from "path";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";

import { books, currentUser, users } from "./data";

//* The server
const app: Express = express();

const corsOptions = {
  origin: true,
  methods: ["POST", "GET", "OPTIONS"],
  preflightContinue: false,
  optionsSuccessStatus: 200,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "Accept"], // Specify
};

//* Middlewares
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false,
  })
);
// Compress all responses
app.use(compression({ level: 6 }));

//* Favicon
app.get("/favicon.ico", (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + "/favicon.svg"));
});
//* Test route
app.get("/", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  res.send("<h1 style='color:blue;text-align:center'>API is running</h1>");
});

//^ Routes
app.get("/api/current-user", async (req: Request, res: Response): Promise<unknown> => {
  console.log("req.ip:", req.ip);
  return res.json(currentUser);
});

app.get("/api/users/:id", async (req: Request, res: Response): Promise<unknown> => {
  const { id } = req.params;
  return res.json(users.find((user) => user.id === id));
});

app.get("/api/users", async (req, res): Promise<unknown> => {
  console.log("req.ip:", req.ip);
  return res.json(users);
});

app.post("/api/users/:id", async (req, res): Promise<unknown> => {
  const { id } = req.params;
  const { user: editedUser } = req.body;

  const newUsers = users.map((user) => (user.id === id ? editedUser : user));

  return res.json(newUsers.find((user) => user.id === id));
});

app.get("/api/books", async (req, res): Promise<unknown> => {
  console.log("req.ip:", req.ip);
  return res.json(books);
});

app.get("/api/books/:id", async (req, res): Promise<unknown> => {
  const { id } = req.params;
  return res.json(books.find((book) => book.id === id));
});

//* Port
const portHTTP = (process.env.PORT || 5000) as number;

const httpServer = http.createServer(app);
//* IPv4
httpServer.listen({ port: portHTTP, host: "127.0.0.1" }, () => {
  console.log(`🚀 Server is listening at http://localhost:${portHTTP}`);
  // For testing only
  console.log("Current Time:", new Date().toLocaleTimeString());
});
