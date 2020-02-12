#include"../../include/logger.h"
#include<stdio.h>


int main(void)
{
	logger *log_[5];
	char filename[][15]={"debug.log","warn.log","info.log","error.log","fatal.log"};
	log_level level[6]={DEBUG,WARN,INFO,ERROR,FATAL};
	for (int i = 0 ; i<5 ; i++)
	{
		setup_logger(&log_[i],filename[i],level[i]);
		
		if(log_[i]!=NULL)
		{
			logger_(log_[i],"Started",DEBUG);
			logger_(log_[i],"Info check",INFO);
			logger_(log_[i],"Warning check",WARN);
			logger_(log_[i],"Error check",ERROR);
			logger_(log_[i],"Fatal check",FATAL);
			fclose(log_[i]->fp);
			free_logger();
			remove(log_[i]->filename);
		}
		else
			return -1;
	}
	return 0;
}
