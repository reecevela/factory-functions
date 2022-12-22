/**
 * Practice using Inheritance with Factory Functions
 * 
 * The Employee is the main class, and all the other jobs
 * inherit the base methods and have their own special-
 * izations.
 * 
 * Reece Vela 12/22/22
**/

// This "class" (factory function) is missing a work method, but it's children will each have their own
// Here, the defalt pay rate is set to 20 for all employees
const Employee = (name, business, payRate = 20) => {
    // Sets the default value to 40, also uses two '$' so that one shows up in the output
    const payHours = (hours = 40) => console.log(`${name} earned $${payRate * hours} by working ${hours} hours`);
    const goToWork = () => console.log(`${name} is driving to ${business}`);
    const goHome = () => console.log(`${name} is driving home`);
    return {payHours, goToWork, goHome}; // leaves internal variables encapsulated
}

const Developer = (name, business, payRate) => {
    // inheritance in action!
    const {payHours, goToWork, goHome} = Employee(name, business, payRate);
    // additional method, personalized to the job role
    const work = () => console.log(`${name} is refactoring some code!`);
    // returns it's extra method (work)
    return {payHours, goToWork, work, goHome};
}

// notice that the payRate is being overwritten in the default parameters -
// it'll create an Employee with payRate of 35 if nothing is passed to it
// even though Employee has it's own payRate default parameter
const Salesperson = (name, business, payRate = 35) => {
    const {payHours, goToWork, goHome} = Employee(name, business, payRate);
    const work = () => console.log(`${name} is making a sales pitch!`);
    return {payHours, goToWork, work, goHome};
}

const Manager = (name, business, payRate = 25) => {
    const {payHours, goToWork, goHome} = Employee(name, business, payRate);
    // bonus function! Underlings is encapsulated and inaccessible to other functions
    const underlings = ['Harry', 'Mallory', 'Jim', 'Brenda', 'Tim'];
    // Manager gets their own internal function to pick who they train
    function randPerson(list) { 
        return list[Math.floor((Math.random() * list.length))];
    } 
    // here it is being called!
    const work = () => console.log(`${name} is teaching ${randPerson(underlings)} new stuff!`);
    return {payHours, goToWork, work, goHome};
}

const jared = Developer('Jared', 'SkyNet'); // payRate of 20: Not set by Developer function, but then set by Employee function
const max = Salesperson('Max', 'Soylent Green', '40');
const shanna = Manager('Liz', 'WHS'); // Set to 35, by the Manager factory function

jared.goToWork();
max.goToWork();
shanna.goToWork();

jared.work();
max.work();
shanna.work();

jared.payHours(35);
max.payHours() // uses default parameter of 40 in the Employee.payHours() method
shanna.payHours(50);

jared.goHome();
max.goHome();
shanna.goHome();
