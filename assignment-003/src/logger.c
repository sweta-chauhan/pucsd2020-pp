#include "../include/logger.h"
#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<time.h>

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

const char* getlevel(log_level level)
{
	if(level==DEBUG)
	{
		return "DEBUG";
	}
	else
	 {
		if(level==WARN)
		{
			return "WARN";
		}
		else 
			{
				if(level==INFO)
				{
					return "INFO";
				}
				else 
				{
					if(level==ERROR)
					{	
					return "ERROR";
					}
					else if(level ==FATAL)
					{
					return "FATAL";
					}
			}
		}
	}
}

void logger_(logger *log,char *message,log_level level)
{
	if (log->level<= level)
	{
		switch(level)
		{
			case DEBUG :
						debug(log,message,level);
						break;
			case WARN :
					warn(log,message,level);
					break;
			case INFO :
					info(log,message,level);
					break;
			case ERROR :
					error(log,message,level);
					break;
			case  FATAL :
					fatal(log,message,level);
					  break;
			case DEFAULT :
					  break;
		}
	}
	return;
}

void debug(logger *log,char* message,log_level level)
{
	if(log->level<=level)
	{

	time_t start;
	struct tm* pt;
	start = time(NULL);
	pt = localtime(&start);
	char *time = asctime(pt);
	if (time[strlen(time)-1] == '\n') 
		time[strlen(time)-1] = '\0';
	fprintf(log->fp,"%s :%s :%s :%s\n",log->filename,getlevel(log->level),time,message);
	}
	return;
}

void warn(logger* log,char* message,log_level level)
{
	if(log->level<=level)
	{

	time_t start;
	struct tm* pt;
	start = time(NULL);
	pt = localtime(&start);
	char *time = asctime(pt);
	if (time[strlen(time)-1] == '\n') 
		time[strlen(time)-1] = '\0';
	fprintf(log->fp,"%s :%s :%s :%s\n",log->filename,getlevel(log->level),time,message);
	}
	return;
}

void info(logger *log,char* message,log_level level)
{
	if(log->level<=level)
	{

	time_t start;
	struct tm* pt;
	start = time(NULL);
	pt = localtime(&start);
	char *time = asctime(pt);
	if (time[strlen(time)-1] == '\n') 
		time[strlen(time)-1] = '\0';
	fprintf(log->fp,"%s :%s :%s :%s\n",log->filename,getlevel(level),time,message);
	}
	return;
}

void error(logger *log,char*message,log_level level)
{
	if(log->level<=level)
	{
	time_t start;
	struct tm* pt;
	start = time(NULL);
	pt = localtime(&start);
	char *time = asctime(pt);
	if (time[strlen(time)-1] == '\n') 
		time[strlen(time)-1] = '\0';
	fprintf(log->fp,"%s :%s :%s :%s\n",log->filename,getlevel(level),time,message);
	}
	return;
}

void fatal(logger *log,char *message,log_level level)
{
	if(log->level<=level)
	{

	time_t start;
	struct tm* pt;
	start = time(NULL);
	pt = localtime(&start);
	char *time = asctime(pt);
	if (time[strlen(time)-1] == '\n') 
		time[strlen(time)-1] = '\0';
	fprintf(log->fp,"%s :%s :%s :%s\n",log->filename,getlevel(level),time,message);
	}
	return;
}


