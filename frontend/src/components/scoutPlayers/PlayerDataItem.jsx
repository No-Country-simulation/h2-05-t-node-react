const PlayerDataItem = ({ item }) => {
    const { imgCountry, iconData: IconComponent, titleData, textData } = item

    return (
        <div className="h-[54px] flex items-center border-t border-primary">
            {imgCountry ? (
                <div className="w-[50px] flex justify-center"><img src={imgCountry} alt="" /></div>
            ) : (
                IconComponent && <div className="w-[50px] flex justify-center"><IconComponent className="px-4" /></div>
            )}
            <div className="leading-none">
                <p className="mb-1 text-tertiary">{titleData}</p>
                <p>{textData}</p>
            </div>
        </div>
    )
}

export default PlayerDataItem;
