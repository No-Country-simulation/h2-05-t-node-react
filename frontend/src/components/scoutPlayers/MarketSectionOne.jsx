import { useState } from "react"
import ArrowIcon from "../../assets/icons/ArrowIcon"
import ButtonSolid from "../common/ButtonSolid"
import ButtonOutline from "../common/ButtonOutline"
import ModalPlayerPrices from "./ModalPlayerPrices"

const MarketSectionOne = ({ playerData, tableSectionOne, initialPrice, setInitialPrice }) => {
    const [isOpenPriceMount, setIsOpenPriceMount] = useState(true)
    const [visible, setVisible] = useState(false)

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
                    onClick={() => setVisible(true)} // CLICK MODAL PRECIOS
                    className="flex items-center gap-3 focus:outline-none "
                >
                    <h2 className="text-black text-title font-semibold uppercase">
                        {playerData?.name.trim().includes(' ')
                            ? playerData?.name.trim().split(' ').slice(-1)
                            : playerData?.name.trim()
                        } / usdt
                    </h2>
                    <span className={`transition-transform duration-300`}>
                        <ArrowIcon />
                    </span>
                </button>
            </div>

            <div className="flex justify-between">
                <div className="w-[48%] pb-2 font-medium text-purple">
                    <span>-0.44%</span>

                    <table className="w-full mt-2">
                        <thead>
                            <tr>
                                <th className="text-left text-tertiary font-normal">
                                    <p>Precio</p>
                                    <p>(USDT)</p>
                                </th>
                                <th className="text-right text-tertiary font-normal">
                                    <p>Monto</p>
                                    <p className="uppercase overflow-hidden text-ellipsis whitespace-nowrap w-[80px] inline-block">
                                        (messi)
                                    </p>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                tableSectionOne?.map(item => (
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
                <div className="w-[48%] flex flex-col justify-end">
                    <div className="flex justify-between mb-2">
                        <ButtonSolid className='w-[79px]'>Compra</ButtonSolid>
                        <ButtonOutline className='w-[79px]'>Venta</ButtonOutline>
                    </div>

                    <div className="relative flex items-center justify-center shadow-soft rounded-xl mb-2">
                        <button className="flex items-center focus:outline-none">
                            <p className="text-black text-regular-14 font-semibold capitalize py-2">
                                limit
                            </p>
                            <span className={`absolute px-3 py-3 right-0 transition-transform duration-300 ${!isOpenPriceMount ? 'transform rotate-180' : ''}`}>
                                <ArrowIcon />
                            </span>
                        </button>
                    </div>

                    {isOpenPriceMount && (
                        <div>
                            <div className=" flex justify-between bg-search rounded-xl mb-2">
                                <button onClick={() => setInitialPrice(initialPrice - 1)} className="px-1 text-tertiary text-[30px]">-</button>
                                <div>
                                    <p className="text-tertiary text-center">Precio (USDT)</p>
                                    <p className="text-black text-center">{formatPrice(initialPrice)}</p>
                                </div>
                                <button onClick={() => setInitialPrice(initialPrice + 1)} className="px-1 text-tertiary text-[30px]">+</button>
                            </div>
                            <div className=" flex justify-between bg-search rounded-xl mb-2">
                                <button className="px-1 text-tertiary text-[30px]">-</button>
                                <p className="text-tertiary text-center mt-3">Monto (MESSI)</p>
                                <button className="px-1 text-tertiary text-[30px]">+</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <ModalPlayerPrices playerName={playerData?.name} visible={visible} setVisible={setVisible} />
        </section>
    )
}
export default MarketSectionOne