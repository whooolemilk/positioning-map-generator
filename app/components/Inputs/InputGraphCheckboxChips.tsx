"use client";

import { InputChip } from "@/app/components/Inputs";
import Image from "next/image";
import Graph from "@/app/assets/images/graph.png";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ConceptType, conceptTranslation } from "../Maps/Map";

type InputGraphCheckboxChipsProps = {
  label: string;
  updateConceptPrompt: Dispatch<SetStateAction<string>>;
};

export const InputGraphCheckboxChips = ({
  label,
  updateConceptPrompt,
}: InputGraphCheckboxChipsProps) => {
  const [checkedValues, setCheckedValues] = useState<ConceptType[]>([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCheckedValues([...checkedValues, e.target.value as ConceptType]);
    } else {
      setCheckedValues(
        checkedValues.filter((value) => value !== e.target.value)
      );
    }
  };

  useEffect(() => {
    const conceptPrompt = checkedValues
      .map((value) => `<${conceptTranslation[value]}>`)
      .join("");
    updateConceptPrompt(conceptPrompt);
  }, [checkedValues]);

  return (
    <>
      <p className="block text-sm font-medium">{label}</p>
      <div className="absolute w-full">
        <div className="text-center mt-[70px]">
          <InputChip id="romantic" onChange={onChange} />
        </div>
        <div className="flex mt-2">
          <div className="ml-[140px]">
            <InputChip id="pretty" onChange={onChange} />
          </div>
          <div className="ml-[300px]">
            <InputChip id="clear" onChange={onChange} />
          </div>
        </div>
        <div className="flex mt-5">
          <div className="ml-[90px]">
            <InputChip id="casual" onChange={onChange} />
          </div>
          <div className="ml-[20px]">
            <InputChip id="natural" onChange={onChange} />
          </div>
        </div>
        <div className="flex mt-5">
          <div className="ml-[330px]">
            <InputChip id="elegant" onChange={onChange} />
          </div>
          <div className="ml-[90px]">
            <InputChip id="cool" onChange={onChange} />
          </div>
        </div>
        <div className="flex mt-5">
          <div className="ml-[90px]">
            <InputChip id="dynamic" onChange={onChange} />
          </div>
          <div className="ml-[20px]">
            <InputChip id="gorgeous" onChange={onChange} />
          </div>
          <div className="ml-[120px]">
            <InputChip id="sic" onChange={onChange} />
          </div>
        </div>
        <div className="flex mt-5">
          <div className="ml-[120px]">
            <InputChip id="wild" onChange={onChange} />
          </div>
          <div className="ml-[20px]">
            <InputChip id="classic" onChange={onChange} />
          </div>
          <div className="ml-[90px]">
            <InputChip id="dandy" onChange={onChange} />
          </div>
          <div className="ml-[20px]">
            <InputChip id="modern" onChange={onChange} />
          </div>
        </div>
        <div className="mt-5 ml-[400px]">
          <InputChip id="formal" onChange={onChange} />
        </div>
      </div>
      <Image src={Graph} alt="" />
    </>
  );
};
