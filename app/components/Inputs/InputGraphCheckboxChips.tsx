"use client";

import { InputChip } from "@/app/components/Inputs";
import Image from "next/image";
import Graph from "@/app/assets/images/graph.png";
import { useEffect, useState } from "react";
import { ConceptType } from "@/app/components/Maps";

type InputGraphCheckboxChipsProps = {
  label: string;
  onChange: (newConcept: string) => void;
};

export const InputGraphCheckboxChips = ({
  label,
  onChange,
}: InputGraphCheckboxChipsProps) => {
  const [checkedValues, setCheckedValues] = useState<ConceptType[]>([]);

  const handleConceptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCheckedValues([...checkedValues, e.target.value as ConceptType]);
    } else {
      setCheckedValues(
        checkedValues.filter((value) => value !== e.target.value)
      );
    }
  };

  useEffect(() => {
    const conceptPrompt = checkedValues.map((value) => value).join(", ");
    onChange(conceptPrompt);
  }, [checkedValues]);

  return (
    <>
      <p className="block text-sm font-medium">{label}</p>
      <div className="absolute w-full">
        <div className="text-center mt-[70px]">
          <InputChip id="romantic" onChange={handleConceptChange} />
        </div>
        <div className="flex mt-2">
          <div className="ml-[140px]">
            <InputChip id="pretty" onChange={handleConceptChange} />
          </div>
          <div className="ml-[300px]">
            <InputChip id="clear" onChange={handleConceptChange} />
          </div>
        </div>
        <div className="flex mt-5">
          <div className="ml-[90px]">
            <InputChip id="casual" onChange={handleConceptChange} />
          </div>
          <div className="ml-[20px]">
            <InputChip id="natural" onChange={handleConceptChange} />
          </div>
        </div>
        <div className="flex mt-5">
          <div className="ml-[330px]">
            <InputChip id="elegant" onChange={handleConceptChange} />
          </div>
          <div className="ml-[90px]">
            <InputChip id="cool" onChange={handleConceptChange} />
          </div>
        </div>
        <div className="flex mt-5">
          <div className="ml-[90px]">
            <InputChip id="dynamic" onChange={handleConceptChange} />
          </div>
          <div className="ml-[20px]">
            <InputChip id="gorgeous" onChange={handleConceptChange} />
          </div>
          <div className="ml-[120px]">
            <InputChip id="sic" onChange={handleConceptChange} />
          </div>
        </div>
        <div className="flex mt-5">
          <div className="ml-[120px]">
            <InputChip id="wild" onChange={handleConceptChange} />
          </div>
          <div className="ml-[20px]">
            <InputChip id="classic" onChange={handleConceptChange} />
          </div>
          <div className="ml-[90px]">
            <InputChip id="dandy" onChange={handleConceptChange} />
          </div>
          <div className="ml-[20px]">
            <InputChip id="modern" onChange={handleConceptChange} />
          </div>
        </div>
        <div className="mt-5 ml-[400px]">
          <InputChip id="formal" onChange={handleConceptChange} />
        </div>
      </div>
      <Image src={Graph} alt="" />
    </>
  );
};
