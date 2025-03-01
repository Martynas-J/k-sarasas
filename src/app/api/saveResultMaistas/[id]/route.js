import connect from "@/app/utils/db";
import itemModel from "@/models/MaistasItem";
import { NextResponse } from "next/server";
// Įsitikinkite, kad tinkamai importuojate savo Mongoose modelį

export const PATCH = async (request, { params }) => {
  const id = params.id;
  const data = await request.json();
  try {
    await connect();
    let updateFields = {};
    const existingItem = await itemModel.findOne({ code: id });

    if (data.itemName) {
      updateFields = {
        itemValue: data.itemValue,
        ...(data.itemName && { itemName: data.itemName }),
      };
    } else {
      updateFields = {
        $inc: { itemValue: data.itemValue },
        ...(data.itemName && { itemName: data.itemName }),
      };
    }

    const updatedData = await itemModel.findOneAndUpdate(
      { code: id },
      updateFields,
      { new: true }
    );

    if (!updatedData) {
      if (!data.itemName) {
        return new NextResponse(`This has been updated`, { status: 400 });
      }
      const newItem = new itemModel({ code: id, ...data });
      await newItem.save();
    }

    return new NextResponse(`This has been updated`, { status: 200 });
  } catch (err) {
    console.error("Database Error: ", err);
    return new NextResponse("Database Error :(", { status: 500 });
  }
};
