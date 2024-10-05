const LoadingScreen = () => {
    return (
        <main className='h-screen w-full flex flex-col bg-gradient-to-r from-[#317EF4] to-[#8E2BFF] justify-center items-center'>
            <h1 className="text-[44.5px] font-black text-white">WAKI</h1>
            <div className="w-[134px] h-[5px] absolute bottom-3 bg-white rounded-lg"></div>
        </main>
    )
}
export default LoadingScreen