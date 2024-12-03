import { urlHandler } from "../main.js";
import { addHabit} from "../data/data.js";


document.querySelector('.save').addEventListener('click', () => saveHabit());
document.querySelector('.cancel').addEventListener('click', () => cancelHabit());

function saveHabit(){

    const enteredHabit = document.getElementById('habit-input').value;
    const enteredGoal = document.getElementById('goal-input').value;
    const enteredGoalType = document.getElementById('goal-type').value;

    addHabit(
        {   id: Date.now(),
            habit: enteredHabit,
            goal: enteredGoal,
            goaltype: enteredGoalType        
    });
    

    window.history.pushState({}, '', '/');
    urlHandler();
    
}

function cancelHabit(){
    window.history.pushState({}, '', '/');
    urlHandler();
}