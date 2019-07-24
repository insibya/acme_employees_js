const employees = [
	{ id: 1, name: 'moe' },
	{ id: 2, name: 'larry', managerId: 1 },
	{ id: 4, name: 'shep', managerId: 2 },
	{ id: 3, name: 'curly', managerId: 1 },
	{ id: 5, name: 'groucho', managerId: 3 },
	{ id: 6, name: 'harpo', managerId: 5 },
	{ id: 8, name: 'shep Jr.', managerId: 4 },
	{ id: 99, name: 'lucy', managerId: 1 }
];

const spacer = (text) => {
	if (!text) {
		return console.log('');
	}
	const stars = new Array(5).fill('*').join('');
	console.log(`${stars} ${text} ${stars}`);
};

spacer('findEmployeeByName Moe');
// given a name and array of employees, return employee
console.log(findEmployeeByName('moe', employees)); //{ id: 1, name: 'moe' }
spacer('');

function findEmployeeByName(name, list) {
	for (let i = 0; i < list.length; i++) {
		if (list[i].name === name) {
			return list[i];
		}
	}
}

spacer('findManagerFor Shep');
//given an employee and a list of employees, return the employee who is the manager
console.log(findManagerFor(findEmployeeByName('shep Jr.', employees), employees)); //{ id: 4, name: 'shep', managerId: 2 }
spacer('');

function findManagerFor(nameObj, list) {
	for (let i = 0; i < list.length; i++) {
		if (list[i].id === nameObj.managerId) {
			return list[i];
		}
	}
}

spacer('findCoworkersFor Larry');
//given an employee and a list of employees, return the employees who report to the same manager
console.log(
	findCoworkersFor(findEmployeeByName('larry', employees), employees)
); /*
[ { id: 3, name: 'curly', managerId: 1 },
  { id: 99, name: 'lucy', managerId: 1 } ]
*/
spacer('');

function findCoworkersFor(nameObj, list) {
	const resultArr = [];
	for (let i = 0; i < list.length; i++) {
		if (list[i].managerId === nameObj.managerId && list[i] !== nameObj) {
			resultArr.push(list[i]);
		}
	}
	return resultArr;
}

spacer('findManagementChain for moe');
//given an employee and a list of employees, return a the management chain for that employee. The management chain starts from the employee with no manager with the passed in employees manager
console.log(findManagementChainForEmployee(findEmployeeByName('moe', employees), employees)); //[  ]
spacer('');

spacer('findManagementChain for shep Jr.');
console.log(
	findManagementChainForEmployee(findEmployeeByName('shep Jr.', employees), employees)
); /*
[ { id: 1, name: 'moe' },
  { id: 2, name: 'larry', managerId: 1 },
  { id: 4, name: 'shep', managerId: 2 }]
*/
spacer('');

function findManagementChainForEmployee(nameObj, list) {
	const resultArr = [];
	let currentManaged = nameObj;
	while (currentManaged.managerId) {
		for (let i = 0; i < list.length; i++) {
			if (list[i].id === currentManaged.managerId) {
				resultArr.unshift(list[i]);
				currentManaged = list[i];
			}
		}
	}
	return resultArr;
}
