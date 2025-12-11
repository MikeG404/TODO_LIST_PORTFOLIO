import { Check } from "lucide-react";

interface CheckboxProps {
    isCompleted: boolean;
    handleChangeCheckbox: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Checkbox({isCompleted, handleChangeCheckbox}: CheckboxProps) {

    return (
        <label className="flex items-center gap-3 cursor-pointer group">
            <input
            type="checkbox"
            className="peer sr-only"
            onChange={handleChangeCheckbox}
            checked={isCompleted}
            />
            <div
                className={`w-6 h-6 border-2 rounded-md flex items-center justify-center transition-all duration-200 ${
                isCompleted
                    ? 'bg-orange-600 border-orange-600'
                    : 'bg-white border-gray-300 group-hover:border-orange-400'
                }`}
            >
                <Check 
                size={16} 
                className={`text-white transition-transform duration-200 ${
                    isCompleted ? 'scale-100' : 'scale-0'
                }`} 
                />
            </div>
        </label>  
    )
}