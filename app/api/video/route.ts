import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

import { increaseFreeApiLimit, hasFreeApiAccess } from "@/lib/api-limit";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { prompt } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized Access", { status: 401 });
    }

    if (!replicate.auth) {
      return new NextResponse("Replicate Token not configured", {
        status: 500,
      });
    }

    if (!prompt) {
      return new NextResponse("No messages provided", { status: 400 });
    }

    const freeTrial = await hasFreeApiAccess();

    if (!freeTrial) {
      return new NextResponse("Free trial has exceeded", { status: 403 });
    }

    // Ref: https://replicate.com/anotherjesse/zeroscope-v2-xl/api
    const response = await replicate.run(
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      {
        input: {
          prompt,
        },
      }
    );

    await increaseFreeApiLimit();

    return NextResponse.json(response);
  } catch (error) {
    console.error("[VIDEO_ERROR]", error);
    return new NextResponse("Video Error", { status: 500 });
  }
}
