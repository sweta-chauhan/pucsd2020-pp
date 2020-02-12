#include"../../include/logger.h"
#include<stdio.h>


int main(void)
{
	logger *log_;
	char filename[][15]={"debug.log","warn.log","info.log","error.log","fatal.log"};
	log_level level[6]={DEBUG,WARN,INFO,ERROR,FATAL};
	for (int i = 0 ; i<5 ; i++)
	{
		setup_logger(&log_,filename[i],level[i]);
		if(log_!=NULL)
		{
			logger_(log_,"Started",DEBUG);
			logger_(log_,"Info check",INFO);
			logger_(log_,"Warning check",WARN);
			logger_(log_,"Error check",ERROR);
			logger_(log_,"Fatal check",FATAL);
			fclose(log_->fp);
			remove(log_->filename);
		}
		else
			return -1;
	}
	return 0;
}
