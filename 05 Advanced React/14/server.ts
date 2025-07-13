import http from "http";
import path from "path";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import shuffle from "lodash.shuffle";

import booksData from "./books.json";

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
app.get("/favicon.ico", async (_req: Request, res: Response): Promise<void> => {
  res.sendFile(path.join(__dirname + "/favicon.svg"));
});
//* Test route
app.get("/", async (req: Request, res: Response): Promise<void> => {
  console.log("req.ip:", req.ip);
  res.send("<h1 style='color:blue;text-align:center'>API is running</h1>");
});

//^ Routes
app.get("/api/books", async (req: Request, res: Response): Promise<void> => {
  const limit = Number(req.query.limit || 10);
  const offset = Number(req.query.offset || 0);
  const books = booksData.slice(offset, offset + limit);
  res.json(books);
});

app.get("/api/books/random", async (req: Request, res: Response): Promise<void> => {
  console.log("req.ip:", req.ip);
  const [book] = shuffle(booksData);
  res.json(book);
});

app.post("/api/books", async (req: Request, res: Response): Promise<void> => {
  const { title, author } = req.body;
  const newBook = { id: booksData.length + 1, title, author };
  booksData.push(newBook);
  res.status(201).json(newBook);
});

app.get("/api/books/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const book = booksData.find((book) => book.id === Number(id));
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ error: "Book not found" });
  }
});

app.patch("/api/books/:id", async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, author } = req.body;
  const book = booksData.find((book) => book.id === Number(id));
  if (book) {
    book.title = title;
    book.author = author;
    res.json(book);
  } else {
    res.status(404).json({ error: "Book not found" });
  }
});

app.delete("/api/books/:id", async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const index = booksData.findIndex((book) => book.id === Number(id));
  if (index !== -1) {
    const deletedBook = booksData.splice(index, 1)[0];
    res.json(deletedBook);
  } else {
    res.status(404).json({ error: "Book not found" });
  }
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
