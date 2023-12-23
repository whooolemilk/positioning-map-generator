"use client";

import { Message } from "ai";
import { useChat } from "ai/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { InputGraphCheckboxChips } from "@/app/components/Inputs";
import { InputText } from "@/app/components/Inputs/InputText";
import { ConceptDataType, ConceptType, Map } from "@/app/components/Maps/Map";

export type PromptType = {
  concept: ConceptType;
  catchphrase: string;
  description: string;
  poster_component: string[];
};

export default function Home() {
  const [design, setDesign] = useState<string>("");
  const [target, setTarget] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [concept, setConcept] = useState<string>("");
  const [generatedIdeas, setGeneratedIdeas] = useState<ConceptDataType[]>([]);

  const promptTemplate = `## オーダー内容
- デザイン対象：${design}
- 被写体：${subject}
- 顧客ターゲット：${target}
以上のオーダー内容に基づく、コンセプトキーワードそれぞれのポスターの企画を生成してください。
出力時は、以下JSONのフォーマットと出力されるJSONの例に基づき、JSONの配列を返してください。
## コンセプトキーワード
${concept}
JSONのフォーマット“”"
{
  “concept”: 選択したコンセプトキーワード(日本語),
  “catchphrase”: キャッチコピー,
  “description”: 説明文,
  “poster_component”: [“component“, “component“, “component“, “component“]
}
  “”"
出力されるJSONの例“”"
{
  "concept": "ビューティ",
  "catchphrase": "あなたの美しさを、さらに引き立てる。",
  "description": "美しさをテーマに、清潔感と上質な感じを表現するトイレットペーパーのポスターです。モデルの美しい肌とトイレットペーパーの白さが対比され、美と清潔感が連想されます。",
  "poster_component": ["beautiful female model", "white toilet paper", "soft lighting", "minimalistic background"]
}
  “”"
  キーは必ず含ませる。
  ポスターの構成要素を表す<poster_component>の“component“は、必ず、英語を使うこと。
  ポスターの構成要素を表す<poster_component>は、なるべく詳細な情景を示すものであること。
  ポスターの構成要素を表す<poster_component>は、文字に関する情報は加えないこと。
  ポスターの構成要素を表す<poster_component>は、<_>は用いず、半角空白を使うこと。
  該当する情報がない場合 null にする。`;

  const generateImage = async (prompt: PromptType) => {
    try {
      // localStorageからgeneratedIdeasをget
      const savedGeneratedIdeasJson = localStorage.getItem("generatedIdeas");
      let generatedIdeas: ConceptDataType[] = savedGeneratedIdeasJson
        ? JSON.parse(savedGeneratedIdeasJson)
        : [];

      // image生成
      const { data } = await axios.post("/api/image", {
        prompt: prompt.poster_component.join(),
        amount: 1,
        resolution: "1024x1024",
      });

      // urlのみ抽出
      const urls: string[] = data.data.map(
        (image: { url: string }) => image.url
      );

      // ローカルストレージに保存するデータを作成
      const isExisted = generatedIdeas.some(
        (idea) => idea.concept === prompt.concept
      );

      if (isExisted) {
        generatedIdeas
          .find((idea) => idea.concept === prompt.concept)
          ?.images.push(...urls);
      } else {
        generatedIdeas.push({
          concept: prompt.concept,
          catchphrase: prompt.catchphrase,
          description: prompt.description,
          images: urls,
        });
      }

      // ローカルストレージにset
      const generatedIdeasJson = JSON.stringify(generatedIdeas);
      localStorage.setItem("generatedIdeas", generatedIdeasJson);
      setGeneratedIdeas(generatedIdeas);
    } catch (error) {
      console.error(error);
    }
  };

  const { messages, input, setInput, handleInputChange, handleSubmit } =
    useChat({
      initialInput: promptTemplate,
      onFinish: async (message: Message) => {
        const obj: PromptType[] = JSON.parse(message.content);
        for (const p of obj) {
          await generateImage(p);
        }
      },
    });

  useEffect(() => {
    setInput(promptTemplate);
  }, [design, target, concept]);

  return (
    <div className="w-[768px] mx-auto relative">
      {/* フォーム */}
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          handleSubmit(e);
        }}
      >
        <div className="space-y-5 bg-white py-2">
          <div>
            <InputText
              label="なんのポスター？"
              id="poster"
              placeholder="例）サイクリングキャンペーンのポスター"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setDesign(e.target.value);
                setInput(promptTemplate);
              }}
            />
          </div>
          <div>
            <InputText
              label="被写体は？"
              id="subject"
              placeholder="例）bicycle, young boy"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSubject(e.target.value);
                setInput(promptTemplate);
              }}
            />
          </div>
          <div>
            <InputText
              label="どんなターゲット？"
              id="target"
              placeholder="例）20代の男女"
              onChange={(e) => {
                setTarget(e.target.value);
                setInput(promptTemplate);
              }}
            />
          </div>
          <div>
            <InputGraphCheckboxChips
              label="言語イメージスケールより感性ワードを選択"
              updateConceptPrompt={setConcept}
            />
          </div>

          <label htmlFor="Prompt" className="text-sm font-medium hidden">
            質問文　(本来はここのフォームはみせない)
          </label>
          <div className="hidden">
            <textarea
              rows={5}
              className="mt-1 px-2 block w-full rounded-md border-0 text-gray-600 bg-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
              placeholder="ここに質問を入れてください"
              value={input}
              onChange={handleInputChange}
              readOnly
            />
          </div>
          <div>
            <button
              type="submit"
              className="inline-flex justify-center w-full rounded-full bg-blue-600 py-3 font-semibold text-white shadow-sm hover:bg-blue-500"
            >
              デザインコンセプトをマッピング！
            </button>
          </div>
        </div>
      </form>

      {/* プロンプト */}
      <div className="mt-64">
        <p className="text-lg font-bold leading-6 text-gray-900">生成Prompt</p>
        {messages.length > 0
          ? messages.map((message, index) => (
              <div key={index}>
                {message.role === "assistant" && (
                  <p className="mt-1 text-sm text-gray-600  bg-gray-100 rounded-xl p-2">
                    {message.content}
                  </p>
                )}
              </div>
            ))
          : null}
      </div>

      {/* ポジショニングマップ */}
      <Map data={generatedIdeas} />
    </div>
  );
}
