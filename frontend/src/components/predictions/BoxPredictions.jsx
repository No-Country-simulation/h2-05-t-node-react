const BoxPredictions = () => {
  return (
    <div className="flex justify-center">
      <div className="w-[352px] h-[31.65px] rounded-[9px] shadow-soft bg-white my-2"> {/* Margen arriba y abajo */}
        <div className="flex justify-between items-center h-full px-3"> {/* Padding lateral */}
          <div className="font-poppins font-normal text-[#8D8D8D] text-xs"> {/* Color de texto actualizado */}
            Predicción
          </div>
          <div className="font-poppins font-normal text-[#8D8D8D] text-xs"> {/* Color de texto actualizado */}
            Partido
          </div>
          <div className="font-poppins font-normal text-[#8D8D8D] text-xs"> {/* Color de texto actualizado */}
            Puntos
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxPredictions;
