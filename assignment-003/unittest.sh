#!/bin/bash

e_succ="Compilation_Done"
e_fail="Compilation_Failure."
n_exe="No executable found."
t_succ="Unittesing_Done."
f_fail="Unsuccessfull_Unittest."
test_command()
{
	if [ $1 -eq 0 ];then
		echo $2
	else
		echo  $3
	fi	
}

test_run()
{
	if [ $1 -eq 0 ];then
		eval "$2"
	else
		echo $3
	fi
}

compile_and_execute()
{
	gcc $1 $2
	test_command $? $e_succ $e_fail
	test_run $? ./a.out $e_fail
	rm a.out	
}

clear
echo "*****************************************************************************"
echo "*                      Unit testing is on process ...                       *"
echo "*****************************************************************************"

echo "Function Wise test started."

compile_all_tests()
{
compile_and_execute tests/function/init_func.c src/logger.c
compile_and_execute tests/function/setup_logger.c src/logger.c
compile_and_execute tests/function/log_func.c src/logger.c
#compile_and_execute tests/function/warn.c src/logger.c
#compile_and_execute tests/function/error.c src/logger.c
#compile_and_execute tests/function/info.c src/logger.c
#compile_and_execute tests/function/fatal.c src/logger.c
}
compile_all_tests
test_command $? $t_succ $f_succ
