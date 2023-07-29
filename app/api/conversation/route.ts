import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

import { increaseFreeApiLimit, hasFreeApiAccess } from "@/lib/api-limit";
import { hasActiveSubscription } from "@/lib/subscribed";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { messages } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized Access", { status: 401 });
    }

    if (!config.apiKey) {
      return new NextResponse("openai api key not configured", { status: 500 });
    }

    if (!messages) {
      return new NextResponse("No messages provided", { status: 400 });
    }

    const freeTrial = await hasFreeApiAccess();
    const isPro = await hasActiveSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial has exceeded", { status: 403 });
    }

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
    });

    if (!isPro) await increaseFreeApiLimit();

    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.error("[CONVERSATION_ERROR]", error);
    return new NextResponse("Conversation Error", { status: 500 });
  }
}
