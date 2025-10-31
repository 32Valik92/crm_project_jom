import {Control, UseFormRegister, UseFormSetValue} from "react-hook-form";

export type IPropsAboutBlock = {
	page?: string;
	block?: string;
	control: Control;
	registerAction: UseFormRegister<any>;
	setValue: UseFormSetValue<any>;
};