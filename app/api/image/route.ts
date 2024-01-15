import { NextResponse } from "next/server";
import OpenAI from "openai";
import { ImageGenerateParams } from "openai/resources/images";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// EdgeランタイムはApp Routerと同じレスポンスタイプをサポートしているため
export const runtime = "edge";

export async function POST(req: Request) {
  // requestからpromptを抽出
  const { prompt, n, size, style }: ImageGenerateParams = await req.json();
  if (!prompt) {
    return new NextResponse("Prompt are required", { status: 400 });
  }

  const response = await openai.images.generate({
    prompt,
    n: n,
    size: size,
    model: "dall-e-3",
    style: style,
    response_format: "url",
  });

  return NextResponse.json(response);
}
