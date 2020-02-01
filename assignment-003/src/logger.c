#include "../include/logger.h"
#include<stdio.h>
#include<stdlib.h>
#include<string.h>

l_error init(logger **log)
{
	(*log) = (logger*)malloc(sizeof(log));
	
	if(*log)
	{
		
		return SUCCESS;
		
	}
	return FAILURE;
}

void setup_logger(logger** log,char* filename,log_level level)
{
	if(init(log)==SUCCESS)
	{
		int len;
		len = strlen(filename);
		(*log)->filename = (char*)malloc(sizeof(char)*len);
		strcpy((*log)->filename,filename);

		(*log)->fp = fopen(filename,"a+");
		(*log)->level = level;
	}
	else
		return;
}

