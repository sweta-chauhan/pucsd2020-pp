#include"../../include/logger.h"
#include<stdio.h>

int main(void)
{
	logger *log;
	char* filename="demo.log";
	log_level level=DEBUG;
	setup_logger(&log,filename,level);
	if(log!=NULL)
	{
		printf("logger:info\nfilename: %s level: %d\n",log->filename,log->level);
		fclose(log->fp);
		remove(log->filename);
		return 0;
	}
	return -1;
}
