#include"../../include/processor.h"
#include<stdio.h>
#include<stdlib.h>

int main(void)
{
	opr_stack *stack;
	
	if(init_opr_stack(&stack)==NOT_VALID)
	{
		return -1;
	}
	
	oper operator[]={ADD,SUB,MUL,DIV,MOD,LPAR,RPAR,INVALID_OP};
	for(int i = 0 ; i<8 ; i++)
	{	
		if(push_opr(&stack,operator[i])==F)
		{	
			return -2;
		}
	}
	for(int i = 0 ; i<8 ; i++)
	{
		printf("%d\n",top_opr(stack));
		pop_opr(&stack);
	}
	return 0;
}
