import React, { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';

const HorizontalDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const daysToShow = 30; // Número total de días a mostrar
  const today = dayjs(); // Fecha de hoy
  const scrollRef = useRef(null);

  // Generar un array con los días a mostrar
  const daysArray = Array.from({ length: daysToShow }, (_, i) =>
    dayjs().subtract(Math.floor(daysToShow / 2) - i, 'day')
  );

  // Centrar la fecha de hoy al cargar el componente
  useEffect(() => {
    const todayIndex = daysArray.findIndex((day) => day.isSame(today, 'day'));
    const scrollPosition = todayIndex * 80; // Ajustar para centrar
    scrollRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
  }, [daysArray, today]);

  return (
    <div className="w-full overflow-x-auto" ref={scrollRef}>
      <div className="flex space-x-4 p-4">
        {daysArray.map((day, index) => (
          <button
            key={index}
            className={`min-w-[70px] p-2 rounded-lg ${
              day.isSame(selectedDate, 'day')
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200'
            }`}
            onClick={() => setSelectedDate(day)}
          >
            {/* Mostrar "Hoy" si la fecha corresponde a la actual */}
            <div className="text-sm">
              {day.isSame(today, 'day') ? 'Hoy' : day.format('ddd')}
            </div>
            <div className="font-bold">{day.format('D')}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HorizontalDatePicker;
