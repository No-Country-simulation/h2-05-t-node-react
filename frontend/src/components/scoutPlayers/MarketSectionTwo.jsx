import { useState } from "react"
import ArrowIcon from "../../assets/icons/ArrowIcon"
import ButtonSolid from "../common/ButtonSolid"

const MarketSectionTwo = ({ playerData, initialPrice, tableSectionTwo }) => {
    const [isOpen, setIsOpen] = useState(true)
    const [isOpenPriceMount, setIsOpenPriceMount] = useState(true)

    const toggleAccordion = () => {
        setIsOpen(!isOpen)
    }

    const toggleAccordionPriceMount = () => {
        setIsOpenPriceMount(!isOpenPriceMount)
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-AR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(price);
    }

    return (
        <section className="w-full mt-3">
            <div className="flex items-center">
                <button
                    onClick={toggleAccordion}
                    className="flex items-center gap-3 focus:outline-none "
                >
                    <h2 className="text-black text-title font-semibold uppercase">
                        {formatPrice(initialPrice)}
                    </h2>
                </button>
            </div>

            {isOpen && (
                <div className="flex justify-between">
                    <div className="w-[48%] pb-2 font-medium text-purple">
                        <span>-0.44%</span>

                        <table className="w-full mt-2">
                            <tbody>
                                {
                                    tableSectionTwo?.map(item => (
                                        <tr key={item.id}>
                                            <td className="text-left">67.378,00</td>
                                            <td className="text-secondary text-right">0,05810</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>

                    {/* COMPRA / VENTA */}
                    <div className="w-[48%]">
                        <div className="relative flex items-center justify-center shadow-soft rounded-xl mb-2">
                            <button
                                onClick={toggleAccordionPriceMount}
                                className="flex items-center focus:outline-none "
                            >
                            </button>
                        </div>

                        <div>
                            <p className="text-tertiary text-center py-3 bg-search rounded-xl mt-10">Total (USDT)</p>
                            <div className=" flex flex-col justify-center rounded-xl mb-2">
                                <div className="flex justify-between items-center">
                                    <p className="text-tertiary text-center">Disponible</p>
                                    <p className="text-black">0</p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-tertiary text-center">Comisión est.</p>
                                    <p className="text-black">USDT</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex justify-between">
                <div className="w-[48%] px-3 flex justify-between shadow-soft">
                    <p className="text-tertiary text-regular-14 font-semibold capitalize py-2">
                        0.01
                    </p>
                    <span className={`py-3 right-0 transition-transform duration-300 ${!isOpenPriceMount ? 'transform rotate-180' : ''}`}>
                        <ArrowIcon />
                    </span>
                </div>

                <ButtonSolid className='w-[48%] h-[38px] uppercase'>{`Vender
                    ${playerData?.name.trim().includes(' ')
                        ? playerData?.name.trim().split(' ').slice(-1)
                        : playerData?.name.trim()
                    }`}
                </ButtonSolid>
            </div>
        </section>
    )
}
export default MarketSectionTwo