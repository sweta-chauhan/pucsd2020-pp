#include"../../include/processor.h"
#include<stdio.h>
#include<stdlib.h>
#include<stdbool.h>
#include<string.h>
void print_op(bool res)
{
	if (res)
	{
		printf("is operator \n");
		return;
	}
	printf("not operator \n");
}
int main(void)
{
	char *tests;
	int i;
	i = 0;
	tests = (char*)malloc(sizeof(char)*256);
	strcpy(tests,"1234567890-=qwertyuiop[]asdfghjkl;zxcvbnm,./ :{}+_)(*&^%$#@!~");
	while(tests[i])
	{
		bool res = check_op(tests[i]);
		printf("%c is ",tests[i]);
		print_op(res);
		i++;
	}
	return 0;
}
