p=home/sweta/Sweta/MCA/part-III/PP/assignment-001/lib


edit : calc.o
	cc -L/$p -Wl,-rpath=$p -Wall -o calc calc.o -ladd -lsub -lmul -ldiv

# Shared library creation

all: mul.so sub.so div.so add.so

add.so : add.o
	cc -shared -o libadd.so add.o

add.o : src/add.c include/add.h
	cc -Wall -Werror -fpic src/add.c

all: mul.so sub.so div.so

div.so : div.o
	cc -shared -o libdiv.so div.o

div.o : src/div.c include/div.h
	cc  -Wall -Werror -fpic src/div.c

all: mul.so sub.so

sub.so : sub.o
	cc -shared -o libsub.so sub.o

sub.o : src/sub.c include/sub.h
	cc -Wall -Werror -fpic src/sub.c

all: lib/mul.so

mul.so : mul.o
	cc -shared -o libmul.so mul.o

mul.o : src/mul.c include/mul.h
	cc  -Wall -Werror -fpic src/mul.c

# Object File creation of main file

calc.o : calc.c
	cc  calc.c

.PHONY : all clean
clean:
	rm -rf calc *.o
