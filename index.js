//Initial References
/* These lines of code are initializing variables and selecting elements from the HTML document using
DOM manipulation. */
let timerRef = document.querySelector(".timer-display");
const hourInput = document.getElementById("hourInput");
const minuteInput = document.getElementById("minuteInput");
const activeAlarms = document.querySelector(".activeAlarms");
const setAlarm = document.getElementById("set");
let alarmsArray = [];
/* The above code is creating a new Audio object called "alarmSound" and assigning it the audio file
located at "./alarm.mp3". This code is likely part of a larger program that uses the "alarmSound"
object to play the audio file as an alarm or notification sound. */
let alarmSound = new Audio("./alarm.mp3");

/* The above code is declaring and initializing three variables: `initialHour` with a value of 0,
`initialMinute` with a value of 0, and `alarmIndex` with a value of 0. These variables are likely
going to be used in a program that involves setting and managing alarms. */
let initialHour = 0,
  initialMinute = 0,
  alarmIndex = 0;

//Append zeroes for single digit
/**
 * The function appends a zero to a value if it is less than 10.
 * @param value - The value parameter is a number that we want to check if it is less than 10. If it is
 * less than 10, we want to append a "0" in front of it.
 */
const appendZero = (value) => (value < 10 ? "0" + value : value);

//Search for value in object
/**
 * The function searches for an object in an array of objects based on a given parameter and value.
 * @param parameter - The name of the property/key in the objects within the `alarmsArray` that we want
 * to search for a specific value.
 * @param value - The value to search for in the `alarmsArray` for a specific `parameter`.
 * @returns The function `searchObject` returns an array with three elements:
 */
const searchObject = (parameter, value) => {
  let alarmObject,
    objIndex,
    exists = false;
  alarmsArray.forEach((alarm, index) => {
    if (alarm[parameter] == value) {
      exists = true;
      alarmObject = alarm;
      objIndex = index;
      return false;
    }
  });
  return [exists, alarmObject, objIndex];
};

//Display Time
/* The `displayTimer()` function is getting the current time using the `Date()` object and then
formatting it to display the hours, minutes, and seconds with leading zeroes using the
`appendZero()` function. It is also checking if any of the alarms in the `alarmsArray` should be
activated based on their set time and playing the alarm sound if necessary. */
function displayTimer() {
  let date = new Date();
  let [hours, minutes, seconds] = [
    appendZero(date.getHours()),
    appendZero(date.getMinutes()),
    appendZero(date.getSeconds()),
  ];

  //Display time
/* `timerRef.innerHTML = `::`;` is setting the innerHTML of the element
with class "timer-display" to a string that displays the current time in the format of
"hours:minutes:seconds". The values for hours, minutes, and seconds are obtained using the
`appendZero()` function to add leading zeroes if necessary. */
  timerRef.innerHTML = `${hours}:${minutes}:${seconds}`;

  //Alarm
 /* The code is iterating through each object in the `alarmsArray` using the `forEach()` method. For
 each object, it checks if the `isActive` property is `true`. If it is, it compares the `alarmHour`
 and `alarmMinute` properties of the object with the current `hours` and `minutes` obtained from the
 `displayTimer()` function. If they match, it plays the `alarmSound` and sets the `loop` property to
 `true`. This code is responsible for checking if any of the alarms in the `alarmsArray` should be
 activated based on their set time and playing the alarm sound if necessary. */
  alarmsArray.forEach((alarm, index) => {
    if (alarm.isActive) {
      if (`${alarm.alarmHour}:${alarm.alarmMinute}` === `${hours}:${minutes}`) {
        alarmSound.play();
        alarmSound.loop = true;
      }
    }
  });
}

/**
 * The function checks if an input value is less than 10 and appends a zero if it is.
 * @param inputValue - The parameter `inputValue` is a value that is expected to be a number or a
 * string that can be converted to a number using `parseInt()`. The function `inputCheck()` checks if
 * the value is less than 10 and if so, appends a zero to it using the `append
 * @returns The function `inputCheck` returns the `inputValue` after converting it to an integer and
 * appending a zero to the beginning if it is less than 10.
 */
const inputCheck = (inputValue) => {
  inputValue = parseInt(inputValue);
  if (inputValue < 10) {
    inputValue = appendZero(inputValue);
  }
  return inputValue;
};

/* This code is adding an event listener to the `hourInput` element that listens for any input changes.
When the input changes, the `inputCheck()` function is called with the current value of the
`hourInput` element as an argument. The `inputCheck()` function checks if the value is less than 10
and if so, appends a zero to the beginning of the value. The updated value is then set as the new
value of the `hourInput` element. This ensures that the value of the `hourInput` element always has
two digits, with a leading zero if necessary. */
hourInput.addEventListener("input", () => {
  hourInput.value = inputCheck(hourInput.value);
});

/* This code is adding an event listener to the `minuteInput` element that listens for any input
changes. When the input changes, the `inputCheck()` function is called with the current value of the
`minuteInput` element as an argument. The `inputCheck()` function checks if the value is less than
10 and if so, appends a zero to the beginning of the value. The updated value is then set as the new
value of the `minuteInput` element. This ensures that the value of the `minuteInput` element always
has two digits, with a leading zero if necessary. */
minuteInput.addEventListener("input", () => {
  minuteInput.value = inputCheck(minuteInput.value);
});

//Create alarm div

/**
 * The function creates an HTML div element for an alarm object with specified hour and minute values.
 * @param alarmObj - The `alarmObj` parameter is an object that contains information about the alarm to
 * be created. It should have the following properties:
 */
const createAlarm = (alarmObj) => {
  //Keys from object
  const { id, alarmHour, alarmMinute } = alarmObj;
  //Alarm div
  let alarmDiv = document.createElement("div");
  alarmDiv.classList.add("alarm");
  alarmDiv.setAttribute("data-id", id);
  alarmDiv.innerHTML = `<span>${alarmHour}: ${alarmMinute}</span>`;

  //checkbox
/* This code block is creating a new checkbox input element for each alarm that is created using the
`createAlarm()` function. It is also adding an event listener to the checkbox element that listens
for a click event. When the checkbox is clicked, the event listener checks if the checkbox is
checked or unchecked. If it is checked, it calls the `startAlarm()` function with the event object
as an argument. If it is unchecked, it calls the `stopAlarm()` function with the event object as an
argument. These functions are responsible for starting and stopping the alarm sound and updating the
`isActive` property of the corresponding alarm object in the `alarmsArray`. */
  let checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.addEventListener("click", (e) => {
    if (e.target.checked) {
      startAlarm(e);
    } else {
      stopAlarm(e);
    }
  });
/* This code block is creating a new alarm element in the HTML document. It creates a new `div` element
with class "alarm" and sets its `data-id` attribute to the unique identifier of the alarm object. It
then creates a checkbox input element and adds an event listener to it that calls the `startAlarm()`
function when it is checked and the `stopAlarm()` function when it is unchecked. It also creates a
delete button element with an event listener that calls the `deleteAlarm()` function when it is
clicked. Finally, it appends the checkbox and delete button elements to the alarm `div` and appends
the alarm `div` to the `activeAlarms` element in the HTML document. */
  alarmDiv.appendChild(checkbox);
  //Delete button
  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
  deleteButton.classList.add("deleteButton");
  deleteButton.addEventListener("click", (e) => deleteAlarm(e));
  alarmDiv.appendChild(deleteButton);
  activeAlarms.appendChild(alarmDiv);
};

//Set Alarm
setAlarm.addEventListener("click", () => {
  alarmIndex += 1;

  //alarmObject
/* This code block is creating a new alarm object and adding it to the `alarmsArray`. The `alarmObj` is
an empty object that is being populated with properties such as `id`, `alarmHour`, `alarmMinute`,
and `isActive`. The `id` property is a unique identifier for the alarm and is created using the
`alarmIndex`, `hourInput.value`, and `minuteInput.value`. The `isActive` property is initially set
to `false`. The `alarmObj` is then added to the `alarmsArray` using the `push()` method. Finally,
the `createAlarm()` function is called with the `alarmObj` as an argument to create a new alarm
element in the HTML document. The values of the `hourInput` and `minuteInput` elements are then
reset to "00" using the `appendZero()` function. */
  let alarmObj = {};
  alarmObj.id = `${alarmIndex}_${hourInput.value}_${minuteInput.value}`;
  alarmObj.alarmHour = hourInput.value;
  alarmObj.alarmMinute = minuteInput.value;
  alarmObj.isActive = false;
  console.log(alarmObj);
  alarmsArray.push(alarmObj);
  createAlarm(alarmObj);
  hourInput.value = appendZero(initialHour);
  minuteInput.value = appendZero(initialMinute);
});

//Start Alarm
/**
 * The function sets the isActive property of an object in an array to true based on a search for a
 * specific ID.
 * @param e - The parameter `e` is an event object that is passed to the `startAlarm` function. It is
 * likely triggered by an event listener on a specific element, and contains information about the
 * event that occurred (such as the target element that was clicked).
 */
const startAlarm = (e) => {
  let searchId = e.target.parentElement.getAttribute("data-id");
  let [exists, obj, index] = searchObject("id", searchId);
  if (exists) {
    alarmsArray[index].isActive = true;
  }
};

//Stop alarm
/**
 * The function stops an alarm and sets its isActive property to false.
 * @param e - The parameter `e` is an event object that is passed to the `stopAlarm` function. It is
 * likely an event listener is attached to an element and when that element is clicked, the event
 * object is passed to the `stopAlarm` function. The function then uses the event object to access
 */
const stopAlarm = (e) => {
  let searchId = e.target.parentElement.getAttribute("data-id");
  let [exists, obj, index] = searchObject("id", searchId);
  if (exists) {
    alarmsArray[index].isActive = false;
    alarmSound.pause();
  }
};

//delete alarm
/**
 * The function deletes an alarm from an array and removes its corresponding HTML element from the DOM.
 * @param e - The parameter `e` is an event object that is passed to the `deleteAlarm` function when it
 * is called. It represents the event that triggered the function, such as a click event on a delete
 * button.
 */
const deleteAlarm = (e) => {
  let searchId = e.target.parentElement.parentElement.getAttribute("data-id");
  let [exists, obj, index] = searchObject("id", searchId);
  if (exists) {
    e.target.parentElement.parentElement.remove();
    alarmsArray.splice(index, 1);
  }
};

/* The `window.onload` function is setting up the initial state of the application when the page loads.
It is setting the `setInterval()` function to call the `displayTimer()` function every second to
update the clock display. It is also initializing several variables (`initialHour`, `initialMinute`,
`alarmIndex`, and `alarmsArray`) to their default values and setting the values of the `hourInput`
and `minuteInput` elements to "00" using the `appendZero()` function. */
window.onload = () => {
  setInterval(displayTimer);
  initialHour = 0;
  initialMinute = 0;
  alarmIndex = 0;
  alarmsArray = [];
  hourInput.value = appendZero(initialHour);
  minuteInput.value = appendZero(initialMinute);
};