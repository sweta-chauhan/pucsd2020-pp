#include"include/logger.h"
#include<stdio.h>


int main(void)
{
	logger *log_;
	char *filename="debug.log";
	log_level level=DEBUG;
	setup_logger(&log_,filename,level);
	if(log_!=NULL)
		{
			logger_(log_,"Started",DEBUG);
			logger_(log_,"Info check",INFO);
			logger_(log_,"Warning check",WARN);
			logger_(log_,"Error check",ERROR);
			logger_(log_,"Fatal check",FATAL);
			fclose(log_->fp);
			free_logger();
		}
		else
			return -1;
	return 0;
}
