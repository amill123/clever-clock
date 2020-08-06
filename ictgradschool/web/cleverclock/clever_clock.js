window.addEventListener("load", function () {

   // TODO: your code for both tasks here
    /*
        This first section of code is for the Clock Component of the page
     */


    //sets up global variables for Clock Component
    let seconds = 0;
    let meridian = 'AM';
    let minutes = 0;
    let hour = 0;
    let clock = document.querySelector('#clock_face');

    let clockText = `${hour}:${minutes} ${meridian}`;
    let calendarText;
    applyClockFace();

    //The applyClockFace method gets
    function applyClockFace(){
        clock.innerText = '';
        let date = new Date();
        hour = date.getHours();
        minutes = date.getMinutes();

        //Set the delay time for when the minute should change (this should initially be however many seconds until the next minute if the clock was called between minutes (i.e not 0) - but then 60 seconds from the next minute onward)
        seconds = 60000 - (1000*date.getSeconds());

        //If the returned hour is greater than 12, change it to 12hour time and set the meridian to PM
        if(hour>12){
            hour = (hour - 12);
            meridian = 'PM';
        }

        if(hour == 0 && minutes>2){
            applyDateFace();
        }
        //Convert hour and minutes to String and pad the start with a zero, if there isn't two digits for each number
        hour = (''+hour).padStart(2,'0');
        minutes = (''+minutes).padStart(2,'0');

        //Display the clock in the clock face
        clockText = `${hour}:${minutes} ${meridian}`;
        clock.innerText = clockText;

        //Sets when the next time the method should be called as well as when to hide the colon
        setTimeout(applyClockFace, seconds);
        setInterval(hideColon,2000);

    }

    //Every second second hideColon will be called, which will set a one second timeout for blinkColon method to bring back the colon to give the flashing effecting
    function hideColon() {
        clock.innerText = `${hour} ${minutes} ${meridian}`;
        setTimeout(blinkColon, 1000);
    }

    function blinkColon() {
        clock.innerText = clockText;
    }


    function applyDateFace(){
        let dateFace = document.querySelector('#date_face');
        dateFace.innerText = '';
        let date = new Date();
        let day = date.getDay();
        let number = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();

        //Transforms the integer returned by getDay method to a String representing day of week
        switch (day) {
            case 0:
                day = "Sunday";
                break;
            case 1:
                day = "Monday";
                break;
            case 2:
                day = "Tuesday";
                break;
            case 3:
                day = "Wednesday";
                break;
            case 4:
                day = "Thursday";
                break;
            case 5:
                day = "Friday";
                break;
            case 6:
                day = "Saturday";
                break;
        }
        //Transforms the integer returned by getMonth method to a String representing month of year
        switch(month){
            case 1:
                month = "January";
                break;
            case 2:
                month = "February";
                break;
            case 3:
                month = "March";
                break;
            case 4:
                month = "April";
                break;
            case 5:
                month = "May";
                break;
            case 6:
                month = "June";
                break;
            case 7:
                month = "July";
                break;
            case 8:
                month = "August";
                break;
            case 9:
                month = "September";
                break;
            case 10:
                month = "October";
                break;
            case 11:
                month = "November";
                break;
            case 12:
                month = "December";
                break;
        }

        //Displays the calendar in the HTML page
        calendarText = `${day}, ${number} ${month} ${year}`;
        console.log(calendarText);
        dateFace.innerText = calendarText;
    }
    applyDateFace();


    /*
        Below is the code for the Timer
     */


    //Initialises global variables for the Timer Component of the page
    let run = document.querySelector('#run');
    let reset = document.querySelector('#rst');
    let timer = document.querySelector('#timer_face');
    let time = 0.0;
    let startTime = 0.0;
    let interval;
    let autoClearTimer;

    applyStartStopButtonCss();
    applyResetDisable();

    //Start/Stop button is always green as it's green when you can start it and green when you can stop it - It also initialises the start button with the start class
    function applyStartStopButtonCss(){
        run.classList.add('button_enabled','start');
    }

    //
    function applyResetDisable(){
        reset.classList.add('button_disabled');
        time = 0.0;
        timer.innerHTML = `${time.toFixed(1)}`;
    }

    //adds a click event listener to the start/stop button
    run.addEventListener('click', (event)=> {
        //Loops through the classes assigned to the run id button
        for (let i = 0; i < run.classList.length; i++) {

            if(run.classList[i] === 'start'){
                //If start is a class, remove start and add stop as a class.
                run.classList.remove('start');
                run.classList.add('stop');
                run.innerHTML = 'Stop';


                //Re-disable the reset button as the timer will have restarted
                reset.classList.add('button_disabled');
                reset.classList.remove('button_enabled');

                //Set the reference time for the timer
                let date = new Date();
                startTime = date.getTime();
                //set the interval of which the timer is to be called to 100ms (which should be 0.1s)
                interval = setInterval(getTime, 100);

                //Disable the autocleartimer as timer restarted
                clearTimeout(autoClearTimer);

            } else if(run.classList[i] === 'stop'){
                //If stop is a class, remove stop and add start as a class
                run.classList.remove('stop');
                run.classList.add('start');
                run.innerHTML = 'Start';

                //Clear the timer so that it stops counting and apply an autoclear interval which will reset the timer after 30s (30,000ms)
                clearInterval(interval);
                autoClearTimer = setTimeout( applyResetDisable,30000);

                //Enable the reset button as the timer is stopped and will be greater than 0
                    reset.classList.add('button_enabled');
                    reset.classList.remove('button_disabled');

            }
        }
    });

    //Adds an event listener to the reset button which checks that the button_enabled class is present and will call the applyResetDisable method to reset the timer
    reset.addEventListener('click', (event) => {
        for (let i = 0; i < reset.classList.length; i++) {
            if(reset.classList[i] === 'button_enabled'){
                reset.classList.remove('button_enabled');
                applyResetDisable();
            }
        }


    })

    //Timer function which calls a new date, compares it to the previous saved date to calculate the seconds passed, and updates the timer which is then displayed in HTML
    function getTime() {
        let date = new Date();
        let previousTime = startTime;
        startTime = date.getTime();
        time = (time + (startTime-previousTime)/1000);
        timer.innerHTML = `${time.toFixed(1)}`;
    }


});