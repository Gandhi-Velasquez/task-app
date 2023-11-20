type InputFieldProps = {
    label: string;
    type: string;
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

type RadioButtonGroupProps = {
    options: string[];
    selectedOption: string;
    onChange: (selectedOption: string) => void;
}

export type {
    InputFieldProps,
    RadioButtonGroupProps,
}