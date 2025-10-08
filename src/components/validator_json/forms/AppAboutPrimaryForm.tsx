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

const AppAboutPrimaryForm = ({ RowComponent }: Props) => {
    return (
        <div className="space-y-[12px]">
            <RowComponent label="image1" name="image1" />
            <RowComponent label="pIntro" name="pIntro" as="textarea" />
            <RowComponent label="uiTitle" name="uiTitle" />
            <RowComponent label="pUI" name="pUI" as="textarea" />
            <RowComponent label="image2" name="image2" />
            <RowComponent label="pHome" name="pHome" as="textarea" />
            <RowComponent label="gamesTitle" name="gamesTitle" />
            <RowComponent label="pGames" name="pGames" as="textarea" />
        </div>
    );
}

export default AppAboutPrimaryForm;
