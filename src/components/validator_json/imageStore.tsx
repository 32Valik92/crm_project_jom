"use client";
import React, {createContext, useContext, useRef} from "react";

export type ImageItem = { file: File; filename: string };
type ImageStore = {
    register: (filename: string, file: File) => void;
    all: () => Record<string, ImageItem>;
};

const Ctx = createContext<ImageStore | null>(null);

export const useImageStore = () => {
    const ctx = useContext(Ctx);
    if (!ctx) throw new Error("ImageStore not found");
    return ctx;
};

export const ImageStoreProvider: React.FC<React.PropsWithChildren> = ({children}) => {
    const bag = useRef<Record<string, ImageItem>>({});
    const store: ImageStore = {
        register: (filename, file) => { bag.current[filename] = {file, filename}; },
        all: () => bag.current,
    };
    return <Ctx.Provider value={store}>{children}</Ctx.Provider>;
};
