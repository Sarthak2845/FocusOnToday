const checkBoxList = document.querySelectorAll('.custom-checkbox');
const inputFields = document.querySelectorAll('.goal-input');
const errorLabel = document.querySelector('.error-label');
const progressLabel=document.querySelector('.progress-label')
const progressValue = document.querySelector('.progress-value');
const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {
    first:{
        name:'',
        completed:false
    },
    second:{
        name:'',
        completed:false
    },
    third:{
        name:'',
        completed:false
    },
};
const quote=[
    'Raise the bar by completing your goals!',
    'Well Began  is half done!',
    'Just a step away,keep going!',
    "Woha! you just completed all goals,It's time for chill 🎉"

]
let goalCount = Object.values(allGoals).filter((goal) => goal.completed).length;
progressValue.firstElementChild.innerText=`${goalCount}/3 Completed`;
progressLabel.innerText=quote[goalCount]
checkBoxList.forEach((checkbox) => {
    checkbox.addEventListener('click', () => {
        const allGoalsAdded = [...inputFields].every((input) => input.value.trim());
        if (allGoalsAdded) {
            checkbox.parentElement.classList.toggle("completed");
            const inputId = checkbox.nextElementSibling.id;

            allGoals[inputId] = {
                ...allGoals[inputId],
                completed: !allGoals[inputId]?.completed,
            };

            goalCount = Object.values(allGoals).filter((goal) => goal.completed).length;
            progressValue.style.width = `${(goalCount / Object.keys(allGoals).length) * 100}%`;
            progressValue.firstElementChild.innerText=`${goalCount}/3 Completed`;
            progressLabel.innerText=quote[goalCount];
            localStorage.setItem('allGoals', JSON.stringify(allGoals));
        } else {
            errorLabel.style.display = 'block';
        }
    });
});

inputFields.forEach((input) => {
    const goal = allGoals[input.id] || { name: '', completed: false };
    input.value = goal.name;
    if (goal.completed) {
        input.parentElement.classList.add('completed');
    }

    input.addEventListener('focus', () => {
        errorLabel.style.display = 'none';
    });

    input.addEventListener('input', (e) => {
        if (allGoals[input.id].completed) {
            e.target.value=allGoals[input.id].name
            return
        }
        allGoals[input.id] = {
            name: input.value.trim(),
            completed: allGoals[input.id]?.completed || false,
        };
        localStorage.setItem('allGoals', JSON.stringify(allGoals));
    });
});

