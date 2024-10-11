// Header.js
import React, { useState, useEffect, useRef } from 'react';
import line1 from '../../assets/img/line-1.svg';
import group954 from '../../assets/img/group-954.png';
import { Calendar } from 'primereact/calendar';

const Header = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false); // Estado para mostrar el calendario
  const scrollRef = useRef(null);

  useEffect(() => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  }, []);

  // Función para cambiar el estado y mostrar/ocultar el calendario
  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
    console.log("Click");
  };

  // Genera las fechas necesarias para mostrar
  const generateDates = (baseDate, offset) => {
    const newDate = new Date(baseDate);
    newDate.setDate(newDate.getDate() + offset);
    return newDate;
  };

  const totalDays = 30; // Cambiar este número para ajustar cuántas fechas mostrar en total
  const daysArray = Array.from(
    { length: totalDays * 2 + 1 },
    (_, i) => generateDates(currentDate, i - totalDays)
  );

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const getFormattedDate = (date) => {
    const options = { day: 'numeric', month: 'short' };
    return date.toLocaleDateString('es-ES', options);
  };

  const scrollToCenter = () => {
    const todayElement = document.getElementById('today-element');
    if (todayElement && scrollRef.current) {
      const scrollOffset =
        todayElement.offsetLeft - scrollRef.current.clientWidth / 2 + todayElement.clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollOffset, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToCenter(); // Centrar hoy cuando se monta el componente
  }, [scrollRef]);

  return (
    <header className="fixed w-full h-[147px] top-0 left-0 bg-transparent">
      <div className="relative w-full h-[147px] bg-white shadow-[0px_0px_10.2px_#00000033]">
        {/* Título "Partidos" */}
        <div className="absolute top-[60px] left-[50%] translate-x-[-50%] font-semibold text-[#317EF4] text-[22px]">
          Partidos
        </div>

        {/* Imagen Icono */}
        <img
          className="absolute w-[18px] h-5 top-[63px] right-[20px] cursor-pointer"
          alt="Group"
          src={group954}
          onClick={toggleCalendar} // Manejador del evento de clic
        />

        {/* Contenedor de scroll horizontal */}
        <div className="absolute w-full h-[52px] top-[95px] left-0 flex items-center justify-center overflow-hidden">
          <div
            ref={scrollRef}
            className="w-[80%] mx-auto overflow-x-auto overflow-y-hidden"
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            {/* Contenedor de fechas */}
            <div className="flex items-center justify-center space-x-8">
              {daysArray.map((date, index) => (
                <div
                  key={index}
                  id={date.toDateString() === currentDate.toDateString() ? 'today-element' : ''}
                  className={`relative font-normal text-base cursor-pointer w-[100px] text-center ${
                    selectedDate?.toDateString() === date.toDateString() ? 'text-[#317EF4]' : 'text-[#616161]'
                  }`}
                  onClick={() => handleDateClick(date)}
                >
                  {date.toDateString() === currentDate.toDateString() ? (
                    <>
                      Hoy
                      {selectedDate?.toDateString() === currentDate.toDateString() && (
                        <img className="absolute w-full h-px top-[30px] left-0" alt="Line" src={line1} />
                      )}
                    </>
                  ) : (
                    getFormattedDate(date)
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Renderiza el calendario cuando `showCalendar` sea verdadero */}
      <div>
        {showCalendar && (
          <div className="absolute top-[150px] left-[50%] transform -translate-x-1/2 bg-white shadow-md p-4 rounded-md z-50">
            <Calendar 
              inline 
              value={selectedDate} 
              onChange={(e) => setSelectedDate(e.value)} 
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
