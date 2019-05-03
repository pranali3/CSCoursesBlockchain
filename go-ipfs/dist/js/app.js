 var courtseInstance;
 var loader = $("#loader");
 var content = $("#content");
 var no_content = $('#no_content');
 var courseinput = $("#inputrubric");
 var accountinfo = $("#accountinfo");
 var add_course = $("#add_course");

App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider("http://rinkeby.infura.io/v3/83764326139348a28efa51e1297031d0");
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Course.json", function(course) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Course = TruffleContract(course);
      // Connect provider to interact with contract
      App.contracts.Course.setProvider(App.web3Provider);

      return App.render();
    });
  },

  render: function() {
   /*  var courtseInstance;
    var loader = $("#loader");
    var content = $("#content");
	var courseinput = $("#inputrubric") */
	
    loader.show();
    content.hide();
	courseinput.hide();
	accountinfo.show();
	add_course.hide();

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
		//document.getElementById("Rubric").value=account;
        $("#accountAddress").html("Your Account: " + account);
		
		//document.getElementById("Rubric").value=account;
      }
	  if(account!=null){
	  loader.hide();
	  courseinput.show();
	  accountinfo.show();
	  add_course.show();
	  }
    });
	  //document.getElementById("Rubric").value=account
	  //document.getElementById("Name").innerHTML=account.toString();
	 
  },
  

  getResults: function() {
    var flag=0;
	  var Tablebody = document.getElementById("courseResults");
	  Tablebody.innerHTML = ""
	  // Load contract data
	  App.contracts.Course.deployed().then(function(instance) {
		courtseInstance = instance;
		return courtseInstance.no_courses();
		}).then(function(no_courses) {
			var courseResults = $("#courseResults");
			courseResults.empty();
			var x = document.getElementById("rubricinput").value;
			document.getElementById("rubricinput").value="";
			content.hide();
      for (var i = 0; i<no_courses; i++) {
        courtseInstance.courses(i).then(function(course) {
          var rubric = course[0];
          var name = course[1];
          var instructor = course[2];
		  var venue = course[3];
		  var capacity = course[4];
          // Render candidate Result
		  if(rubric==x){
          var courseTemplate = "<tr><th>" + rubric + "</th><td>" + name + "</td><td>" + instructor + "</td><td>" + venue + "</td><td>" + capacity + "</td></tr>"
          courseResults.append(courseTemplate);
          flag = 1;
		      content.show();
          no_content.hide();
		  }

        });
      }
    if(flag == 0){
      no_content.show();
    }

	  loader.hide();
	  courseinput.show();
	  accountinfo.show(); 
    }).catch(function(error) {
      console.warn(error);
    });
  },
  
   /* addadmin: function() {
    var addr = document.getElementById("addressinput").value;
	
	App.contracts.Course.deployed().then(function(instance) {
	document.getElementById("addressinput").value="";
      return instance.addnewadmin(addr);
	}).then(function(result) {
      loader.hide();
      content.hide();
	  add_course.reload();
	  courseinput.reload();
	  accountinfo.show();
    }).catch(function(err) {
      console.error(err);
    });
  }, */
  
 /*  removeadmin: function() {
    var addr = document.getElementById("addressinput").value;
	
	App.contracts.Course.deployed().then(function(instance) {
	document.getElementById("addressinput").value="";
      return instance.remadmin(addr);
	  
	}).then(function(result) {
      loader.hide();
      content.hide();
	  add_course.reload();
	  courseinput.reload();
	  accountinfo.show();
    }).catch(function(err) {
      console.error(err);
    });
  } */
  
  
  addCourse: function() {
    no_content.hide()
    var rubric1 = document.getElementById("Rubric").value;
    if (typeof(rubric1) == 'undefined' || rubric1 == null || rubric1==''){
      alert('Not enough Information');
      throw 'No rubric';

    }
    var name1 = document.getElementById("Name").value;
    if (typeof(name1) == 'undefined' || name1 == null || name1==''){
      alert('Not enough Information');
      throw 'No Rubric'

    }
    var instructor1 = document.getElementById("Inst").value;
    if (typeof(instructor1) == 'undefined' || instructor1 == null || instructor1==''){
      alert('Not enough Information');
      throw 'No rubric';
    }    
	//var instructor1 = $('#Inst').val();
    var venue1 = document.getElementById("Venue").value;
    if (typeof(venue1) == 'undefined' || venue1 == null || venue1==''){
      alert('Not enough Information');
      throw 'No rubric';
    }
    var capacity1 = document.getElementById("Capacity").value;
    if (typeof(capacity1) == 'undefined' || capacity1 == null || capacity1==''){
      alert('Not enough Information');
      throw 'No rubric';
    }
	
	App.contracts.Course.deployed().then(function(instance) {
	document.getElementById("Rubric").value="";
    document.getElementById("Name").value="";
    document.getElementById("Inst").value="";    
    document.getElementById("Venue").value="";
    document.getElementById("Capacity").value="";
      return instance.addCourse(rubric1,name1,instructor1,venue1,capacity1);
	  
	}).then(function(result) {
		
	
      loader.hide();
      content.hide();
	  add_course.reload();
	  courseinput.reload();
	  accountinfo.show();
    }).catch(function(err) {
        if(err.toString().indexOf("Course already exists!!") != -1) {
          alert("Course already exists!!!");
          no_content.hide();
      }
      else if (err.message.includes('No rubric')){
          alert("No rubric!!!");
          no_content.hide();
      }

      console.error(err);
    });
  }
};

/* ==parseInt(document.getElementById("rubricinput").innerHTML)
 */

$(function() {
  $(window).load(function() {
    App.init();
  });
});