import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  const { visual } = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    temperature: 0.7,
    messages: [
      {
        role: "system",
        content: `[画像の抽象的な情報]と[画像に必ず含まれる要素]を基に画像生成AIで画像を生成したいです。
        画像を生成するためのプロンプト[出力フォーマット]のみを英語で詳細に出力してください。
        余計なラベルや補足は出力しないでください。
        
        [出力フォーマット]
        {Description of the image}
        * 余計なラベルや補足は出力しないでください。
        `,
      },
      {
        role: "user",
        content: `[画像の抽象的な情報]=${visual}`,
      },
    ],
  });

  const prompt = await response.choices[0].message.content;
  if (!prompt) return NextResponse.json(null);
  return NextResponse.json(prompt);
}
