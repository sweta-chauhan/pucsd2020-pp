#include"../../include/processor.h"
#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<stdbool.h>

void print_num(opernd op)
{
	if(op.is_float)
 	{
 		printf(">>> %f \n",op.op.floating);
 	}
 	else
 	{
		printf(">>> %d \n",op.op.integer);
	
 	}
}


int main()
{
 char num[10];
 strcpy(num,"123");
 int *i;
 i = (int*)malloc(sizeof(int));
 *i = 0;
 opernd op;
 printf("Collecting integral value \n");
 op = collect_num(num,&i);
 print_num(op);
 strcpy(num,"123.456");
 *i=0;
 printf("Collecting floating value \n");
 op = collect_num(num,&i);
 print_num(op);
 return 0; 
 
 }
