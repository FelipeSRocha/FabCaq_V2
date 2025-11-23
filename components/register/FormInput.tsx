import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LucideIcon } from "lucide-react";

interface FormInputProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: LucideIcon;
  required?: boolean;
  maxLength?: number;
  className?: string;
}

export const FormInput = ({
  id,
  name,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  icon: Icon,
  required = false,
  maxLength,
  className = "",
}: FormInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-base font-semibold">
        {label} {required && "*"}
      </Label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />}
        <Input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`pl-10 h-12 border-2 focus:border-primary ${className}`}
          required={required}
          maxLength={maxLength}
        />
      </div>
    </div>
  );
};