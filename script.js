const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();


let ticketPrice = +movieSelect.value;

// Get data from local storage and populate UI
function populateUI() {

   const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
   
   if (selectedSeats !== null && selectedSeats.length > 0) {
      seats.forEach((seat, index) => {
         if (selectedSeats.indexOf(index) > -1) {
            seat.classList.add('selected');
         }
      });
   }

   const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
   if (selectedMovieIndex !== null) {
      movieSelect.selectedIndex = selectedMovieIndex;
   }

   
}



function updateSelectedCount() {
   const selectedSeats = document.querySelectorAll('.row .seat.selected');
   
   // Copy Selected Seats into arr
   // Map through array
   // return a new array indexes

   const seatsIndex = [...selectedSeats].map( seat => [...seats].indexOf(seat));
   
   localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));


   
   const selectedSeatsCount = selectedSeats.length;

   count.innerText = selectedSeatsCount;
   total.innerText = selectedSeatsCount * ticketPrice;
}

// Movie Select Event
movieSelect.addEventListener('change', (e) => {

   ticketPrice = +e.target.value;

   localStorage.setItem('selectedMovieIndex', e.target.selectedIndex);
   localStorage.setItem('selectedMoviePrice', e.target.value);

   updateSelectedCount();
});


// Seat Click Event
container.addEventListener('click', (e) => {
   if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
      e.target.classList.toggle('selected');

      updateSelectedCount();

   }
})

updateSelectedCount();