/**
 * Calendario Interactivo
 * Funcionalidades:
 * - Vista mensual y anual
 * - Días no laborales (sábados/domingos y personalizados)
 * - Sistema de eventos con colores
 * - Persistencia en LocalStorage
 * - Navegación entre meses y años
 */

class Calendar {
    constructor() {
        this.currentDate = new Date();
        this.currentView = 'month';
        this.events = this.loadEvents();
        this.nonWorkingDays = this.loadNonWorkingDays();
        
        this.initializeEventListeners();
        this.render();
    }

    /**
     * Inicializa los event listeners
     */
    initializeEventListeners() {
        // Navegación
        document.getElementById('prevMonth').addEventListener('click', () => this.previousMonth());
        document.getElementById('nextMonth').addEventListener('click', () => this.nextMonth());
        document.getElementById('todayBtn').addEventListener('click', () => this.goToToday());
        
        // Cambio de vista
        document.getElementById('monthView').addEventListener('click', () => this.switchToMonthView());
        document.getElementById('yearView').addEventListener('click', () => this.switchToYearView());
        
        // Modal de eventos
        document.getElementById('saveEvent').addEventListener('click', () => this.saveEvent());
    }

    /**
     * Renderiza el calendario según la vista actual
     */
    render() {
        if (this.currentView === 'month') {
            this.renderMonthView();
        } else {
            this.renderYearView();
        }
    }

    /**
     * Renderiza la vista mensual
     */
    renderMonthView() {
        const monthContainer = document.getElementById('monthContainer');
        const yearContainer = document.getElementById('yearContainer');
        
        monthContainer.classList.remove('d-none');
        yearContainer.classList.add('d-none');
        
        this.updateMonthTitle();
        this.generateMonthCalendar();
    }

    /**
     * Renderiza la vista anual
     */
    renderYearView() {
        const monthContainer = document.getElementById('monthContainer');
        const yearContainer = document.getElementById('yearContainer');
        
        monthContainer.classList.add('d-none');
        yearContainer.classList.remove('d-none');
        
        this.updateYearTitle();
        this.generateYearCalendar();
    }

    /**
     * Actualiza el título del mes
     */
    updateMonthTitle() {
        const monthNames = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        
        const title = `${monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
        document.getElementById('currentMonthYear').textContent = title;
    }

    /**
     * Actualiza el título del año
     */
    updateYearTitle() {
        document.getElementById('currentYear').textContent = this.currentDate.getFullYear();
    }

    /**
     * Genera el calendario mensual
     */
    generateMonthCalendar() {
        const calendarBody = document.getElementById('calendarBody');
        calendarBody.innerHTML = '';
        
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        
        // Primer día del mes y último día del mes anterior
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        
        // Día de la semana del primer día (0 = domingo, 6 = sábado)
        const firstDayOfWeek = firstDay.getDay();
        
        // Último día del mes anterior
        const prevMonth = new Date(year, month, 0);
        const daysInPrevMonth = prevMonth.getDate();
        
        let dayCounter = 1;
        let prevDayCounter = daysInPrevMonth - firstDayOfWeek + 1;
        
        // Generar semanas (máximo 6 semanas)
        for (let week = 0; week < 6; week++) {
            const row = document.createElement('tr');
            
            for (let day = 0; day < 7; day++) {
                const cell = document.createElement('td');
                let dayNumber, isCurrentMonth, cellDate;
                
                if (week === 0 && day < firstDayOfWeek) {
                    // Días del mes anterior
                    dayNumber = prevDayCounter++;
                    isCurrentMonth = false;
                    cellDate = new Date(year, month - 1, dayNumber);
                } else if (dayCounter <= daysInMonth) {
                    // Días del mes actual
                    dayNumber = dayCounter++;
                    isCurrentMonth = true;
                    cellDate = new Date(year, month, dayNumber);
                } else {
                    // Días del mes siguiente
                    dayNumber = dayCounter - daysInMonth;
                    dayCounter++;
                    isCurrentMonth = false;
                    cellDate = new Date(year, month + 1, dayNumber);
                }
                
                this.setupDayCell(cell, dayNumber, isCurrentMonth, cellDate, day);
                row.appendChild(cell);
            }
            
            // Si ya no hay más días del mes actual y hemos pasado la primera semana, parar
            if (dayCounter > daysInMonth && week > 0) {
                break;
            }
            
            calendarBody.appendChild(row);
        }
    }

    /**
     * Configura una celda del día
     */
    setupDayCell(cell, dayNumber, isCurrentMonth, cellDate, dayOfWeek) {
        const daySpan = document.createElement('span');
        daySpan.className = 'day-number';
        daySpan.textContent = dayNumber;
        cell.appendChild(daySpan);
        
        // Agregar clases según el tipo de día
        if (!isCurrentMonth) {
            cell.classList.add('other-month');
        }
        
        // Días de fin de semana (domingo = 0, sábado = 6)
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            cell.classList.add('weekend');
        }
        
        // Día actual
        const today = new Date();
        if (isCurrentMonth && this.isSameDay(cellDate, today)) {
            cell.classList.add('today');
        }
        
        // Días no laborales personalizados (solo para días del mes actual)
        if (isCurrentMonth) {
            const dateKey = this.getDateKey(cellDate);
            if (this.nonWorkingDays.includes(dateKey)) {
                cell.classList.add('non-working');
            }
        }
        
        // Eventos del día
        this.addEventsToCell(cell, cellDate);
        
        // Event listeners
        cell.addEventListener('click', (e) => this.handleDayClick(e, cellDate, isCurrentMonth));
        cell.addEventListener('contextmenu', (e) => this.handleDayRightClick(e, cellDate, isCurrentMonth));
    }

    /**
     * Agrega eventos a una celda
     */
    addEventsToCell(cell, date) {
        const dateKey = this.getDateKey(date);
        const dayEvents = this.events[dateKey] || [];
        
        if (dayEvents.length > 0) {
            const eventsContainer = document.createElement('div');
            eventsContainer.className = 'events-container';
            
            // Mostrar máximo 3 puntos de eventos
            const eventsToShow = dayEvents.slice(0, 3);
            eventsToShow.forEach(event => {
                const dot = document.createElement('span');
                dot.className = `event-dot ${event.color}`;
                eventsContainer.appendChild(dot);
            });
            
            // Si hay más de 3 eventos, mostrar un indicador
            if (dayEvents.length > 3) {
                const moreDot = document.createElement('span');
                moreDot.className = 'event-dot secondary';
                moreDot.title = `+${dayEvents.length - 3} más`;
                eventsContainer.appendChild(moreDot);
            }
            
            cell.appendChild(eventsContainer);
        }
    }


    /**
     * Maneja el clic en un día
     */
    handleDayClick(event, date, isCurrentMonth) {
        if (!isCurrentMonth) return;
        
        const dateKey = this.getDateKey(date);
        const dayEvents = this.events[dateKey] || [];
        
        // Siempre mostrar eventos existentes si los hay, y permitir agregar más
        if (dayEvents.length > 0) {
            // Mostrar eventos existentes con opción de agregar más
            this.showDayEvents(date, dayEvents);
        } else {
            // Abrir modal para agregar evento
            this.openEventModal(date);
        }
    }

    /**
     * Maneja el clic derecho en un día
     */
    handleDayRightClick(event, date, isCurrentMonth) {
        event.preventDefault();
        
        if (!isCurrentMonth) return;
        
        const dateKey = this.getDateKey(date);
        
        // Toggle día no laboral
        if (this.nonWorkingDays.includes(dateKey)) {
            this.nonWorkingDays = this.nonWorkingDays.filter(d => d !== dateKey);
        } else {
            this.nonWorkingDays.push(dateKey);
        }
        
        this.saveNonWorkingDays();
        this.render();
    }

    /**
     * Abre el modal para agregar evento
     */
    openEventModal(date, eventToEdit = null) {
        const modal = new bootstrap.Modal(document.getElementById('eventModal'));
        document.getElementById('eventDate').value = this.formatDateForInput(date);
        
        if (eventToEdit) {
            document.getElementById('eventTitle').value = eventToEdit.title;
            document.getElementById('eventDescription').value = eventToEdit.description || '';
            document.getElementById('eventColor').value = eventToEdit.color;
            document.getElementById('saveEvent').textContent = 'Actualizar Evento';
            document.getElementById('saveEvent').setAttribute('data-edit-id', eventToEdit.id);
        } else {
            document.getElementById('eventTitle').value = '';
            document.getElementById('eventDescription').value = '';
            document.getElementById('eventColor').value = 'primary';
            document.getElementById('saveEvent').textContent = 'Guardar Evento';
            document.getElementById('saveEvent').removeAttribute('data-edit-id');
        }
        
        modal.show();
    }

    /**
     * Guarda un evento
     */
    saveEvent() {
        const title = document.getElementById('eventTitle').value.trim();
        const description = document.getElementById('eventDescription').value.trim();
        const color = document.getElementById('eventColor').value;
        const date = document.getElementById('eventDate').value;
        const editId = document.getElementById('saveEvent').getAttribute('data-edit-id');
        
        if (!title) {
            alert('Por favor ingresa un título para el evento');
            return;
        }
        
        if (!this.events[date]) {
            this.events[date] = [];
        }
        
        if (editId) {
            // Editar evento existente
            const eventIndex = this.events[date].findIndex(e => e.id == editId);
            if (eventIndex !== -1) {
                this.events[date][eventIndex] = {
                    id: parseInt(editId),
                    title,
                    description,
                    color,
                    date
                };
            }
        } else {
            // Crear nuevo evento
            const event = {
                id: Date.now(),
                title,
                description,
                color,
                date
            };
            this.events[date].push(event);
        }
        
        this.saveEvents();
        
        // Cerrar modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('eventModal'));
        modal.hide();
        
        this.render();
    }

    /**
     * Muestra los eventos de un día
     */
    showDayEvents(date, events) {
        const modal = new bootstrap.Modal(document.getElementById('dayEventsModal'));
        const title = document.getElementById('dayEventsTitle');
        const body = document.getElementById('dayEventsBody');
        
        title.textContent = `Eventos del ${this.formatDate(date)}`;
        body.innerHTML = '';
        
        events.forEach(event => {
            const eventDiv = document.createElement('div');
            eventDiv.className = `event-item ${event.color}`;
            eventDiv.innerHTML = `
                <div class="d-flex justify-content-between align-items-start">
                    <div class="flex-grow-1">
                        <div class="event-title">${event.title}</div>
                        ${event.description ? `<p class="event-description">${event.description}</p>` : ''}
                    </div>
                    <div class="btn-group btn-group-sm ms-2">
                        <button type="button" class="btn btn-outline-primary btn-sm" onclick="calendar.editEvent('${date.toISOString().split('T')[0]}', ${event.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button type="button" class="btn btn-outline-danger btn-sm" onclick="calendar.deleteEvent('${date.toISOString().split('T')[0]}', ${event.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
            body.appendChild(eventDiv);
        });
        
        // Agregar botón para añadir más eventos
        const addEventBtn = document.createElement('button');
        addEventBtn.className = 'btn btn-primary btn-sm mt-3';
        addEventBtn.innerHTML = '<i class="fas fa-plus me-1"></i>Agregar Evento';
        addEventBtn.addEventListener('click', () => {
            modal.hide();
            this.openEventModal(date);
        });
        body.appendChild(addEventBtn);
        
        modal.show();
    }

    /**
     * Edita un evento
     */
    editEvent(dateKey, eventId) {
        const dayEvents = this.events[dateKey] || [];
        const eventToEdit = dayEvents.find(e => e.id == eventId);
        
        if (eventToEdit) {
            const date = new Date(dateKey);
            this.openEventModal(date, eventToEdit);
        }
    }

    /**
     * Elimina un evento
     */
    deleteEvent(dateKey, eventId) {
        if (confirm('¿Estás seguro de que quieres eliminar este evento?')) {
            if (this.events[dateKey]) {
                this.events[dateKey] = this.events[dateKey].filter(e => e.id != eventId);
                
                // Si no hay más eventos en este día, eliminar la entrada
                if (this.events[dateKey].length === 0) {
                    delete this.events[dateKey];
                }
                
                this.saveEvents();
                this.render();
            }
        }
    }

    /**
     * Genera el calendario anual
     */
    generateYearCalendar() {
        const yearMonths = document.getElementById('yearMonths');
        yearMonths.innerHTML = '';
        
        const monthNames = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        
        for (let month = 0; month < 12; month++) {
            const monthDiv = document.createElement('div');
            monthDiv.className = 'col-md-4 col-lg-3 mb-4';
            
            const monthCard = document.createElement('div');
            monthCard.className = 'card h-100';
            
            const cardHeader = document.createElement('div');
            cardHeader.className = 'card-header text-center';
            cardHeader.innerHTML = `<h6 class="mb-0">${monthNames[month]}</h6>`;
            
            const cardBody = document.createElement('div');
            cardBody.className = 'card-body p-2';
            
            const calendar = this.generateYearMonthCalendar(this.currentDate.getFullYear(), month);
            cardBody.appendChild(calendar);
            
            monthCard.appendChild(cardHeader);
            monthCard.appendChild(cardBody);
            monthDiv.appendChild(monthCard);
            yearMonths.appendChild(monthDiv);
        }
    }

    /**
     * Genera un calendario mensual para la vista anual
     */
    generateYearMonthCalendar(year, month) {
        const table = document.createElement('table');
        table.className = 'year-calendar';
        
        // Encabezados
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const days = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
        
        days.forEach(day => {
            const th = document.createElement('th');
            th.textContent = day;
            headerRow.appendChild(th);
        });
        
        thead.appendChild(headerRow);
        table.appendChild(thead);
        
        // Cuerpo
        const tbody = document.createElement('tbody');
        
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const firstDayOfWeek = firstDay.getDay();
        
        const prevMonth = new Date(year, month, 0);
        const daysInPrevMonth = prevMonth.getDate();
        
        let dayCounter = 1;
        let prevDayCounter = daysInPrevMonth - firstDayOfWeek + 1;
        
        // Generar semanas
        for (let week = 0; week < 6; week++) {
            const row = document.createElement('tr');
            
            for (let day = 0; day < 7; day++) {
                const cell = document.createElement('td');
                let dayNumber, isCurrentMonth, cellDate;
                
                if (week === 0 && day < firstDayOfWeek) {
                    dayNumber = prevDayCounter++;
                    isCurrentMonth = false;
                    cellDate = new Date(year, month - 1, dayNumber);
                } else if (dayCounter <= daysInMonth) {
                    dayNumber = dayCounter++;
                    isCurrentMonth = true;
                    cellDate = new Date(year, month, dayNumber);
                } else {
                    dayNumber = dayCounter - daysInMonth;
                    dayCounter++;
                    isCurrentMonth = false;
                    cellDate = new Date(year, month + 1, dayNumber);
                }
                
                cell.textContent = dayNumber;
                
                // Aplicar estilos
                if (!isCurrentMonth) {
                    cell.classList.add('other-month');
                }
                
                if (day === 0 || day === 6) {
                    cell.classList.add('weekend');
                }
                
                const today = new Date();
                if (isCurrentMonth && this.isSameDay(cellDate, today)) {
                    cell.classList.add('today');
                }
                
                // Días no laborales personalizados (solo para días del mes actual)
                if (isCurrentMonth) {
                    const dateKey = this.getDateKey(cellDate);
                    if (this.nonWorkingDays.includes(dateKey)) {
                        cell.classList.add('non-working');
                    }
                }
                
                // Eventos
                this.addYearEventsToCell(cell, cellDate);
                
                // Event listener para hacer clic en un mes específico
                if (isCurrentMonth) {
                    cell.addEventListener('click', () => {
                        this.currentDate = new Date(year, month, dayNumber);
                        this.switchToMonthView();
                    });
                }
                
                row.appendChild(cell);
            }
            
            if (dayCounter > daysInMonth && week > 0) {
                break;
            }
            
            tbody.appendChild(row);
        }
        
        table.appendChild(tbody);
        return table;
    }

    /**
     * Agrega eventos a una celda en la vista anual
     */
    addYearEventsToCell(cell, date) {
        const dateKey = this.getDateKey(date);
        const dayEvents = this.events[dateKey] || [];
        
        if (dayEvents.length > 0) {
            const eventDot = document.createElement('span');
            eventDot.className = `year-event-dot ${dayEvents[0].color}`;
            cell.appendChild(eventDot);
        }
    }

    /**
     * Navegación
     */
    previousMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.render();
    }

    nextMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this.render();
    }

    goToToday() {
        this.currentDate = new Date();
        this.render();
    }

    switchToMonthView() {
        this.currentView = 'month';
        this.render();
    }

    switchToYearView() {
        this.currentView = 'year';
        this.render();
    }

    /**
     * Utilidades
     */
    isSameDay(date1, date2) {
        return date1.getFullYear() === date2.getFullYear() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getDate() === date2.getDate();
    }

    getDateKey(date) {
        return date.toISOString().split('T')[0];
    }

    formatDate(date) {
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    formatDateForInput(date) {
        return date.toISOString().split('T')[0];
    }

    /**
     * Persistencia en LocalStorage
     */
    saveEvents() {
        localStorage.setItem('calendarEvents', JSON.stringify(this.events));
    }

    loadEvents() {
        const saved = localStorage.getItem('calendarEvents');
        return saved ? JSON.parse(saved) : {};
    }

    saveNonWorkingDays() {
        localStorage.setItem('calendarNonWorkingDays', JSON.stringify(this.nonWorkingDays));
    }

    loadNonWorkingDays() {
        const saved = localStorage.getItem('calendarNonWorkingDays');
        return saved ? JSON.parse(saved) : [];
    }
}

// Inicializar el calendario cuando se carga la página
let calendar;
document.addEventListener('DOMContentLoaded', () => {
    calendar = new Calendar();
});
