const Input = ({ autoFocus, name, value, handleChange, handleValidation, htmlFor, text, id }) => {
    return (
        <>
            <label htmlFor={htmlFor}>{text}</label>
            <input autoFocus={autoFocus} id={id} onChange={handleChange} onBlur={handleValidation} name={name} value={value} type="text" className='flex px-3 mt-2.5 w-full outline-blue rounded-lg border border-solid bg-[#EFEFF0] border-zinc-500 border-opacity-10 min-h-[38px]' />
        </>
    )
}
export default Input