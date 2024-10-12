import React, { useState, useEffect } from 'react';
import line1 from '../../assets/img/line-1.svg';
import group954 from '../../assets/img/group-954.png';
import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';


const Header = () => {
 //Configurar Calendar en español
    addLocale('es', {
        firstDayOfWeek: 1,
        showMonthAfterYear: true,
        dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
        dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
        dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
        monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
        monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
        today: 'Hoy',
        clear: 'Limpiar'
    });

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  }, []);

  // Función para cambiar el estado y mostrar/ocultar el calendario
  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  // Genera las fechas necesarias (un día antes, hoy y un día después)
  const generateDates = (baseDate, offset) => {
    const newDate = new Date(baseDate);
    newDate.setDate(newDate.getDate() + offset);
    return newDate;
  };

  // Maneja la selección de una fecha
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setShowCalendar(false); // Cierra el calendario después de seleccionar la fecha
  };

  // Array de fechas: día anterior, hoy (actualmente seleccionado), día siguiente
  const daysArray = [
    generateDates(selectedDate, -1), // Día anterior
    selectedDate,                     // Hoy (actualmente seleccionado)
    generateDates(selectedDate, 1)    // Día siguiente
  ];

  // Formatea la fecha en día y mes
  const getFormattedDate = (date) => {
    const options = { day: 'numeric', month: 'short' };
    return date.toLocaleDateString('es-ES', options);
  };

  return (
    <header className="fixed w-full h-auto top-0 left-0 bg-transparent z-50">
      <div className="relative w-full bg-white shadow-[0px_0px_10.2px_#00000033] h-[147px]">
        {/* Título "Partidos" */}
        <div className="absolute top-[60px] left-[50%] translate-x-[-50%] font-semibold text-[#317EF4] text-[22px]">
          Partidos
        </div>

        {/* Icono para mostrar el calendario */}
        <img
          className="absolute w-[18px] h-5 top-[63px] right-[20px] cursor-pointer"
          alt="Group"
          src={group954}
          onClick={toggleCalendar} // Manejador del evento de clic
        />

        {/* Contenedor de las tres fechas */}
        <div className="absolute w-full h-[52px] top-[95px] left-0 flex items-center justify-center">
          <div className="flex justify-center items-center space-x-8">
            {daysArray.map((date, index) => (
              <div
                key={index}
                id={date.toDateString() === selectedDate.toDateString() ? 'today-element' : ''}
                className={`relative font-normal text-base cursor-pointer w-[100px] text-center ${
                  selectedDate?.toDateString() === date.toDateString() ? 'text-[#317EF4]' : 'text-[#616161]'
                }`}
                onClick={() => handleDateSelect(date)}
              >
                {index === 1 ? (
                  // Mostrar "Hoy" solo cuando `selectedDate` es igual a `currentDate`
                  selectedDate.toDateString() === currentDate.toDateString() ? 'Hoy' : getFormattedDate(selectedDate)
                ) : (
                  getFormattedDate(date)
                )}
                {selectedDate?.toDateString() === date.toDateString() && (
                  <img className="absolute w-full h-px top-[30px] left-0" alt="Line" src={line1} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Renderiza el calendario cuando `showCalendar` sea verdadero */}
      {showCalendar && (
        <div className="absolute top-[150px] left-0 w-full bg-white shadow-md p-4 rounded-md z-50">
          <Calendar 
            inline 
            value={selectedDate} 
            onChange={(e) => handleDateSelect(e.value)} // Actualiza la fecha seleccionada al cambiar en el calendario
            locale="es"
       
            
          />
        </div>
      )}
    </header>
  );
};

export default Header;
