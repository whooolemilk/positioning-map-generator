import { ConceptType } from "@/app/components/Maps";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export type generatedConceptType = {
  concept: ConceptType;
  catchphrase: string;
  description: string;
  visual: string;
};

export async function POST(req: Request) {
  const { design, subject, concept } = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    temperature: 0.7,
    messages: [
      {
        role: "system",
        content: `[デザイン対象]の企画とそのビジュアルを[コンセプト]ごとに考えてください。
        出力は、[JSONフォーマット]に従い、すべてJSONの配列で出力すること。

        [JSONフォーマット]
        “”"
        {
          "concept":コンセプト
          “catchphrase”: ポスター企画のキャッチコピー(日本語),
          “description”: ポスター企画の詳細な説明文(日本語),
          “visual”: ポスターのビジュアルを示す詳細な説明文(日本語),
        }
        “”"
        `,
      },
      {
        role: "user",
        content: `[画像の抽象的な情報]=${design}\n [コンセプト]=${concept}`,
      },
    ],
  });

  const data = await response.choices[0].message.content;
  if (!data) return NextResponse.json(null);
  return NextResponse.json(JSON.parse(data));
}
