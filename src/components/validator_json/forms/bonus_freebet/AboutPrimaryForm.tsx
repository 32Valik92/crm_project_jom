"use client";

import {useEffect, useRef} from "react";
import {useFieldArray,} from "react-hook-form";
import {IPropsAboutBlock} from "@/types";
import {AddToolbar} from "@/components/validator_json/about_custom_component/AddToolbar";
import {addByKind} from "@/components/validator_json/about_custom_component/addByKind";
import {BlockEditor} from "@/components/validator_json/about_custom_component/BlockEditor";

export default function BonusFreebetAboutPrimaryForm({
                                                       control,
                                                       registerAction,
                                                       setValue,
                                                     }: IPropsAboutBlock) {
  const basePath = "bonus/freebet";
  const blocksFA = useFieldArray({control, name: "blocks" as any});
  const didInit = useRef(false);

  useEffect(() => {
    if (didInit.current) return;
    if (blocksFA.fields.length === 0)
      blocksFA.append({kind: "title", h: 2, text: ""});
    didInit.current = true;

  }, []);

  return (
    <div className="space-y-5">
      <AddToolbar onAdd={(k) => addByKind(blocksFA.append, k)}/>

      {blocksFA.fields.map((f, idx) => (
        <BlockEditor
          key={f.id}
          control={control}
          registerAction={registerAction}
          setValue={setValue}
          idx={idx}
          onRemove={() => blocksFA.remove(idx)}
          basePath={basePath}
        />
      ))}

      <AddToolbar onAdd={(k) => addByKind(blocksFA.append, k)}/>
    </div>
  );
}
