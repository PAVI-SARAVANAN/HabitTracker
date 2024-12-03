import { getHabits, subscribe,  initializeHabits, removeHabit } from './data/data.js';

import { router } from './routes/router.js';

function main(){
    function populateHabits(){
        const habitList = document.getElementById("habit-list");
    
        function renderHabits(habits){
            habitList.innerHTML = "";
            habits.forEach(habit => {
                const habitListDynamic = document.createElement("li");
                habitListDynamic.innerHTML = `<span id="habit-name" class="habit-name">${habit.habit} </span>
                <span>${habit.goal} ${habit.goaltype}</span>
                <button type="button" class="habit-list-button" id="habit-list-button" data-id="${habit.id}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="23" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                    </svg>
                </button>`;
                habitList.append(habitListDynamic);    
                 
                habitListDynamic.querySelector(".habit-list-button").addEventListener("click", (event) => {
                    showOptions(event, habit.id);
                });      
            });        
        }
        initializeHabits();
        subscribe(renderHabits);
        renderHabits(getHabits());
       
    }
    populateHabits();

    document.querySelector('.add').addEventListener('click', ()=> addHabit('/new'));

}

main();

export const urlHandler = async( ) => {
    const location = window.location.pathname;
    
    const selectedRoute = router[location];
    
    if(!selectedRoute){
        console.log('No route found....');
    }
    const renderHtml = await fetch (selectedRoute.template).then((Response) => Response.text());
    /* add css dynamically */
    document.getElementById('home-page').innerHTML = renderHtml;
    const appendLink = document.createElement("link");
    appendLink.setAttribute('href', selectedRoute.style);
    appendLink.setAttribute('rel', 'stylesheet');
    appendLink.setAttribute('type', 'text/css');
    document.head.appendChild(appendLink);
    /* add script dynamically */
    const appendScript = document.createElement('script');
    appendScript.setAttribute('type', 'module');
    appendScript.setAttribute('src', selectedRoute.script);
    document.body.appendChild(appendScript);

    if(location === '/' || location === '/index.html'){
        main();
    }

}
function showOptions(event, habitId){
  /* Get the position of the clicked button */
    const button = event.target;
    const rect = button.getBoundingClientRect();

  /* Position the options div near the button */
    const optionsDiv = document.getElementById('options');  

    optionsDiv.style.display = optionsDiv.style.display === 'none' ? 'flex' : 'none';
  
    optionsDiv.style.top = `${rect.bottom + window.scrollY}px`;
    optionsDiv.style.left = `${rect.left + window.scrollX}px`;

  
  /* Dynamically update data-id attributes of buttons inside options */
    optionsDiv.querySelector("#edit-habit").setAttribute("data-id", habitId);
    optionsDiv.querySelector("#complete-habit").setAttribute("data-id", habitId);
    
   /* Add click event listeners to buttons */
    optionsDiv.querySelector("#edit-habit").onclick = () => editHabit(habitId);
    optionsDiv.querySelector("#complete-habit").onclick = () => completeHabit(habitId); 
  
}

function editHabit(habitId){   
    const newURL = `/edit?habitId=${habitId}`; 
    window.history.pushState({}, '', newURL);
    urlHandler();
}
function addHabit(route){
    window.history.pushState({ },'', route);
    urlHandler();
}
function completeHabit(habitId){
    removeHabit(habitId);
    
}



