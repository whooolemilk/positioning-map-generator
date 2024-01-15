"use client";

import axios from "axios";
import { useState } from "react";
import { InputGraphCheckboxChips } from "@/app/components/Inputs";
import { InputText } from "@/app/components/Inputs/InputText";
import { DesignDataType, MapDesign } from "@/app/components/Maps";
import { DeeplLanguages } from "deepl";
import { Translator } from "@/app/libs/Translation";
import { ImageGenerateParams } from "openai/resources";
import { generatedConceptType } from "@/app/api/concept/route";

export default function Version3() {
  const [design, setDesign] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [concept, setConcept] = useState<string>("");
  const [generatedDesigns, setGeneratedDesigns] = useState<DesignDataType[]>(
    []
  );

  const handleDesignChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log("design:", e.target.value);
    setDesign(e.target.value);
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log("subject:", e.target.value);
    setSubject(e.target.value);
  };

  const handleConceptChange = (newConcept: string) => {
    // console.log("concept:", newConcept);
    setConcept(newConcept);
  };

  const clickTranslate = (my_text: string, my_target_lang: DeeplLanguages) => {
    const translations = Translator(my_text, my_target_lang);
    const text = translations.then((result) => result.text);
    return text;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    generateDesign();
  };

  const generateImage = async (enPrompt: string) => {
    // dall-e-3
    const params: ImageGenerateParams = {
      prompt: enPrompt,
      n: 1,
      size: "1024x1024",
    };

    // image生成
    console.log("画像生成中");
    const { data: Images } = await axios.post("/api/image", params);

    // urlのみ抽出
    const urls: string[] = Images.data.map(
      (image: { url: string }) => image.url
    );

    return urls;
  };

  const generateDesign = async () => {
    try {
      console.log("生成開始");
      const conceptParams = {
        design: design,
        subject: subject,
        concept: concept,
      };

      // concept生成
      const { data: concepts } = await axios.post<generatedConceptType[]>(
        "/api/concept",
        conceptParams
      );
      console.log("generatedConcepts:", concepts);

      // プロンプト英訳
      const enPrompts = concepts.map(async (concept) => {
        const enPrompt = await clickTranslate(concept.visual, "EN-US");
        return enPrompt;
      });

      // localStorageからgeneratedIdeasをget
      const savedDesignsJson = localStorage.getItem("generatedDesigns");
      let savedDesigns: DesignDataType[] = savedDesignsJson
        ? JSON.parse(savedDesignsJson)
        : [];

      Promise.all(enPrompts)
        .then((results: string[]) => {
          console.log("results:", results);
          results.map(async (enPrompt, index) => {
            const urls = await generateImage(enPrompt);
            const generatedDesign: DesignDataType = {
              ...concepts[index],
              images: urls,
            };

            // ローカルストレージに保存するデータを作成
            const isExisted = savedDesigns.some(
              (design) => design.concept === generatedDesign.concept
            );

            if (isExisted) {
              savedDesigns
                .find((design) => design.concept === generatedDesign.concept)
                ?.images.push(...urls);
            } else {
              savedDesigns.push(generatedDesign);
            }

            // ローカルストレージにset
            const generatedDesignsJson = JSON.stringify(savedDesigns);
            localStorage.setItem("generatedDesigns", generatedDesignsJson);
            setGeneratedDesigns(savedDesigns);

            console.log("generatedDesign:", generatedDesign);
          });
        })
        .catch((error) => console.error(error));

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
              label="なんのポスター？"
              id="poster"
              placeholder="例）サイクリングキャンペーンのポスター"
              onChange={handleDesignChange}
            />
          </div>
          <div>
            <InputText
              label="被写体は？"
              id="subject"
              placeholder="例）bicycle, young boy"
              onChange={handleSubjectChange}
            />
          </div>
          <div>
            <InputGraphCheckboxChips
              label="言語イメージスケールより感性ワードを選択"
              onChange={handleConceptChange}
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

      {/* ポジショニングマップ */}
      <MapDesign data={generatedDesigns} />
    </div>
  );
}
