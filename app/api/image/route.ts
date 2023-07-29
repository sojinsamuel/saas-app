import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

import { increaseFreeApiLimit, hasFreeApiAccess } from "@/lib/api-limit";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { prompt, amount = 1, resolution = "512x512" } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized Access", { status: 401 });
    }

    if (!config.apiKey) {
      return new NextResponse("openai api key not configured", { status: 500 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is Required", { status: 400 });
    }

    const freeTrial = await hasFreeApiAccess();

    if (!freeTrial) {
      return new NextResponse("Free trial has exceeded", { status: 403 });
    }

    const response = await openai.createImage({
      prompt,
      n: Number.parseInt(amount, 10),
      size: resolution,
    });

    await increaseFreeApiLimit();

    return NextResponse.json(response.data.data);
  } catch (error) {
    console.error("[IMAGE_ERROR]", error);
    return new NextResponse("Image Error", { status: 500 });
  }
}
