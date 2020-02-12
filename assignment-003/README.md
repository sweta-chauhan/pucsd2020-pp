## Logger Module In C

#### About 

* This module is written in order to support logger library in C.

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

* In `tests folder there are two folders
	* `function` : This folder contains all function wise test cases.
		1. init_func.c
		2. setup_logger.c
		3. log_func.c 
		  
	* `module` : This folder contains module testing.
 		1. Singleton Pattern Support for logger module


* In order to run unit testing :-
	* `./unittest.sh`

* Author : Sweta Kumari [1/02/2020]
