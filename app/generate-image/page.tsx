"use client";

import axios from "axios";
import { useState } from "react";
import { InputText } from "@/app/components/Inputs/InputText";
import { ConceptType } from "@/app/components/Maps/Map";
import { ImageGenerateParams } from "openai/resources/images";
import Image from "next/image";

export type PromptType = {
  concept: ConceptType;
  catchphrase: string;
  description: string;
  poster_component: string[];
};

export default function GenerateImage() {
  const [prompt, setPrompt] = useState<string>("");
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(prompt);
    generateImage(prompt);
  };

  const generateImage = async (prompt: string) => {
    try {
      console.log("生成開始");
      // params作成
      const params: ImageGenerateParams = {
        prompt: prompt,
        n: 1,
        size: "1024x1024",
      };

      // image生成
      console.log("生成中");
      const { data } = await axios.post("/api/image", params);

      // urlのみ抽出
      const urls: string[] = data.data.map(
        (image: { url: string }) => image.url
      );

      setGeneratedImages(urls);
      console.log("生成完了");
    } catch (error) {
      console.error(error);
    }
  };

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
              label="画像生成プロンプト"
              id="prompt"
              placeholder="prompt"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="submit"
              value="画像生成"
              className="inline-flex justify-center w-full rounded-full bg-blue-600 py-3 font-semibold text-white shadow-sm hover:bg-blue-500"
            />
          </div>
        </div>
      </form>
      <div className="flex gap-4 justify-center pt-5">
        {generatedImages.map((url, index) => (
          <Image src={url} key={index} alt="" width={120} height={120} />
        ))}
      </div>
    </div>
  );
}
