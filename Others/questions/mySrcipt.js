/**
 * Created by happyboy on 2017/3/29.
 */

function checkChoose()
{
    if(!(document.getElementById("promise2").checked))
    {
        document.getElementById("submit2").disabled="disabled";
    }
    else
        document.getElementById("submit2").disabled=false;
}