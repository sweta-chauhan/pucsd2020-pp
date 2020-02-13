#include"../../include/processor.h"
#include<stdio.h>
#include<string.h>

void print_valid(exp_error err)
{
	if(err == VALID)
	{
		printf("a valid expression\n");
		return;
	}
	printf("not a valid expression\n");
}
int main(void)
{
	char tests[][20]={"123a","1234+234","123.45+65","123+56a","12/23+(23*23)","23/34/34%23","23/+34","23-"};
	for(int i = 0 ;i<8; i++)
	{
		exp_error err;
		err = is_valid(tests[i]);
		printf("%s >> is ",tests[i]);
		print_valid(err);
	}
	return 0;
}
