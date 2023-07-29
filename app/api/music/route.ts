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

    // Ref: https://replicate.com/riffusion/riffusion/api
    const response = await replicate.run(
      "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
      {
        input: {
          prompt_a: prompt,
        },
      }
    );

    await increaseFreeApiLimit();

    return NextResponse.json(response);
  } catch (error) {
    console.error("[MUSIC_ERROR]", error);
    return new NextResponse("Music Error", { status: 500 });
  }
}
