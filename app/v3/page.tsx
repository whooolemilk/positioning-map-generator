"use client";

import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import { InputGraphCheckboxChips, InputSelect } from "@/app/components/Inputs";
import { InputText } from "@/app/components/Inputs/InputText";
import { DesignDataType, MapDesign } from "@/app/components/Maps";
import { DeeplLanguages } from "deepl";
import { Translator } from "@/app/libs/Translation";
import { ImageGenerateParams } from "openai/resources";
import { generatedConceptType } from "@/app/api/concept/route";

type dalle3Style = "vivid" | "natural";
export default function Version3() {
  const dalle3Style = ["vivid", "natural"];
  const [design, setDesign] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [concept, setConcept] = useState<string>("");
  const [style, setStyle] = useState<dalle3Style>("vivid");
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

  const handleStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // console.log("style:", e.target.value);
    setStyle(e.target.value as dalle3Style);
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
      style: style,
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
        subject: subject ? subject : null,
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
            const generatedDesign = {
              // ...concepts[index],
              concept: concepts[index].concept,
              description: [concepts[index].description],
              catchphrase: [concepts[index].catchphrase],
              visual: [concepts[index].visual],
              images: urls,
            };

            const existedDesign = savedDesigns.find(
              (design) => design.concept === concepts[index].concept
            );

            if (existedDesign) {
              savedDesigns
                .find((design) => design.concept === generatedDesign.concept)
                ?.catchphrase.push(generatedDesign.catchphrase[0]);

              savedDesigns
                .find((design) => design.concept === generatedDesign.concept)
                ?.description.push(generatedDesign.description[0]);

              savedDesigns
                .find((design) => design.concept === generatedDesign.concept)
                ?.visual.push(generatedDesign.visual[0]);

              savedDesigns
                .find((design) => design.concept === generatedDesign.concept)
                ?.images.push(generatedDesign.images[0]);
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

  useEffect(() => {
    // localStorageからgeneratedIdeasをget
    const savedDesignsJson = localStorage.getItem("generatedDesigns");
    let savedDesigns: DesignDataType[] = savedDesignsJson
      ? JSON.parse(savedDesignsJson)
      : [];

    // generatedDesignsにset
    setGeneratedDesigns(savedDesigns);
  }, []);

  const handleDeleteLocalStorage = () => {
    localStorage.removeItem("generatedDesigns");
    setGeneratedDesigns([]);
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
              label="被写体は？（任意）"
              id="subject"
              placeholder="例）bicycle, young boy"
              onChange={handleSubjectChange}
            />
          </div>
          <InputSelect
            label="生成する画像のスタイル"
            id="style"
            values={dalle3Style}
            placeholder="選択してください"
            onChange={handleStyleChange}
          />
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

      <div>
        <button
          type="button"
          className="my-4 inline-flex justify-center w-full  border-2 border-red-600 rounded-full bg-white py-3 font-semibold text-red-600 shadow-sm hover:bg-red-100"
          onClick={handleDeleteLocalStorage}
        >
          生成データ削除
        </button>
      </div>
    </div>
  );
}
