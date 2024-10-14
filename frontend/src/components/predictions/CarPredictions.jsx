import image41 from "../../assets/img/image-41.png";
import image42 from "../../assets/img/image-42.png";
import image43 from "../../assets/img/image-43.png";
import vector from "../../assets/img/vector.svg";

const CarPredictions = () => {
  return (
    <div className="flex flex-col items-center mx-auto rounded-[9px] shadow-soft w-[351.5px] h-[123.82px]"> {/* Sombra en todos los lados */}
      
      {/* Liga española header */}
      <div className="relative w-full h-[31.65px]"> {/* Usar ancho completo */}
        <div className="h-8 rounded-t-[9px] border-b-[0.5px] border-gray-400 relative w-full bg-white">
          <img className="absolute w-[18px] h-[18px] top-[7px] left-[17px] object-contain" alt="Liga Española" src={image41} />
          <div className="absolute w-32 top-[7px] left-[43px] font-poppins text-gray-600 text-xs">
            Liga española
          </div>
        </div>
      </div>

      {/* Resultados */}
      <div className="relative w-full h-[67.52px]"> {/* Usar ancho completo */}
        <div className="h-[68px] relative w-full bg-white"> {/* Sin sombra aquí */}
          <div className="inline-flex flex-col items-start justify-center gap-[3px] absolute top-3 left-40">
            <div className="inline-flex items-center gap-[5px]">
              <img className="w-[18px] h-[18px] object-contain" alt="Image" src={image42} />
              <div className="w-[61.91px] text-gray-600 text-xs">
                Barcelona
              </div>
            </div>
            <div className="inline-flex items-center gap-1">
              <img className="w-[18px] h-[18px] object-contain" alt="Image" src={image43} />
              <div className="w-[61.91px] text-gray-600 text-xs">
                Osasuna
              </div>
            </div>
          </div>
          <div className="absolute top-[13px] left-[19px] text-gray-600 text-xs">
            Resultado final:
          </div>
          <div className="absolute top-[31px] left-[19px] text-gray-800 text-sm font-semibold">
            Barcelona
          </div>
          <div className="absolute w-[43px] h-[22px] top-6 left-[285px] text-[#8E2BFF] text-base font-medium text-center">
            13
          </div>
        </div>
      </div>

      {/* Pendiente */}
      <div className="relative w-full h-[31.65px]"> {/* Usar ancho completo */}
        <div className="h-8 rounded-b-[9px] border-t-[0.5px] border-gray-400 relative w-full bg-white">
          <div className="absolute w-[254px] top-[5px] left-[45px] font-poppins text-gray-600 text-xs">
            Pendiente
          </div>
          <img className="absolute w-[15px] h-[15px] top-[7px] left-5 object-contain" alt="Vector" src={vector} />
        </div>
      </div>
      
    </div>
  );
};

export default CarPredictions;
