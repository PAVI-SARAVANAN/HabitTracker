const state = {
    habits : [
        { 
            id: "1",
            habit:"Hit the Gym",
            goal: 5,
            goaltype: "days"
       },
       {
           id:"2",
           habit:"Reading",
           goal: 15,
           goaltype: "mins"
       },
       {
           id:"3",
           habit:"Meditation",
           goal: 10,
           goaltype: "mins"
       },
       {
           id:"4",
           habit:"Walking",
           goal: 2,
           goaltype: "km"
       }
    ],
    listeners :[]
}
export function initializeHabits(){
    localStorage.setItem("habits", JSON.stringify(state.habits));  // Store the data in localstorage
    notifyListeners();
}
export function getHabits(){
    state.habits = JSON.parse(localStorage.getItem("habits"));   // Get the data from localstorage
    return state.habits;
}
export function updateHabit(habitId, updatedhabit){
    const index = state.habits.findIndex(habit => habitId === habit.id);  // update a habit
    if(index !== -1){
        state.habits[index] = updatedhabit;
    }
    
    console.log("from data.js",state.habits);
    notifyListeners();
}
export function getHabit(habitId){
    const selectedHabit = state.habits.find(habit => habitId === habit.id); // get a habit
    return selectedHabit;
}
export function addHabit(newHabit){
    state.habits.push(newHabit);
    localStorage.setItem("habits", JSON.stringify(state.habits));        // add new habit into habit array
    notifyListeners();    
}
export function removeHabit(habitId){
    const index = state.habits.findIndex((habit) => habitId === habit.id);   // remove a habit from habit array

    if(index !== -1){
        state.habits.splice(index, 1);
    }
    initializeHabits();
    notifyListeners();
}
export function subscribe(listener){                                     // subscribe function to listen for updates 
    state.listeners.push(listener);
}
export function notifyListeners(){
    state.listeners.forEach((listener) => listener(state.habits));       // function which gets the latest habit array
    
}
