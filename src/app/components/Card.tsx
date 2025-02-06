import Image from 'next/image';
import { AddButton, CancelButton } from './Buttons';

export const Card = ({
    id,
    isOpen,
    labelText,
    submittedIncome,
    addText,
    value,
    onChange,
    onClick,
    src,
    setOpenCards,
    submittedBalance
}: {
    id: string;
    isOpen: boolean;
    labelText: string;
    addText: string;
    value: number | null;
    submittedBalance?: number | null;
    submittedIncome?: number | null;
    src: any
    setOpenCards: React.Dispatch<React.SetStateAction<{[key: string]: boolean;}>>
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
    const toggleOpen = () => {
        setOpenCards((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <div className='flex flex-col items-center bg-white rounded-md gap-4 border-solid shadow py-8 px-12'>
            <Image src={src} alt="Icon" width={25} height={25} />
            {!isOpen ? (
                <>
                    <div className="flex gap-1">
                        <span className='whitespace-nowrap'>{labelText}</span>
                        <span className='whitespace-nowrap'>$ {submittedBalance ? submittedBalance : submittedIncome}</span>
                    </div>
                    <AddButton
                        label="add"
                        onClick={toggleOpen}
                        type="button"
                        styleType="secondary"
                    >
                    </AddButton>
                </>
            ) : (
                <>
                    <p>{addText}</p>
                    <div className="flex flex-row justify-center items-center gap-2">
                        <p>$:</p>
                        <input
                            value={value ?? ""}
                            onChange={onChange}
                            className="w-16 h-8 border border-gray-600 hover:border-black"
                            type="number"
                        />
                        <div className='flex flex-col gap-1'>
                            <AddButton
                                label="add"
                                onClick={onClick}
                                type="submit"
                                styleType="secondary"
                            >
                            </AddButton>
                            <CancelButton
                                label="cancel"
                                onClick={toggleOpen}
                                type="button"
                                styleType="secondary"
                            >
                            </CancelButton>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}






