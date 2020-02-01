#include<stdio.h>
#include"../include/add.h"
#include"../include/div.h"
#include"../include/sub.h"
#include"../include/mul.h"
#include"../include/mod.h"
#include<unistd.h>

int main(int argc,char *argv[])
{
	char op;
	int num1,num2;
	int opt;
	while((opt = getopt(argc,argv,"o:a:b:"))!=-1)
	{
		switch(opt)
		{
			case 'o':
				op = optarg[0];
				printf("Opt : %c\n",optarg[0]);
				break;
			case 'a':
				num1=atoi(optarg);
				printf("%d \n",num1);
				break;
			case 'b':
				num2=atoi(optarg);
				printf("%d \n",num2);
				break;
			default:
				printf("Error in command line expression !!");
				break;
			}
		}
	switch(op)
	{
		case '+':
				printf("Sum id : %d \n",add(num1,num2));
				break;
		case '-':
				printf("Sum id : %d \n",sub(num1,num2));
				break;
		case '/':
				printf("Sum id : %d \n",div(num1,num2));
				break;
		case 'x':
				printf("Sum id : %d \n",mul(num1,num2));
				break;
		case '%':
				printf("Sum id : %d \n",mode(num1,num2));
				break;
		default:
			printf("Error in command line expression !!");
			break;
		}
	return 0;
}
