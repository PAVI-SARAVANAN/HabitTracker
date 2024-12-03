import { getHabit, updateHabit } from "../data/data.js";
import {urlHandler} from "../main.js";


function main(){

    function getHabitId(){
        const params = new URLSearchParams(window.location.search);  // Getting query param from URL
        return params.get('habitId');
    }
    function displayHabit(habitId){
        /* Creating input elements dynamically */
        const habitForm = document.getElementById('habit-inputs');
        const HabitParagraph = document.createElement('p');
        const GoalParagraph = document.createElement('p');
        const habit = getHabit(habitId);
    
        const Habit = document.createElement('label');
        Habit.setAttribute('for', 'habit-input');
        Habit.innerText = 'Habit';
    
        const HabitInput = document.createElement('input');
        HabitInput.setAttribute('type', 'text');
        HabitInput.setAttribute('id', 'habit-input');
        HabitInput.value = habit.habit;
    
        const Goal = document.createElement('label');
        Goal.setAttribute('for', 'goal-input');
        Goal.innerText = 'Goal';
    
        const GoalInput = document.createElement('input');
        GoalInput.setAttribute('type', 'text');
        GoalInput.setAttribute('id', 'goal-input');
        GoalInput.value =  habit.goal;
    
        const GoalType = document.createElement('select');
        GoalType.setAttribute('id', 'goal-type');
    
        const GoalTypeDefaultOption = document.createElement('option');
        GoalTypeDefaultOption.innerText = habit.goaltype;
        GoalType.appendChild(GoalTypeDefaultOption);
    
        const options = [
            { value: 'times', text: 'times' },
            { value: 'Days', text: 'Days' },
            { value: 'hr', text: 'hr' },
            { value: 'min', text: 'min' },
            { value: 'km', text: 'km' },
          ];
        
        options.forEach(optionData => {
            const option = document.createElement('option');
            option.value = optionData.value;
            option.innerText = optionData.text;
            GoalType.appendChild(option);
        })
    
    
        HabitParagraph.append(Habit, HabitInput);
        GoalParagraph.append(Goal, GoalInput, GoalType);
        habitForm.append(HabitParagraph, GoalParagraph);
     
    }
    const habitId = getHabitId();
    displayHabit(habitId);
    document.querySelector('.cancel').addEventListener('click', ()=> cancelUpdate());
    document.querySelector('.save').addEventListener('click', ()=> saveUpdate());
    function cancelUpdate()
    {
        window.history.pushState({}, '', '/');
        urlHandler();
    }
    function saveUpdate()
    {
        const enteredHabit = document.getElementById('habit-input').value;
        const enteredGoal = document.getElementById('goal-input').value;
        const enteredGoalType = document.getElementById('goal-type').value;

        updateHabit(habitId, {
                id:habitId,
                habit: enteredHabit,
                goal: enteredGoal,
                goaltype : enteredGoalType});
        
        window.history.pushState({}, '', '/');
        urlHandler();
    }

}

main();
