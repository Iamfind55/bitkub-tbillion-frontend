import { useMemo, useState } from 'react';

const MenuSwitch = ({ value, onchange, title, name }: { value: boolean | false, onchange: (status: boolean) => void, title?: string | 'title', name?: string | 'name' }) => {
    const [isChecked, setIsChecked] = useState(value);
    useMemo(() => {
        setIsChecked(value);
    }, [value])
    const handleToggle = () => {
        setIsChecked(!isChecked);
        onchange(!isChecked);
    }
    const idswitch = 'swicth' + Math.random();
    return (
        <div className="flex items-center">
            <input
                type="checkbox"
                id={idswitch}
                name={name}
                className="hidden"
                checked={isChecked}
                onChange={handleToggle}
            />
            <label htmlFor={idswitch} className="cursor-pointer">
                <div className="bg-gray-300 w-10 h-6 rounded-full p-1">
                    <div
                        className={`w-4 h-4 rounded-full transition-transform transform ${isChecked ? 'translate-x-full bg-success' : 'translate-x-0 bg-danger'
                            }`}
                    ></div>
                </div>
            </label>
            <span className="text-gray-700 font-medium ml-2">{title}</span>
        </div>
    );
};

export default MenuSwitch;