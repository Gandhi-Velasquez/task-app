type CustomButtonProps = {
  title: string;
  icon?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  size?: 'small' | 'normal' | 'large' | 'xl';
  disabled?: boolean;
  type?: 'warning' | 'default' | 'notification';
  loading?: boolean;
}

type DialogProps = {
  title: string;
  subheader: string;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
  loading?: boolean;
}

type FormData = {
  title: string;
  type: string;
}

export type {
  CustomButtonProps,
  DialogProps,
  FormData,
}
