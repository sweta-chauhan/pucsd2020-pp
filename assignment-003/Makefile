edit : logger.o main.o
	cc -o logger logger.o main.o

logger.o : src/logger.c include/logger.h
	cc -c src/logger.c
main.o : main.c src/logger.c
	cc -c main.c
.PHONY : clean
clean :
	-rm logger logger.o main.o
