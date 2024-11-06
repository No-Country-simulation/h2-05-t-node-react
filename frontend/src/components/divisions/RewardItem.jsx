const RewardItem = ({ imgRewardItem, children }) => {
    return (
        <div className="h-[80px]  flex items-center border-t-gray-400 border-t">
            <div className="w-[90%] mx-auto flex items-center justify-around gap-3">
                <img src={imgRewardItem} alt='Reward' />
                <p className="text-regular text-black">{children}</p>
            </div>
        </div>
    )
}
export default RewardItem