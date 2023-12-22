import { NextResponse } from "next/server";
import OpenAI from "openai";
// import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// EdgeランタイムはApp Routerと同じレスポンスタイプをサポートしているため
export const runtime = "edge";

export async function POST(req: Request) {
  // requestからpromptを抽出
  const { prompt, amount, resolution } = await req.json();
  if (!prompt) {
    return new NextResponse("Prompt are required", { status: 400 });
  }

  const response = await openai.images.generate({
    prompt,
    n: Number(amount),
    size: resolution,
  });

  return NextResponse.json(response);
  //   // ストリーミング形式でopenaiにたずねる
  //   const response = await openai.chat.completions.create({
  //     model: "gpt-3.5-turbo",
  //     stream: true,
  //     messages: messages,
  //   });

  //   // いい感じにテキストなおす
  //   const stream = OpenAIStream(response);
  //   // ストリームで応答
  //   return new StreamingTextResponse(stream);
}