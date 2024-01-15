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
        content: `[画像の抽象的な情報]をより具体化するための属性をできるだけ多く洗い出して、配列として出力してください。
        * 余計なラベルや補足は出力しないでください。
        `,
      },
      {
        role: "user",
        content: `[画像の抽象的な情報]=${visual}`,
      },
    ],
  });

  const variables = await response.choices[0].message.content;
  if (!variables) return NextResponse.json(null);
  return NextResponse.json(variables);
}
