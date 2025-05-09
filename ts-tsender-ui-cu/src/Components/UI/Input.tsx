import { ChangeEvent } from "react";

interface InputProps {
  lable: string;
  value: string;
  type?: string;
  large?: boolean;
  placeHolder: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const Input = ({
  lable,
  value,
  type,
  large,
  placeHolder,
  onChange,
}: InputProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-zinc-600 font-medium text-sm">{lable}</label>
      {!large ? (
        <input
          type={type}
          placeholder={placeHolder}
          value={value}
          onChange={onChange}

          className="bg-white py-2 px-3 border border-zinc-300 placeholder:text-zinc-500 text-zinc-900 shadow-xs rounded-lg focus:ring-[4px] focus:ring-zinc-400/15 focus:outline-none"
          
        />
      ) : (
        <textarea
          className="bg-white py-2 px-3 border border-zinc-300 placeholder:text-zinc-500 text-zinc-900 shadow-xs rounded-lg focus:ring-[4px] focus:ring-zinc-400/15 focus:outline-none h-24 align-text-top"
          placeholder={placeHolder}
          value={value}
          onChange={onChange}
          
        ></textarea>
      )}
    </div>
  );
};
export default Input;
