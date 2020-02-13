p=/home/sweta/Sweta/MCA/part-III/PP/assignment-003


edit : main.o
	cc -L/$p -Wl,-rpath=$p -Wall -o logger main.o -llogger

logger.so : logger.o
	cc -shared -o liblogger.so logger.o

logger.o : src/logger.c include/logger.h
	cc -c -Wall -Werror -fpic src/logger.c

main.o : main.c src/logger.c
	cc -c main.c

.PHONY : clean
clean :
	-rm logger logger.o main.o
