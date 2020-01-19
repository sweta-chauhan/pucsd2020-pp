
cp $1 /var/www/html/$1
if [ $? -eq 0 ]; then
	echo "Successfully deployed..."
else
	echo "Couldn't deployed."
fi
