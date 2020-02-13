#include"../../include/processor.h"
#include<stdio.h>
#include<stdlib.h>
#include<string.h>
void print_validity(exp_error err)
{
	if (err==VALID)
	{
		printf("Valid character \n");
		return;
	}
	printf("Not a valid characte \n");
	return;
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
		exp_error err = is_special_char(tests[i]);
		printf("%c is ",tests[i]);
		print_validity(err);
		i++;
	}
	return 0;
}
