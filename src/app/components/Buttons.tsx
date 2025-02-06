export const AddButton = ({
    label,
    onClick,
    type,
    styleType = "primary"
}: {
    label: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    type: "button" | "submit";
    styleType?: "primary" | "secondary";
}) => {
    const baseStyles = `shadow text-white font-bold`;
    const styleVariants = {
        primary: "rounded w-20 text-white font-bold py-2",
        secondary: "w-16 rounded-sm h-8"
    };
    return (
        <button
            className={`${baseStyles} ${styleVariants[styleType]} add-button`}
            onClick={onClick}
            type={type}
        >
            {label}
        </button>
    )
}

export const CancelButton = ({
    label,
    onClick,
    type,
    styleType = "primary"
}: {
    label: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    type: "button" | "submit";
    styleType?: "primary" | "secondary";
}) => {
    const baseStyles = `shadow text-white font-bold`;
    const styleVariants = {
        primary: "rounded w-20 text-white font-bold py-2",
        secondary: "w-16 rounded-sm h-8"
    };
    return (
        <button
            className={`${baseStyles} ${styleVariants[styleType]} cancel-button`}
            onClick={onClick}
            type={type}
        >
            {label}
        </button>
    )
}

export const DeleteButton = ({ onClick }: {onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;}) => {
    return (
        <button
            onClick={onClick}
            className="bg-red-500 rounded-sm hover:bg-red-600 text-white font-bold h-7 w-14">
            delete
        </button>
    )
}




