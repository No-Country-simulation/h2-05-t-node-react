const ButtonSolid = ({ children, className, onClick, disabled }) => {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`flex items-center justify-center px-4 h-[35px] font-medium text-sm text-center text-white bg-[#8E2BFF] rounded-lg ${disabled ? 'opacity-50' : ''} ${className}`}>
            {children}
        </button>
    )
}
export default ButtonSolid