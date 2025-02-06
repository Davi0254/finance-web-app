export const InputField = ({ id, value, onChange, type }: {
    type: any,
    id: string,
    value: any,
    onChange: React.ChangeEventHandler<HTMLInputElement> | undefined
}) => {
    return (
        <>
            <div className="flex flex-col gap-0 text-sm">
                <label htmlFor={id}>{id}</label>
                <input
                    className="border py-1 bg-white bg-opacity-60 rounded border-gray-600 w-44 hover:border-gray-900"
                    type={type}
                    id={id}
                    value={value ?? undefined}
                    onChange={onChange}
                />
            </div>
        </>
    )
}

export const SelectField = ({ id, onChange, value, options }: {
    id: string,
    onChange: React.ChangeEventHandler<HTMLSelectElement> | undefined,
    options: string[];
    value: any;
}) => {
    return (
        <>
            <div className="flex flex-col gap-0 text-sm">
                <label htmlFor={id}>{id}</label>

                <select
                    value={value}
                    onChange={onChange}
                    name={id}
                    id={id}
                    className="border py-1 bg-white bg-opacity-60 rounded border-gray-600 w-44 hover:border-gray-900">
                    <option value="">Select a category</option>
                    {options.map((optionValue) => (
                        <option key={optionValue} value={optionValue}>
                            {optionValue}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )
}


