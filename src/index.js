//variables to create:   poster, title, runtime, showtime, and available tickets

const url = "http://localhost:3000/films";
const poster = el("poster");
const title = el("title");
const runtime = el("runtime");
const showtime = el("showtime");
const description = el("film-info");
const ticketNum = el("ticket-num");
const movieListUl = el("films");
const li = document.getElementsByClassName("item");
const buyBtn = el("buy-ticket");

// 1. See the first movie's details, including its poster, title, runtime, showtime, and available tickets when the page loads. The number of available tickets will need to be derived by subtracting the number of tickets_sold from the theater's capacity.

//data for first movie poster
fetch(`${url}/${1}`)
  .then((res) => res.json())
  .then(renderMovie);

//render the first film on the page
function renderMovie(film) {        
  poster.src = film.poster;         
  title.textContent = film.title;   
  runtime.textContent = `${film.runtime} minutes`;
  description.textContent = film.description;
  showtime.textContent = film.showtime;

  //calculate number of tickets remaining
  let ticketsRem = film.capacity - film.tickets_sold;
    //display number of tickets remaining
  ticketNum.innerHTML = ticketsRem;
    //sold out feature
  if (ticketsRem > 0) {
    buyBtn.textContent = "Buy Ticket";
  } else {
    buyBtn.textContent = "Sold Out";
    // li.classList.add("sold-out");
  }
}

// 2. See a menu of all movies on the left side of the page in the ul#films element when the page loads. (optional: you can style each film in the list by adding the classes film item to each li element.) There is a placeholder li in the ul#films element that is hardcoded in the HTML — feel free to remove that element by editing the HTML file directly, or use JavaScript to remove the placeholder element before populating the list.

fetch(url)
  .then((res) => res.json())
  .then(renderFilmList);

function renderFilmList(film) {
  film.forEach(renderFilm);
}

function renderFilm(film) {
  const li = document.createElement("li");
  li.classList.add("film");
  li.classList.add("item");
  li.textContent = film.title;
  movieListUl.append(li);
  li.addEventListener("click", () => handleClick(film));
}

// 3. Buy a ticket for a movie. After clicking the "Buy Ticket" button, I should see the number of available tickets decreasing on the frontend. I should not be able to buy a ticket if the showing is sold out (if there are 0 tickets available). No persistence is needed for this feature.

buyBtn.addEventListener("click", decreaseTicket);

function decreaseTicket() {
  let currentTickets = parseInt(ticketNum.textContent);
  if (currentTickets > 1) {
    ticketNum.textContent = currentTickets - 1;
  } else if (currentTickets === 1) {
    ticketNum.textContent = currentTickets - 1;
    buyBtn.innerText = "Sold Out";
  }
}

//  Bonus Deliverables
// 1. Click on a movie in the menu to replace the currently displayed movie's details with the new movie's details. Note that you may have to make an additional GET request to access the movie's details.

function handleClick(film) {
  renderMovie(film);
}

// 2. When a movie is sold out (when there are no available tickets remaining), indicate that the movie is sold out by changing the button text to "Sold Out". Also update the film item in the ul#films menu by adding a class of sold-out to the film.

function el(id) {
  return document.getElementById(id);
}
