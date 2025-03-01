import connect from "@/app/utils/db";
import itemModel from "@/models/BuitisItem";

import { NextResponse } from "next/server";

export const revalidate = 0

export const GET = async (req, {params}) => {
  const id = params.id;
  if (req.method === "GET") {
    try {
      await connect();
      const data = await itemModel.findOne( { code: id });
      return new NextResponse(JSON.stringify(data), { status: 200 });
    } catch (err) {
      return new NextResponse("Database Error :(", { status: 500 });
    }
  }
};
