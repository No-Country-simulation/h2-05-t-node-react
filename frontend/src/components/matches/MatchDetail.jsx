import InProgressIcon from "../../assets/icons/InProgressIcon"
import BarcelonaImg from '../../assets/img/barcelona.png'
import RealMadridImg from '../../assets/img/realMadrid.png'

const MatchDetail = () => {
    return (
        <div className="p-[18px] bg-[#F3F4F5] ">

            <div className="flex items-center justify-around text-center">
                <div className="w-[83px]">
                    <div>
                        <img className="mx-auto w-[54px] h-[54px] object-contain" src={RealMadridImg} alt="" />
                        <p className="capitalize text-xs mt-[4px]">{`real madrid`}</p>
                    </div>
                    <div className="h-[27px] text-sm mt-3 shadow-soft-md border rounded-md bg-white flex items-center justify-center">
                        1.2
                    </div>
                </div>

                <div className="w-[83px]">
                    <div className="flex flex-col justify-center items-center">
                        <InProgressIcon />
                        <span className="text-xl font-bold mt-2">3 - 1</span>
                        <span className="uppercase text-xs">ft</span>
                    </div>
                    <div className="h-[27px] text-sm mt-3 shadow-soft-md border rounded-md bg-white flex items-center justify-center">
                        2.4
                    </div>
                </div>

                <div className="w-[83px]">
                    <div>
                        <img className="mx-auto w-[54px] h-[54px] object-contain" src={BarcelonaImg} alt="" />
                        <p className="capitalize text-xs mt-[2px]">{`barcelona`}</p>
                    </div>
                    <div className="h-[27px] text-sm mt-3 shadow-soft-md border rounded-md bg-white flex items-center justify-center">
                        1.2
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MatchDetail