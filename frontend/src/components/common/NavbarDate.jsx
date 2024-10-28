import { getDateList } from "../../utils/getDateList";

const NavbarDate = ({ date, setDate }) => {
    const dateList = getDateList(date);

    const handleSelectDate = (index) => {
        const formattedDate = new Date(date)
        formattedDate.setDate(formattedDate.getDate() + (index - 1))

        const yyyyMMdd = formattedDate.toISOString().split('T')[0]
        console.log(yyyyMMdd)
        setDate(yyyyMMdd)
    }

    return (
        <div className='mt-3 shadow-md'>
            <nav className='flex h-[53px] w-[90%] mx-auto'>
                {dateList.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => handleSelectDate(index)}
                        className={`w-[33%] capitalize flex justify-center items-center font-medium text-tertiary cursor-pointer border-b-[3px] ${1 === index ? 'text-blue border-b-blue' : 'border-b-transparent'}`}
                    >
                        {Object.values(item)[0]}
                    </div>
                ))}
            </nav>
        </div>
    )
}

export default NavbarDate;
