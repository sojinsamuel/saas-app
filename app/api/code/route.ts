import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

import { increaseFreeApiLimit, hasFreeApiAccess } from "@/lib/api-limit";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

const instructionMessage: ChatCompletionRequestMessage = {
  role: "system",
  content:
    "You are a software enginner, you will answer the user questions with code snippets and code comments when neccesarry for explanation. the only textual conversation will be the code comments rest of them will to answer the users wish with the code snippet which dooes a particular task in their asked programming lanuguage",
};

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

    if (!freeTrial) {
      return new NextResponse("Free trial has exceeded", { status: 403 });
    }

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [instructionMessage, ...messages],
    });

    await increaseFreeApiLimit();

    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.error("[CODE_ERROR]", error);
    return new NextResponse("Code Error", { status: 500 });
  }
}
