/*
  - The application doesn't handle negative inputs.
  - The end time is always expected to be greater than the start time.
*/

// For existing elements in the page
updateElements();
makeDeletable();

/*
  ON CLICK EVENTS
*/

// Pop-up menu to add class
$(".addNew").on("click", function() {
  $(".popUp").fadeToggle();
});

// Clicking to add class
$(".addButton").on("click", function() {
  // Retrieve input values
  var title = $(".nameInput").val();
  var checkboxValue = [];

  // Retrieve values from selected checkboxes and push them into an array
  $.each($("input:checked"), function() {
    checkboxValue.push($(this).val());
  });

  var fromTimeHour = $("#fromTimeHour").val();
  var fromTimeHalf = $("#fromTimeHalf").val();
  var toTimeHour = $("#toTimeHour").val();
  var toTimeHalf = $("#toTimeHalf").val();

  var color = $(this).css('backgroundColor');

  // Validate inputs

  if (title !== "") {
    // Create new elements
    for (var i = 0; i < checkboxValue.length; i++) {
      createNew(title, fromTimeHour, fromTimeHalf, toTimeHour, toTimeHalf, Number(checkboxValue[i]), color);
    }

    makeDeletable();
    updateElements();
    $(".nameInput").val("");
    $(".popUp").fadeToggle();
  } else {
    // Shake textbox if title is empty
    // Toggle
    shake();
    // Untoggle after the animation is done
    setTimeout(shake, 310);
  }
});

// Clicking colors
$(".color").on("click", function() {
  let myColor = $(this).css('backgroundColor');
  $(".addButton").css('backgroundColor', myColor);
});

// Function to shake the input box
function shake() {
  $(".nameInput").toggleClass("shake");
}

// Function to create a new element
function createNew(title, fromTimeHour, fromTimeHalf, toTimeHour, toTimeHalf, weekDay, color) {
  var unit = 15;
  // Create a new element using title + weekday as ID
  var newElement = '<div id=' + title + weekDay + ' class="myClass ui-draggable ui-draggable-handle ui-resizable"><p class="title">' + title + '<i class="fa fa-trash-o" aria-hidden="true"></i></p><div class="ui-resizable-handle ui-resizable-s" style="z-index:90;"></div></div>';

  // Insert the new element
  $(newElement).insertBefore(".tableTimes");

  // Set the position and style of the new element
  $("#" + title + weekDay).css({
    "left": weekDay,
    "top": getStartHour(fromTimeHour, fromTimeHalf),
    "height": getToHour(fromTimeHour, fromTimeHalf, toTimeHour, toTimeHalf),
    "background-color": "" + color,
  });

  updateElements();
}

// Function to make elements resizable
function makeResizable() {
  $(".myClass").resizable({
    handles: 's',
    grid: [0, 15]
  });
}

// Function to make elements draggable
function makeDraggable() {
  $(".myClass").draggable({
    containment: 'parent',
    grid: [100, 15]
  });
  console.log("draggable");
}

// Function to update elements
function updateElements() {
  makeDraggable();
  makeResizable();
}

// Function to make elements deletable
function makeDeletable() {
  $(".fa-trash-o").on("click", function() {
    $(this).parent().parent().remove();
  });
}

/*
  NOTE: Need to make sure inputs are valid on functions below and test more
  - FROM needs to be smaller than TO
  - Create a function to validate input
*/

// Function to correct the hour
function correctHour(toHour) {
  var result;

  if (toHour < 7) {
    result = 12 + Number(toHour);
  } else {
    result = toHour;
  }
  return result;
}

// Function to calculate the total hours
function getToHour(fromHour, fromHalf, toHour, toHalf) {
  var compensation;

  if (fromHalf == 30 && toHalf == 30) {
    compensation = 0;
  } else if (fromHalf == 30) {
    compensation = -15;
  } else if (toHalf == 30) {
    compensation = 15;
  } else {
    compensation = 0;
  }

  var correctedToHour = correctHour(toHour);
  var correctedFromHour = correctHour(fromHour);
  return ((correctedToHour - correctedFromHour) * 30) + compensation;
}

// Function to get the starting hour
function getStartHour(fromHour, fromHalf) {
  let base = 110; // that gives 7am
  var unitHalf;

  if (fromHalf >= 30) {
    unitHalf = 15; // half an hour
  } else {
    unitHalf = 0;
  }

  if (fromHour >= 7) {
    return base + ((fromHour - 7) * 30) + unitHalf;
  } else {
    // 260 is the base for anything after 12
    return 260 + (fromHour * 30) + unitHalf;
  }
}

// Function to validate input
function validateInput(number1, number2) {
  // Title can't be an empty string
  // FROM hour must be less than TO hour
  // Array of weekdays is not empty
  // Color with red, green, or blue lower than 130 makes the text color white
}
