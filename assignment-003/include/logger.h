#ifndef __logger_h_
#define __logger_h_
#include<stdio.h>

typedef enum{FAILURE=-1,SUCCESS=0}l_error;
typedef enum{DEBUG=0,WARN,INFO,ERROR,FATAL,DEFAULT}log_level;

typedef struct{
	FILE *fp;
	char *filename;
	log_level level;
	}logger;


l_error init(logger**);
void setup_logger(logger**,char*,log_level);
const char* getlevel(log_level);
void logger_(logger*,char*,log_level);

void debug(logger*,char*,log_level);
void warn(logger*,char*,log_level);
void info(logger*,char*,log_level);
void error(logger*,char*,log_level);
void fatal(logger*,char*,log_level);

/*Debugging purpose*/
l_error free_logger();
#endif
