interface IconProps {
  className: string;
}

export const CheckboxIcon = ({ className }: IconProps) => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M20 20H0V0H20V20ZM19.1667 0.833333H0.833333V19.1667H19.1667V0.833333ZM16.6667 6.19583L8.32917 15L4.16667 10.1117L4.80083 9.57167L8.36 13.7508L16.06 5.625L16.6667 6.19583Z'
        fill='#184E77'
      />
    </svg>
  );
};

export const UncheckedBoxIcon = ({ className }: IconProps) => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect x='0.5' y='0.5' width='19' height='19' stroke='#184E77' />
    </svg>
  );
};
