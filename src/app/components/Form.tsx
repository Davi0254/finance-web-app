import { AddButton, CancelButton } from "./Buttons";

export const Form = ({
    isFormOpen,
    onSubmit,
    toggleFormOpen,
    children
}: {
    isFormOpen: boolean
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    toggleFormOpen: () => void;
    children: React.ReactNode;
}) => {
    return isFormOpen ? (
        <form
            onSubmit={onSubmit}
            className="flex flex-col flex-wrap items-center justify-center mb-10 gap-4">
            <div className="grid grid-cols-1 items-center">
                <div className="flex flex-col text-sm items-center gap-1.5">
                    {children}
                </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
                <AddButton
                    label="add"
                    type="submit"
                    styleType="primary"
                >
                </AddButton>
                <CancelButton
                    label="cancel"
                    onClick={toggleFormOpen}
                    type="button"
                    styleType="primary"
                >
                </CancelButton>
            </div>
        </form>
    ) : (
        <div className="flex justify-center mb-14">
            <AddButton
                label="add"
                onClick={toggleFormOpen}
                type="button"
                styleType="primary"
            >
            </AddButton>
        </div>
    )
}


