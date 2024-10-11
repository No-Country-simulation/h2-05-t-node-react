import React, { useState } from "react";
import { Calendar } from 'primereact/calendar';

const InlineCalendar = ({ onDateSelect }) => {
    const [date, setDate] = useState(null);

    const handleDateChange = (e) => {
        setDate(e.value);
        onDateSelect(e.value); // Llamamos a la función pasada como prop para enviar la fecha seleccionada al componente padre
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white z-50">
            <Calendar value={date} onChange={handleDateChange} />
        </div>
    );
};

export default InlineCalendar;
