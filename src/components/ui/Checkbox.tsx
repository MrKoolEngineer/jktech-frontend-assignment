'use client';

type CheckboxProps = {
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Checkbox = ({ label, checked, onChange }: CheckboxProps) => (
  <label className="inline-flex items-center space-x-2 text-sm">
    <input type="checkbox" checked={checked} onChange={onChange} />
    <span>{label}</span>
  </label>
);

export default Checkbox;
