pragma solidity ^0.5.0;

// Contract Definition
contract Course {
	// Struct data structure to store the course information
	struct Course_model {
		uint rubric;
		string course_name;
		string instructor;
		string venue ;
		string capacity;
	}
	// mapping data structure to index multiple courses added to the blockchain
	mapping (uint => Course_model) public courses;
	
	//registered users
	address[] public arr;

	// number of courses added
	uint public no_courses;

	//array used to check for duplicate courses
	uint[] public rubric_list;


	// address owner;
	
	//to display message that the contract is deployed after constrctor is initialized
	event updateStatus(string _msg);
	
	//Constructor
	constructor () public {
		emit updateStatus('Contract deployed!');
		no_courses=0;
		// Push all the addresses which should be given access to add_course to the address list array
		arr.push(0xae2BE87D58FFb6188239C2ebd19E88CFB78EeD84);
		arr.push(0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c);
		arr.push(0x720Cc877b59356179770369c3791cE15ec5cCB9c);
 		arr.push(0x9C57BFEEb60B875d393dB23da251C3D48a93102f);
	}
		//converts the caller's address to string
	// 	function toString1(address x) internal pure returns (string memory) {
	//         bytes memory b = new bytes(20);
	//         for (uint i = 0; i < 20; i++)
	//             b[i] = byte(uint8(uint(x) / (2*(8(19 - i)))));
	//         return string(b);
	//     }
		
		//comapres strings (addresses)
	// 	function stringsEqual(address _a, string memory _b)  internal pure returns (bool) {
	// 	bytes memory a = bytes(_a);	
	// 	bytes memory b = bytes(_b);
	// 	uint num1 = a.length;
	// 	uint num2 = b.length;
	// 	if (a.length != b.length)
	// 		return false;
	// 	// @todo unroll this loop
	// 	for (uint i = 0; i < a.length; i ++)
	// 		if (a[i] != b[i])
	// 			return false;
	// 	return true;
// 	}
	
	// Function to check if the course being added is duplicate or not
	function isOkay(uint _rub) public view returns(bool) {
		for (uint i=0; i<rubric_list.length; i++)
			{
				if(rubric_list[i]==_rub)
				{
				    return false;
				}
			}
			return true;
		}

	
	//checks that only registered users can call the addCourse function
	modifier ifIssuer()
	{
		for (uint i=0; i<arr.length; i++)
			{
				// string memory senderString = toString1(msg.sender);
				// address user = arr[i];
				// if(stringsEqual(user, senderString))
				// 	_;
				if(arr[i]==msg.sender)
				{
				    _;
				}
				
			}
	}

	//Function to add courses
	function addCourse (uint _rubric, string memory _course_name , string memory _instructor, string memory _venue, string memory _capacity) public 
	ifIssuer{

		// to check is duplicate course is being added
		if(!isOkay(_rubric))
		{

            //courseAdd.Visible = true;
            // Throw exception to when a duplicate course is added
			revert('Course already exists!!');

		}
		else
		{
		
		// set msg.sender to run this fuction by specific users
		rubric_list.push(_rubric); 	//add rubric to the rubric_list array
		courses[no_courses] = Course_model(_rubric,_course_name,_instructor,_venue,_capacity);	// append struct to the mapping function
		no_courses=no_courses+1;	//append the the total number of courses added variable
	}
	}
	
}
