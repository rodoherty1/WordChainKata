Word Chain Kata
===============

This is my version of the code which Miles and I (let's be honest, it was Miles!) had a go at on Wednesday 14th August 2013.

I have broken up the code a bit for the sake of permitting some Jasmine Tests.

I have also added a Grunt file (my first!) which will run the tests.

I tried a couple of simple paths.

''''
Finding path from cat to dog
Success ... cat,cot,dot and dog

Finding path from frog to leap
Failed to find a path from trap to leap with the following path: frog,flog,flag,flap,clap,chap,crap,trap
About to backtrack and try again with a different path!
Success ... frog,flog,flag,flap,clap,chap,crap,trap,tran,bran,bean,lean and leap

Finding path from code to kata
Success ... code,cote,vote,dote,date,data and kata
''''

Installation
------------

Clone this project and then install this project's dependencies as follows.

''''
npm install
''''

The run the tests.

''''
grunt
''''

Hopefully it will all run successfully for you :-).

Rob.





