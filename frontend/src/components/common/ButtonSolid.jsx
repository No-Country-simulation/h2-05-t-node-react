const ButtonSolid = ({ children, className, onClick }) => {
    return (
        <button onClick={onClick} className={`flex items-center justify-center px-4 h-[35px] font-medium text-sm text-center text-white bg-[#8E2BFF] rounded-lg ${className}`}>
            {children}
        </button>
    )
}
export default ButtonSolid