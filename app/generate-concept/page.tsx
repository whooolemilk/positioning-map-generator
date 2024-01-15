"use client";

import axios from "axios";
import { DeeplLanguages } from "deepl";
import { useState } from "react";
import { ImageGenerateParams } from "openai/resources";
import Image from "next/image";
import { InputText } from "@/app/components/Inputs/InputText";
import { Translator } from "@/app/libs/Translation";
import { generatedConceptType } from "@/app/api/concept/route";

export default function GenerateImage() {
  const [prompt, setPrompt] = useState<string>("");
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(prompt);
    fetchGenerateConcept(prompt);
  };

  const clickTranslate = (my_text: string, my_target_lang: DeeplLanguages) => {
    const translations = Translator(my_text, my_target_lang);
    const text = translations.then((result) => result.text);
    return text;
  };

  const fetchGenerateConcept = async (prompt: string) => {
    try {
      console.log("生成開始");

      const conceptParams = {
        design: prompt,
      };
      const { data: concepts } = await axios.post<generatedConceptType[]>(
        "/api/concept",
        conceptParams
      );
      console.log(concepts);
      console.log("en:", clickTranslate(concepts[0].visual, "EN-US"));
      const enPrompt = await clickTranslate(concepts[0].visual, "EN-US");
      const params: ImageGenerateParams = {
        prompt: enPrompt,
        n: 1,
        size: "1024x1024",
      };

      // image生成
      console.log("生成中");
      const { data: Images } = await axios.post("/api/image", params);

      // urlのみ抽出
      const urls: string[] = Images.data.map(
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
              label="属性生成プロンプト"
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
          <Image src={url} key={index} alt="" width={500} height={500} />
        ))}
      </div>
    </div>
  );
}
