$(document).ready(function() {
    // Display current day at the top of the calendar
    $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY'));

    // Generate timeblocks for standard business hours (9 AM to 5 PM)
    const businessHours = [
        { hour: 9, display: "9 AM" },
        { hour: 10, display: "10 AM" },
        { hour: 11, display: "11 AM" },
        { hour: 12, display: "12 PM" },
        { hour: 13, display: "1 PM" },
        { hour: 14, display: "2 PM" },
        { hour: 15, display: "3 PM" },
        { hour: 16, display: "4 PM" },
        { hour: 17, display: "5 PM" }
    ];

     // Function to create a timeblock row
     function createTimeblock(hour, display) {
        const row = $('<div class="row time-block"></div>');
        const hourCol = $('<div class="col-md-1 hour"></div>').text(display);
        const textAreaCol = $('<textarea class="col-md-10 description"></textarea>').attr('id', 'hour-' + hour);
        const saveBtnCol = $('<button class="col-md-1 saveBtn"><i class="fas fa-save"></i></button>');

        row.append(hourCol, textAreaCol, saveBtnCol);
        $('.container').append(row);
    }

    // Create timeblocks
    businessHours.forEach(hourBlock => createTimeblock(hourBlock.hour, hourBlock.display));

    // Load events from local storage
    function loadEvents() {
        businessHours.forEach(hourBlock => {
            const eventText = localStorage.getItem('hour-' + hourBlock.hour);
            if (eventText) {
                $('#hour-' + hourBlock.hour).val(eventText);
            }
        });
    }

     // Save event to local storage
     function saveEvent(hour) {
        const eventText = $('#hour-' + hour).val();
        localStorage.setItem('hour-' + hour, eventText);
    }

    // Handle save button clicks
    $('.saveBtn').on('click', function() {
        const hour = $(this).siblings('.description').attr('id').split('-')[1];
        saveEvent(hour);
    });

    // Update timeblock colors based on past, present, and future
    function updateColors() {
        const currentHour = dayjs().hour();

        $('.time-block').each(function() {
            const blockHour = parseInt($(this).find('.description').attr('id').split('-')[1]);

            if (blockHour < currentHour) {
                $(this).addClass('past').removeClass('present future');
            } else if (blockHour === currentHour) {
                $(this).addClass('present').removeClass('past future');
            } else {
                $(this).addClass('future').removeClass('past present');
            }
        });
    }

    loadEvents();
    updateColors();
    setInterval(updateColors, 60000); // Update colors every minute
});


