/**
 * Created by happyboy on 2017/3/10.
 */

function doGame()
{
    //Produce an integer [1,100]
    var computerThinkNumber=Math.floor(Math.random()*100)+1;

    //!Test
    console.log(computerThinkNumber);

    //@var guessNumber: the number you guess
    //@var guessTimes: the times you guess
    var guessNumber=0;
    var guessTimes=0;

    while(true)
    {
        guessNumber=prompt("Please input your guess number:");
        guessTimes++;

        if(guessNumber==computerThinkNumber)
        {
            alert("Congratuations, you succeed!\n And the total time you spend is "+guessTimes);
            break;
        }
        else if(guessNumber<computerThinkNumber)
            alert("Your number is too small");
        else
            alert("Your number is too large");
    }
}