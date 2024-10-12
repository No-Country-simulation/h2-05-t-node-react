import union from '../../assets/img/union.svg';

const Search = () => {
  return (
    <div className="flex justify-center mt-4"> 
      <div className="flex w-[351px] items-center gap-[17px] relative">
        <div className="relative w-[353px] h-[38px] mr-[-2.00px]">
          <div className="relative w-[351px] h-[38px] bg-[#efeff0] rounded-[9px] border border-solid border-[#7676801f]">
            <div className="absolute w-[140px] top-[7px] left-[61px] [font-family:'Poppins-Regular',Helvetica] font-normal text-[#b0b0b0] text-sm tracking-[0] leading-[normal]">
              Busca un jugador
            </div>
            <div className="absolute w-[25px] h-[22px] top-[7px] left-[17px] overflow-hidden">
              <img className="absolute w-[23px] h-[23px] top-0 left-0" alt="Union" src={union} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
