import EyeIcon from "../../assets/icons/EyeIcon"

const InputPassword = ({ name, value, handleChange, htmlFor, text, id, showPassword, handleShowPassword }) => {
    return (
        <>
            <label htmlFor={htmlFor}>{text}</label>
            <div className='relative flex items-center'>
                <input id={id} value={value} name={name} onChange={handleChange} type={showPassword ? 'text' : 'password'} className='flex ps-3 pe-10 mt-2.5 w-full outline-blue rounded-lg border border-solid bg-[#EFEFF0] border-zinc-500 border-opacity-10 min-h-[38px]' />
                <div
                    onClick={handleShowPassword}
                    className='absolute flex justify-center items-center right-[5px] min-h-[35px] top-3 w-[40px] cursor-pointer'>
                    <EyeIcon />
                </div>
            </div>
        </>
    )
}
export default InputPassword