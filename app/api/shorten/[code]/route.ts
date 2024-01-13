import { NextApiResponse } from "next";
import { mGET } from "./GET";
import { mDELETE } from "./DELETE";
import { mPOST } from "./POST";

interface ResponseInterface<T = any> extends NextApiResponse<T> {
  params: {
    code: string;
  };
}

export function POST(req: Request, res: ResponseInterface) {
  return mPOST(req, res);
}

export function GET(req: Request, res: ResponseInterface) {
  return mGET(req, res);
}

export function DELETE(req: Request, res: ResponseInterface) {
  return mDELETE(req, res);
}
