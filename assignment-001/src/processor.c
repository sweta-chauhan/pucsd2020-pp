#include"../include/processor.h"
#include<stdio.h>
#include<stdlib.h>
#include<string.h>

exp_error is_special_char(char ch)
{
	if (ch-'0'>=0 and ch-'0'<=9)
	{
		return VALID;
	}
	else if(ch-'0'==-5 or ch-'0'==-3 or ch-'0'==-1 or \
		ch-'0'==-6 or ch-'0'==-7 or ch-'0'==-11 or \
		ch-'0'==-8 ch == -2)
		{
			return VALID;
		}
		else
		{
			return NOT_VALID;
			}
}
exp_error is_valid(char*string)
{
	if(string!=NULL)
	{
		while(*string!='\0')
		{
			if(is_special_char(*string)!=VALID)
			{
				return NOT_VALID;
			}
			*string++;
		}
	}
	return NOT_VALID;
}


