import LogoGoogle from '../../assets/img/logo-google.png'

const GoogleButton = ({ title }) => {
    return (
        <section className='mt-[50px]'>
            <div className="flex mt-5 justify-center text-sm">
                <div className="h-[0.5px] absolute bg-black w-[90%]"></div>
                <p className="relative my-auto bg-white bottom-3 mx-auto px-3">{title}</p>
            </div>

            <button className="flex gap-9 px-2 py-1 mt-4 w-[80%] rounded-3xl bg-[#EFEFF0] max-w-[315px] shadow-[0px_0px_4px_rgba(0,0,0,0.25)] mx-auto">
                <img loading="lazy" src={LogoGoogle} className="object-contain shrink-0 rounded-none aspect-square w-[37px]" alt="Logo Google" />
                <span className="my-auto">
                    Continuar con Google
                </span>
            </button>
        </section>
    )
}
export default GoogleButton