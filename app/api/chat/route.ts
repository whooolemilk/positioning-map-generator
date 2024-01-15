import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// EdgeランタイムはApp Routerと同じレスポンスタイプをサポートしているため
export const runtime = "edge";

export async function POST(req: Request) {
  try {
    // requestからpromptを抽出
    const { messages } = await req.json();

    // ストリーミング形式でopenaiにたずねる
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: messages,
    });

    // いい感じにテキストなおす
    // aiが最新のopenaiにバージョン対応していないため使えない
    const stream = OpenAIStream(response);

    // ストリームで応答
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
