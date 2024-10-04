const InputPassword = ({htmlFor, text, id, showPassword, handleShowPassword}) => {
    return (
        <>
            <label htmlFor={htmlFor}>{text}</label>
            <div className='relative flex items-center'>
                <input id={id} type={showPassword ? 'text' : 'password'} className='flex ps-3 pe-10 mt-2.5 w-full outline-blue-500 rounded-lg border border-solid bg-[#EFEFF0] border-zinc-500 border-opacity-10 min-h-[38px]' />
                <div
                    onClick={handleShowPassword}
                    className='absolute flex justify-center items-center right-[5px] min-h-[35px] top-3 w-[40px] cursor-pointer'>
                    <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.8042 0.458252C6.72615 0.458252 3.06215 3.55125 0.951152 6.94125C0.855152 7.10025 0.806152 7.27925 0.806152 7.45825C0.806152 7.63725 0.854152 7.81625 0.950152 7.97525C3.06215 11.3653 6.72615 14.4583 10.8042 14.4583C14.9472 14.4583 18.6002 11.3683 20.6682 7.96525C20.7602 7.80925 20.8062 7.63325 20.8062 7.45825C20.8062 7.28325 20.7602 7.10725 20.6682 6.95125C18.6002 3.54825 14.9472 0.458252 10.8042 0.458252ZM19.2172 7.45825C17.3802 10.3363 14.3202 12.9583 10.8042 12.9583C7.33915 12.9583 4.27215 10.3263 2.40015 7.45825C4.27115 4.59025 7.33915 1.95825 10.8042 1.95825C14.3222 1.95825 17.3832 4.58225 19.2172 7.45825ZM10.8062 3.45825C13.0142 3.45825 14.8062 5.25025 14.8062 7.45825C14.8062 9.66625 13.0142 11.4583 10.8062 11.4583C8.59815 11.4583 6.80615 9.66625 6.80615 7.45825C6.80615 5.25025 8.59815 3.45825 10.8062 3.45825ZM10.8062 4.95825C9.42615 4.95825 8.30615 6.07825 8.30615 7.45825C8.30615 8.83825 9.42615 9.95825 10.8062 9.95825C12.1862 9.95825 13.3062 8.83825 13.3062 7.45825C13.3062 6.07825 12.1862 4.95825 10.8062 4.95825Z" fill="#999999" />
                    </svg>
                </div>
            </div>
        </>
    )
}
export default InputPassword