const Input = ({ htmlFor, text, id }) => {
    return (
        <>
            <label htmlFor={htmlFor}>{text}</label>
            <input id={id} type="text" className='flex px-3 mt-2.5 w-full outline-blue-500 rounded-lg border border-solid bg-[#EFEFF0] border-zinc-500 border-opacity-10 min-h-[38px]' />
        </>
    )
}
export default Input