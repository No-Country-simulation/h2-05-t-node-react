import { useState } from "react"

const MarketOrdersHoldings = () => {
    const [isActive, setIsActive] = useState('orders')

    return (
        <>
            <nav className='flex h-[53px] shadow-md mt-10'>
                <div
                    onClick={() => setIsActive('orders')}
                    className={`w-[50%] flex justify-center items-center font-medium text-tertiary cursor-pointer border-b-[3.5px] ${isActive == 'orders' ? 'border-b-tertiary' : 'border-b-transparent'}`}>
                    Ordenes abiertas (0)
                </div>
                <div
                    onClick={() => setIsActive('holdings')}
                    className={`w-[50%] flex justify-center items-center font-medium text-tertiary cursor-pointer border-b-[3.5px] ${isActive == 'holdings' ? 'border-b-tertiary' : 'border-b-transparent'}`}>
                    Tenencias
                </div>
            </nav>

            <div className="w-full min-h-[300px] flex items-center justify-center text-tertiary">
                {
                    isActive == 'orders'
                        ?
                        <p>No hay órdenes</p>
                        :
                        <p>No hay tenencias</p>
                }
            </div>
        </>
    )
}
export default MarketOrdersHoldings