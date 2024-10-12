const Button = ({ children }) => {
    return (
        <button className='flex items-center justify-center px-4 h-[35px] font-medium text-sm text-center text-white bg-[#8E2BFF] rounded-lg'>
            {children}
        </button>
    )
}
export default Button