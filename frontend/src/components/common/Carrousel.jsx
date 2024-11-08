import { useRef } from "react";

const Carrousel = ({ imageOne, imageTwo, className }) => {
    const scrollContainerRef = useRef(null);

    const scrollToStart = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({
                left: 0,
                behavior: 'smooth',
            })
        }
    }

    const scrollToEnd = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({
                left: scrollContainerRef.current.scrollWidth,
                behavior: 'smooth',
            })
        }
    }

    return (
        <div className="w-full overflow-x-auto scrollbar-hide" ref={scrollContainerRef}>
            <div className="flex gap-4 w-max">
                <div
                    onClick={scrollToStart}
                    className={`${className} responsive-carrousel flex justify-center items-center relative bg-gradiente shadow-soft rounded-xl cursor-pointer`}
                >
                    <div
                        className="w-[100%] h-[100%] bg-transparent rounded-lg"
                        style={{
                            backgroundImage: `url(${imageOne})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    ></div>
                </div>

                <div
                    onClick={scrollToEnd}
                    className={`${className} responsive-carrousel flex justify-center items-center relative bg-gradiente shadow-soft rounded-xl cursor-pointer`}
                >
                    <div
                        className="w-[100%] h-[100%] bg-transparent rounded-lg"
                        style={{
                            backgroundImage: `url(${imageTwo})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    ></div>
                </div>
            </div>
        </div>
    )
}
export default Carrousel