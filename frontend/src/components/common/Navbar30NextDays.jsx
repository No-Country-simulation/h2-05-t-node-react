
const Navbar30NextDays = ({ dateList, selectedDate, setSelectedDate }) => {

    const handleSelectDate = (index) => {
        setSelectedDate(index);
    }

    return (
        <nav className="flex mt-2 gap-4 overflow-x-scroll scrollbar-hide">
            {dateList.map((item, index) => (
                <div
                    key={index}
                    onClick={() => handleSelectDate(index)}
                    className={`w-30 pb-2 px-4 capitalize font-medium cursor-pointer border-b-[3.5px] flex justify-center items-center whitespace-nowrap ${selectedDate === index ? 'text-white border-b-white' : 'text-gray-300 font-normal border-b-transparent'
                        }`}
                >
                    {item == dateList[1] ? 'Hoy' : item}
                </div>
            ))}
        </nav>
    );
};

export default Navbar30NextDays;
