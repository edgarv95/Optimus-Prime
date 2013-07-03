//Been to variables
beentocorridor = true;
//
//Item variable
keys = false;
knife = false;
ladder = false;
//
beentohall = false;
var beentocafeteria = false;
beentolibrary = false;

//location variable

/* LOCATIONS:
 * cell
 * hall
 * cafeteria
 * library
 * west yard
 * south yard
 * east yard
 * north yard
 * tower
 */
currentroom = "cell";
//
//event variables
prisondoor = false;
ladderfree = false;
ladderplaced = false;


var north = new Array();
north[0] = "north";
north[1] = "go north";
north[2] = "n";

var west = new Array();
west[0] = "west";
west[1] = "go west";
west[2] = "w";

var east = new Array();
east[0] = "east";
east[1] = "go east";
east[2] = "e";

var south = new Array();
south[0] = "south";
south[1] = "go south";
south[2] = "s";

var acquire = new Array();
acquire[0] = "take ";
acquire[1] = "pick up ";
acquire[2] = "grab ";
acquire[3] = "acquire ";


$(document).ready(function(){
	
	
	$("#console").fadeIn(3000);
	
	$("form").submit(function(){
		
		console.log($("#command_line").val());
	
		var input = $("#command_line").val();
		input.toLowerCase();
		
		if(input == "help"){
			$("#message_help").clone().insertBefore("#placeholder").fadeIn(1000);
		}
		else if(input == "current room"){
			$("<p>You are in the " + currentroom + ".</p>").hide().insertBefore("#placeholder").fadeIn(1000);
		}
	
// CELL CODE
		else if(currentroom == "cell"){ 
	
			if($.inArray(input, south) > -1){
				if(prisondoor == false){
					$("<p>The cell door is locked tight. The bars are too sturdy to force.</p>").hide().insertBefore("#placeholder").fadeIn(1000);
				}
				else {
					$("<p>You sneak through the door and find yourself in the hallway outside. To the East is the prison cafeteria. To the South is the prison's library. To the West is the exit.</p>").hide().insertBefore("#placeholder").fadeIn(1000);
					currentroom = "hall";
					starter = 4;
				}
			}
			else if(input == "take keys"){
				$("<p>Very carefully, as to not wake the guard, you reach through the bars and pick up the keys.</p>").hide().insertBefore("#placeholder").fadeIn(1000);
				keys = true;
			}
			else if(input == "open door"){
				if(keys == true){
					$("<p>After trying several keys, you here an audible click and the door swings open.</p>").hide().insertBefore("#placeholder").fadeIn(1000);
					prisondoor = true;
					starter = 100;
				}
				else{
					$("<p>The cell door is locked tight. The bars are too sturdy to force.</p>").hide().insertBefore("#placeholder").fadeIn(1000);
				}
			}
			else if(input == "look through window"){
				$("<p>The window is barred, grated, and very dirty. All you can tell is that it's night.</p>").hide().insertBefore("#placeholder").fadeIn(1000);
			}
			else{
				$("<p>I do not understand " + input + ".</p>").hide().insertBefore("#placeholder").fadeIn(1000);
			}
		}
// HALL CODE
		else if(currentroom == "hall"){
			if($.inArray(input, east) > -1){
				currentroom = "cafeteria";
				starter = 8;
				
				if(knife == false && beentocafeteria == false){
					$("<p>You enter the cafeteria. The place feels less familiar at night. It's very quiet, and is nearly clean. The smell of the same crummy food they've been feeding you for as long as you've been here lingers. On a nearby table you see a small knife. The door to the kitchens is locked from the inside; there's no way through. To the West is the hallway.</p>").hide().insertBefore("#placeholder").fadeIn(1000);
				}
				else if(knife == false){
					$("<p>You enter the cafeteria. A knife sits on a nearby table. To the West is the hallway.</p>").hide().insertBefore("#placeholder").fadeIn(1000);
				}
				else if(knife == true){
					starter = 107;
					$("<p>You enter the cafeteria. There isn't much of interest here. To the West is the hallway.</p>").hide().insertBefore("#placeholder").fadeIn(1000);
				}
				beentocafeteria = true;
			}
			else if($.inArray(input, south) > -1){
			    if(ladder == false){
					currentroom = "library";
					starter = 12;
					$("<p>You enter the library. The room contains shelves upon shelves of books, many of which you've already read. There is a ladder against one of the taller shelves. To the North is the hallway.</p>").hide().insertBefore("#placeholder").fadeIn(1000);
				}
			    else if(ladder == true){
					currentroom = "library";
					starter = 16;
					$("<p>You enter the library. The room contains shelves upon shelves of books, many of which you've already read. There is a ladder against one of the taller shelves. To the North is the hallway.</p>").hide().insertBefore("#placeholder").fadeIn(1000);
				}
			}
			else if($.inArray(input, west) > -1){
				if(ladderplaced == true){
					currentroom = "west yard";
					starter = 30;
					$("<p>You climb the ladder up to the window and carefully drop out. The window is too high to reach from the outside, but you wouldn't want to go back anyway.</p>").hide().insertBefore("#placeholder").fadeIn(1000);
					$("<p>Congratulations, you're a free man!</p>").hide().insertBefore("#placeholder").fadeIn(1000);
				}
				else{
					$("<p>The doors to the yard are locked tight, and none of the keys you stole from the guard seem to work. Just above the door and out of reach is a small window that is ajar.</p>").hide().insertBefore("#placeholder").fadeIn(1000);
				}
			}
			else if(input == "place ladder"){
				if(ladder == true){
					ladderplaced = true;
					starter = 144;
					$("<p>You lean the ladder against the wall. It should be possible to reach the window now.</p>").hide().insertBefore("#placeholder").fadeIn(1000);
				}
			}
			else{
				$("<p>I do not understand " + input + ".</p>").hide().insertBefore("#placeholder").fadeIn(1000);
			}
		}
// CAFETERIA CODE
		else if(currentroom == "cafeteria"){
			if(input == "take knife"){
				$("<p>You take the knife. The blade is very short and fairly dull. It is clearly no good for fighting, but it may come in handy anyway.</p>").hide().insertBefore("#placeholder").fadeIn(1000);
				knife = true;
				starter = 107;
			}
			else if($.inArray(input, west) > -1){
				if(ladderplaced == false){
				currentroom = "hall";
				starter = 4;
				$("<p>You return to the hallway. To the South is the library, to the East is the exit, and to the South is the library.</p>").hide().insertBefore("#placeholder").fadeIn(1000);
				}
				else if(ladderplaced == true){
					currentroom = "hall";
					starter = 144;
					$("<p>You return to the hallway. To the South is the library, to the East is the exit, and to the South is the library.</p>").hide().insertBefore("#placeholder").fadeIn(1000);
				}
			}
			else{
			$("<p>I do not understand " + input + ".</p>").hide().insertBefore("#placeholder").fadeIn(1000);
			}
		}
// LIBRARY CODE
		else if(currentroom == "library"){
			if(input == "take ladder"){
				if(ladderfree == true){
					ladder = true;
					starter = 16;
					$("<p>You take the ladder. It's not as heavy as you had expected.</p>").hide().insertBefore("#placeholder").fadeIn(1000);
				}
				else {
					$("<p>A small length of rope binds the ladder to it's spot.</p>").hide().insertBefore("#placeholder").fadeIn(1000);
				}
			}
			else if(input == "cut rope"){
				if(knife == true){
					ladderfree = true;
					$("<p>After a bit of work, you manage to cut the rope with your knife and free the ladder. The lengths are too short to be useful for anything.</p>").hide().insertBefore("#placeholder").fadeIn(1000);
				}
			}
			else if($.inArray(input, north) > -1){
				currentroom = "hall";
				starter = 4;
				$("<p>You return to the hallway. To the East is the cafeteria. To the West is the exit. To the South is the library.</p>").hide().insertBefore("#placeholder").fadeIn(1000);
			}	
			else{
				$("<p>I do not understand " + input + ".</p>").hide().insertBefore("#placeholder").fadeIn(1000);
			}
		}
// WEST YARD TBA


		
		$("#command_line").val("");
	});
});

