import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Agenda.css';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';


const Agenda = () => {
    const event = [
        {
            title: "the Title",
            start: "2024-03-06T13:00:00",
            end: "2024-03-08T14:00:00",
        },
    ];
    return (
        <FullCalendar
            locale={frLocale}
            timeZone="UTC+1"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView='dayGridMonth'
            headerToolbar={{
                start: "today prev,next",
                center: "title",
                end: "dayGridMonth, timeGridWeek, timeGridDay",
            }}
            events={event}
        />
    )
}

export default Agenda;
