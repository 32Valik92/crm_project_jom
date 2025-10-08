// components/validator_json/forms/bonus/BonusHeroForm.tsx
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

const BonusHeroForm = ({ RowComponent }: Props) => {
    return (
        <div className="space-y-[12px]">
            <RowComponent label="badge" name="badge" />
            <RowComponent label="title" name="title" />
            <RowComponent label="cta" name="cta" />
            <RowComponent label="description" name="description" as="textarea" />
        </div>
    );
};

export default BonusHeroForm;
