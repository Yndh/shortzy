import { NextApiResponse } from "next";
import { mGET } from "./GET";

interface ResponseInterface<T = any> extends NextApiResponse<T> {
  params: {
    code: string;
  };
}

export function GET(req: Request, res: ResponseInterface) {
  return mGET(req, res);
}
