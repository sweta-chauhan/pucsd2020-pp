#ifndef __logger_h_
#define __logger_h_
#include<stdio.h>
typedef enum{FAILURE=-1,SUCCESS=0}l_error;
typedef enum{DEBUG=0,WARN,INFO,ERROR,FATAL}log_level;

typedef struct{
	FILE *fp;
	char *filename;
	log_level level;
	}logger;


l_error init(logger**);
void setup_logger(logger**,char*,log_level);
void debug(logger*,char*);
void warn(logger*,char*);
void info(logger*,char*);
void error(logger*,char*);
void fatal(logger*,char*);

#endif
