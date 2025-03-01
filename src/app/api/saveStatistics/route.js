import connect from "@/app/utils/db";
import statisticsModel from "@/models/Statistics";

import { NextResponse } from "next/server";

export const PATCH = async (request) => {
    const data = await request.json();
    try {
        await connect();


        const newStatistics = new statisticsModel(data);
        await newStatistics.save();

        return new NextResponse(`This has been created`, { status: 200 });
    } catch (err) {
        console.error("Database Error: ", err);
        return new NextResponse("Database Error :(", { status: 500 });
    }
};