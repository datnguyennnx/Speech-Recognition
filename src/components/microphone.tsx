export interface GetMicrophoneInputProps {
	microphone: MediaStream | undefined
	onClick: () => void
}

export const GetMicrophoneInput = ({
	microphone,
	onClick,
}: GetMicrophoneInputProps) => {
	const buttonStyle= "px-2 py-1 w-auto border-2 rounded-md cursor-pointer font-medium text-xl text-white hover:bg-gray-800 focus:outline-none focus:ring"

	return (
        <button onClick={onClick} className={buttonStyle}>
            {microphone ? 'Stop' : 'Record'}
        </button>
	)
}