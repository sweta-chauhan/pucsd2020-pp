


#include"../../include/logger.h"
#include<stdio.h>

int main(void)
{
	logger *log,*log1;
	if(init(&log)==SUCCESS)
	{
		printf("One logger object is created ...\n");
	}
	if(init(&log1)==SUCCESS)
	{
		printf("Second logger object created ...\n");
		return 0;
	}

	else
		{
			printf("Second logger object couldn't created due to Singleton Pattern\n");
		}
	
	return -1;
}
