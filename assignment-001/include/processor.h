# ifndef __processor_h_
#define __processor_h_

typedef enum {NOT_VALID=-1,VALID=0}exp_error;

typedef enum {IS_INT,IS_FLOAT}oprnd_type;

typedef enum {ADD,SUB,MUL,DIV,MOD,LPAR,RPAR}oper;

typedef union
{
	int integer;
	float floating;
	}operand;
	 
typedef struct{
	oper operatr;
	operand op1;
	operand op2;
	}exp_node;



exp_error is_valid(char*);
exp_error is_special_char(char);
oprnd_type check_return(char*);
exp_node* build(char*);
operand eval(exp_node*);

#endif
