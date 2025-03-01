import connect from "@/app/utils/db";
import itemModel from "@/models/BuitisItem";
import { NextResponse } from "next/server";

export const DELETE = async (request, { params }) => {
  const code = params.id; // Assuming 'params.id' actually contains the code
  try {
    await connect();

    const deletedData = await itemModel.findOneAndDelete({ code: code });

    if (!deletedData) {
      return NextResponse.json("Item not found", { status: 404 });
    }

    return NextResponse.json(`Item with code ${code} has been deleted`, {
      status: 200,
    });
  } catch (err) {
    console.error("Database Error: ", err);
    return NextResponse.json("Database Error :(", { status: 500 });
  }
};
