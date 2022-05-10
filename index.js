const { fifaData } = require('./fifa.js')

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note. 

💡 HINT: You may want to filter the data first 😉

Filter for: Year === 2014 && Stage === Final
*/

const finals2014 = fifaData.filter(function(item){
    return item.Year === 2014 && item.Stage === 'Final'
});

console.log(finals2014)

//(a) Home Team name for 2014 world cup final
console.log('Home Team:', finals2014[0]['Home Team Name'])

//(b) Away Team name for 2014 world cup final
console.log('Away Team;', finals2014[0]['Away Team Name'])

//(c) Home Team goals for 2014 world cup final
console.log('Home Team Goals:', finals2014[0]['Home Team Goals'])

//(d) Away Team goals for 2014 world cup final
console.log('Away Team Goals:', finals2014[0]['Away Team Goals'])

//(e) Winner of 2014 world cup final 
console.log('Winner:', finals2014[0]['Home Team Name'])

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive an array as a parameter that will take the fifa data as its argument
2. Return an array of objects with the data of the teams that made it to the final stage

💡 HINT - you should be looking at the stage key inside of the objects
*/

function getFinals(array) {
    const finalGames = array.filter(function(item){
        return item.Stage === 'Final'
    })
    return finalGames
 }

console.log('Final Games:', getFinals(fifaData))

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(array, cbFinals) {
    const years = cbFinals(array).map(function(item){
        return item.Year
    })
    return years
}

console.log(getYears(fifaData, getFinals))


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Determines the winner (home or away) of each `finals` game. 
💡 HINT: Don't worry about ties for now (Please see the README file for info on ties for a stretch goal.)
4. Returns the names of all winning countries in an array called `winners` */ 

// //Without using .map(), .filter(), .forEach()
// function getWinners(array, cbFinals) {
//     const winners = []
//     const finals = cbFinals(array)
    
//     for(let i=0; i < finals.length; i++){
//         if(finals[i]['Home Team Goals'] > finals[i]['Away Team Goals']){
//             winners.push(finals[i]['Home Team Name'])
//        } 
//        else {
//            winners.push(finals[i]['Away Team Name'])
//         }
//    }
//    return winners
// }

// console.log('Finals Winner:', getWinners(fifaData, getFinals))

function getWinners(array, cbfinals){
    const winners = cbfinals(array).map(match => {return match['Home Team Goals'] > match['Away Team Goals'] ? match['Home Team Name'] : match['Away Team Name']
})
    return winners
}

console.log('Finals Winner:', getWinners(fifaData, getFinals))


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Receive a callback function as the third parameter that will take getYears from task 3 as an argument
4. Receive a callback function as the fourth parameter that will take getWinners from task 4 as an argument
5. Return an array of strings that say "In {year}, {country} won the world cup!" 

💡 HINT: the strings returned need to exactly match the string in step 5.
 */

function getWinnersByYear(array, cbFinals, cbYears, cbWinners) {
    const years = cbYears(array, cbFinals)
    const winners = cbWinners(array, cbFinals)

    return winners.map((winner, index) => 
        `In ${years[index]}, ${winner} won the world cup!`
    )
}

console.log('Winners by Year:', getWinnersByYear(fifaData, getFinals, getYears, getWinners))


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function getAverageGoals to do the following: 
 1. Receive a callback function in a parameter that will take getFinals (from task 2) as an argument and ensure you pass in the fifaData as its argument
 
 💡 HINT: Example of invocation: getAverageGoals(getFinals(fifaData));

 2. Return the the average number of the total home team goals and away team goals scored per match and round to the second decimal place. 
 
 💡 HINT: use .reduce, .toFixed (refer to MDN for syntax), and do this in 2 steps) 
 
 
*/

function getAverageGoals(cbFinals){
    const allGoals = [cbFinals.reduce((accumulator, goals) => {
        return accumulator + goals['Home Team Goals'] + goals['Away Team Goals']
    }, 0)]
    
    const avGoals = allGoals.reduce((accumulator, goals) => {
        return (accumulator * goals)/cbFinals.length;
    }, 1)

    return avGoals.toFixed(2)
 }

console.log(getAverageGoals(getFinals(fifaData)))


/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(){
}



/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(data) {

}


/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(data) {
}


/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */


/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo(){
    console.log('its working');
    return 'bar';
}
foo();
module.exports = {
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}
