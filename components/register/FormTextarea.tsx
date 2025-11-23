import { Label } from "@/components/ui/label";
import { LucideIcon } from "lucide-react";

interface FormTextareaProps {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  icon: LucideIcon;
  required?: boolean;
}

export const FormTextarea = ({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  icon: Icon,
  required = false,
}: FormTextareaProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-base font-semibold">
        {label} {required && "*"}
      </Label>
      <div className="relative">
        <Icon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full min-h-[120px] pl-10 pt-3 pb-3 pr-3 rounded-md border-2 border-input bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
          required={required}
        />
      </div>
    </div>
  );
};