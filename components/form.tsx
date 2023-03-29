import { ButtonHTMLAttributes, InputHTMLAttributes, ReactElement } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}
interface OptionProps extends React.OptionHTMLAttributes<HTMLOptionElement> {}
interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Input(props: InputProps & { label: string }) {
  return (
    <>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        type={props.type}
        id={props.name}
        name={props.name}
        placeholder={props.placeholder}
        className="py-1 px-2 mb-8 w-72 block border rounded-md border-stone-200 bg-white"
      />
    </>
  );
}

export function Button(props: ButtonProps) {
  return (
    <>
      <button
        type={props.type}
        value={props.value}
        className="py-1 px-4 border rounded-md border-stone-200 bg-white hover:bg-stone-100 active:bg-stone-200">
        {props.children}
      </button>
    </>
  );
}

export function Select(props: SelectProps & { label: string }) {
  return (
    <>
      <label htmlFor={props.name}>{props.label}</label>
      <select
        id={props.name}
        name={props.name}
        placeholder={props.placeholder}
        className="py-1 px-2 mb-8 w-72 block border rounded-md border-stone-200 bg-white"></select>
    </>
  );
}

export function Textarea(props: TextareaProps & { label: string }) {
  return (
    <>
      <label htmlFor={props.name}>{props.label}</label>
      <textarea
        id={props.name}
        name={props.name}
        placeholder={props.placeholder}
        className="py-1 px-2 mb-8 w-72 block border rounded-md border-stone-200 bg-white"
      />
    </>
  );
}
