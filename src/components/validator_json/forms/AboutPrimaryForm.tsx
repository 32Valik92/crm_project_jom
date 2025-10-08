"use client";

import { JSX } from "react";

type RowProps = {
    label: string;
    name: string;
    as?: "input" | "textarea";
};

type Props = {
    RowComponent: (p: RowProps) => JSX.Element;
};

const AboutPrimaryForm = ({ RowComponent }: Props) => {
    return (
        <div className="space-y-[12px]">
            {/* --- ГОЛОВНІ ПОЛЯ --- */}
            <RowComponent label="Заголовок" name="title" />
            <RowComponent label="Герой-картинка (path)" name="imageHero" />
            <RowComponent label="Інтро" name="intro" as="textarea" />

            <div className="grid gap-[12px] rounded-[4px] border p-[12px]">
                <span className="text-[14px] font-medium leading-[20px]">miniGame</span>

                {/* Поля вкладеного об'єкта miniGame */}
                <RowComponent label="miniGame.title" name="miniGame.title" />
                <RowComponent label="miniGame.text" name="miniGame.text" as="textarea" />
                <RowComponent label="miniGame.note" name="miniGame.note" as="textarea" />
            </div>
        </div>
    );
}

export default AboutPrimaryForm;
