import http from "http";
import path from "path";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import { nanoid } from "nanoid";

import { quotesOriginal } from "./quotesOriginal";
import { quotes } from "./quotes";

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
app.get("/test", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  res.send("<h1 style='color:blue;text-align:center'>API is running</h1>");
});

const sleep = (time = 1000) => new Promise((resolve) => setTimeout(resolve, time));

const readQuotes = async () => {
  return quotes;
};

const addQuote = (quote: string, author: string): string => {
  const id = nanoid();
  quotes.quotes.unshift({ id, quote, author });
  return id;
};

const getQuotesByPage = async (page: number, limit: number) => {
  const offset = page * limit;
  const endIndex = offset + limit;
  const quotesData = await readQuotes();
  const quotes = quotesData.quotes.slice(offset, endIndex);
  return {
    quotes,
    hasMore: endIndex < quotesData.quotes.length - 1,
  };
};

const getQuotesByCursor = async (cursor: number, limit: number) => {
  const endIndex = cursor + limit;
  const quotesData = await readQuotes();
  const quotes = quotesData.quotes.slice(cursor, endIndex);

  return {
    quotes,
    nextCursor: endIndex < quotesData.quotes.length - 1 ? endIndex + 1 : null,
  };
};

app.get("/top_quotes", async (request: Request, response: Response): Promise<void> => {
  console.log("request.ip:", request.ip);

  try {
    await sleep();
    const quotesData = await readQuotes();
    response.json({
      quotes: quotesData.quotes.slice(0, 5),
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/", async (request: Request, response: Response): Promise<unknown> => {
  try {
    const { page, cursor } = request.query;
    if (!page && !cursor) {
      throw new Error('Missing parameters. Please provide "page" or "cursor" parameter in the request query.');
    }
    await sleep();

    const limit = 5;

    if (page) {
      return response.json(await getQuotesByPage(parseInt(page as string), limit));
    }
    if (cursor) {
      return response.json(await getQuotesByCursor(parseInt(cursor as string), limit));
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({
      error: 'Missing parameters("page" or "cursor"). ',
    });
  }
});

app.post("/", async (request: Request, response: Response): Promise<unknown> => {
  try {
    const { quote, author } = request.body;
    if (!quote || !author) {
      response.status(400).send("Please provide author and quote text.");
      return;
    }
    await sleep();
    const id = addQuote(quote, author);
    response.status(201).json({ id });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/reset", async (request: Request, response: Response): Promise<void> => {
  console.log("request.ip:", request.ip);

  try {
    await sleep();
    quotes.quotes.length = 0;
    quotes.quotes.push(...quotesOriginal.quotes);
    response.json({ success: true });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal Server Error" });
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
