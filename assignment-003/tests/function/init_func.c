#include"../../include/logger.h"
#include<stdio.h>

int main(void)
{
	logger *log;
	if(init(&log))
	{
		return 0;
	}
	return -1;
}
