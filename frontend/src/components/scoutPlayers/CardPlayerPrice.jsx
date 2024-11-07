import CirclePurpleIcon from "../../assets/icons/CirclePurpleIcon"

const CardPlayerPrice = () => {
    return (
        <div className="flex justify-between items-center py-2 px-4 shadow-soft rounded-lg mb-2">
            <div className="flex items-center gap-3">
                <CirclePurpleIcon />
                <div>
                    <p className="text-black font-medium">MESSI <span className="text-tertiary">/ USDT</span></p>
                    <p className="text-regular text-tertiary">Vol. 27,59M</p>
                </div>
            </div>
            <div>
                <p className="font-medium">0,02357</p>
                <p className="text-purple text-regular">-0.44%</p>
            </div>
        </div>
    )
}
export default CardPlayerPrice