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

})