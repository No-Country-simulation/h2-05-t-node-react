const WelcomeMessage = ({ title, message }) => {
    return (
        <section className='mt-10 w-[80%] mx-auto'>
            <h1 className="text-2xl font-semibold text-blue-500">{title}</h1>
            <p className="mt-1 text-sm">{message}</p>
        </section>
    )
}
export default WelcomeMessage