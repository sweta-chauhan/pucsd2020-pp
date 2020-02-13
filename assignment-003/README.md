## Logger Module In C

#### About 

* This module is written in order to support logger library in C.

* This is Singleton Pattern.

* This library supports following log levels
	* DEBUG
	* WARN
	* ERROR
	* INFO
	* FATAL

* Directory Structure 
	* include
		* logger.h
	* src
		* logger.c
	* tests
		* function
		* module
	* main.c
	* Makefile

* In `tests folder there are two folders
	* `function` : This folder contains all function wise test cases.
		1. init_func.c
		2. setup_logger.c
		3. log_func.c 
		  
	* `module` : This folder contains module testing.
 		1. Singleton Pattern Support for logger module


* In order to run unit testing :-
	* `./unittest.sh`

#### How to run

* `Clone this repository`
	1. `For https`
		`git clone https://github.com/sweta-chauhan/pucsd2020-pp.git`
	2. `For SSH`
		`git clone git@github.com:sweta-chauhan/pucsd2020-pp.git`
* To compile
	1. First go to cloned dir and then go to dir named `assignment-003`
	
	2. make
	
* To run
	1. ./logger
	
#### How to use this lib

* Available APIs
	1. ```setup_logger((logger**),char *filename,log_level)```
	 
	2. ```logger_((logger*),char *message,log_level)```

* Example :-
	
	```
	logger *log_;
	char *filename="debug.log";
	log_level level=DEBUG;
	setup_logger(&log_,filename,level);
	if(log_!=NULL)
		{
			logger_(log_,"Started",DEBUG);
			logger_(log_,"Info check",INFO);
			logger_(log_,"Warning check",WARN);
			logger_(log_,"Error check",ERROR);
			logger_(log_,"Fatal check",FATAL);
			fclose(log_->fp);
			free_logger();
		}
	```

   
 
##### Author 
-----
* Name : Sweta Kumari [1/02/2020]
* Profession : Student
