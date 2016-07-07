/*window.onload = function(){
	document.getElementById("#num1").onclick.console.log("bar");
	var y = "something";
	console.log(x);
	//foo.onclick.console.log("bar");
};*/
window.onload = function()	{

	var btn = document.getElementsByTagName("button");
	var display = document.getElementById("display");
	var equat_display = document.getElementById("equat_display");
    //storage for current calculator equation
	var equation = "";
    var equat_finished = false;
	
    //Keyboard input
    document.body.onkeydown = function (e) {
    	input = e.key.toLowerCase();
        console.log(e.location + "; " + e.key + "; " + input);

        switch (input) {
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                dispType(input);
                break;
            case "-":
            case "+":
            case "/":
            case "*":
                calcNum(input);
                break;
            case "enter":
                equateNum(input);
                break;
            case "backspace":
                clearCalc(input);
                break;
            case ",":
            case ".":
                deciNum(".");
                break;
            default:
                console.log("This is not a supported input.")
        }
    };
    console.log(btn);
    //Sets events for button clicks
	for(var i = 0; i < btn.length; i++){
	
	    var e = btn[i].innerHTML;
        //numbered buttons
        if(i < 10){
		    btn[i].addEventListener("click", function(btn){
                e = btn.target.innerHTML;
                dispType(e)
		    });
		}else if(i > 11 && i < 16) {
		    btn[i].addEventListener("click", function (btn) {
		        e = btn.target.innerHTML;
		        console.log("Before calc:" + e)
		        calcNum(e);
		    }, false);
        //equate button
		} else if (i === 11) {
		    btn[i].addEventListener("click", function (btn) {
		        e = btn.target.innerHTML;
		        equateNum(e);
		    }, false);
		} else if (i === 10) {
		    btn[i].addEventListener("click", function (btn) {
		        e = btn.target.innerHTML;
		        deciNum(e);
		    }, false);
		}else if (i === 16) {
	        btn[i].addEventListener("click", function (btn) {
	            e = btn.target.innerHTML;
	            clearCalc(e);
	        }, false);
	    }
	}   
        
	function dispType(e){
	    if (equat_finished === true) {
	        equation = "";
            equat_finished = false;
            display.innerHTML = "";
        }
	    var cur_num = display.innerHTML;
        
		if(cur_num === "0" || cur_num === 0){
		    console.log(cur_num + ", " + e);
		    display.innerHTML = e;
		    console.log(cur_num);
		} else if (cur_num !== "0" || cur_num !== 0) {
		    if ((cur_num === "+" || cur_num === "/" || cur_num === "*") && (e === "0" || e === 0)) {
		        return;
		    } else if (cur_num === "-0") {
                if(e === "0") {
		            console.log("Cannot add another 0");
		            return;
                } else if (e !== "."){
                    display.innerHTML = "-" + e;
                    return;
                }
		    }
		    display.innerHTML += e;
		} else {
            console.log("dispType error");
        }
	}

	function calcNum(e) {
	    console.log(e);

	    var cur_num = display.innerHTML;

	    if (cur_num === "0" || cur_num === 0) {

	        if (e === "-") {
	            if (equat_finished === true) {
	                equation = "";
	                equat_finished = false;
	                display.innerHTML = "";
	            }
	            display.innerHTML = e;
	        }
	        console.log("nothing to calc");
	        return;
	    } else if (cur_num !== "0" || cur_num !== 0) {

	        if (cur_num.charAt(0) !== e) {
	            equation += display.innerHTML;
	            display.innerHTML = e;
	        } else if (cur_num.charAt(0) === e && typeof (parseInt(cur_num)) === "number") {
	            equation += cur_num;
	            display.innerHTML = e;
	        }
	    }
	}
    //TODO make the calculator reset on a new input
	function equateNum(e) {
	    if (equat_finished === false) {
	        equation += display.innerHTML;
	        display.innerHTML = "0";
	        equat_display.innerHTML = eval(equation);
	        equat_finished = true;
	        equation = "";
	    }
	}
	
	function clearCalc(e) {
	    equat_finished = true;
	    equation = "";
	    display.innerHTML = "0";
	}

	function deciNum(e) {
	    cur_num = display.innerHTML;
        
	    if (cur_num.indexOf(".") === -1) {
	        cur_num += e;
	        display.innerHTML = cur_num;
            console.log(cur_num);
            equat_finished = false;
	    } else {
	        console.log("Decimal already there.");
	        return;
	    }
	}

};


