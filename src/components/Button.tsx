import React, { FC } from 'react';
import styles from '../styles';

interface ButtonProps {
  buttonType: 'button' | 'submit' | 'reset';
  label: string;
  restStyles?: string; // optional property
}

const Button: FC<ButtonProps> = (props: ButtonProps) => {
  const { buttonType, label, restStyles } = props;

  return (
    <button type={buttonType} className={restStyles} title={label}>
      {label}
    </button>
  );
};

export default Button;
