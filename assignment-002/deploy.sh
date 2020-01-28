cp $1 /var/www/html/$2
if [ $? -eq 0 ]; then
	echo "Successfully deployed..."
else
	echo "Couldn't deployed."
fi


#function deploy()
#{		
#		}
#mkdir pp1

#if [ $? -eq 0 ]; then
#deploy()
#else
#	deploy()
#fi
