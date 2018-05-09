Project: jordanEvents
Description:
to list all the events that focuses on youth ages from 5 to 17 years old.
three parts of the prject:
1. public: list all the available events, if the user intrested on one of the events he/she can register for the event 				if they have already registered in the application, otherwise they need to register by email, password, 				phone (stag1 one, for stage two we could add the location also).

2. for the logged in users: shows a welcome page and the events that particular user register for it ( on stage two: 		add a folowing up procedure and the reminder about the events dates).

3. for an events makers: 
	3-1 if the events maker is new he/she should register first and fill the details of them as email password contact 		information and other important details.
	3-2 if the events maker was already registered he/she could login with the username and password.
		after the maker logged in he could go to his/her special page part of it is the profile sector that allows them to edit thier contacts and other things. another part is for the announced list of events, another part for the list of the expired events that they could reannounce in the future to avoide creating events from scratch and to make life easy.




Todolist:

- [x] Create the home page
- [x] Add navbar
- [x] Create user login
- [x] Create user register
- [x] Create user profile page
- [x] Create login maker
- [x] Create register maker
- [x] Create maker profile page
- [x] Create events page
- [x] view events related to each logged in maker on the profile page
- [x] Create add event page for the logged in maker after he/she logged in

29/mar/2018
- [x] Edit particular event.
- [x] Remove Event from event list by event maker.

29/mar/2018
- [x] Add details button to each event lead to the event page details.
- [x] Create event details page.
- [x] Add register button on the event details page.
- [x] If user dosen't logged in the promt user to login or register.
- [x] User register for particular event from events list.
- [x] show the registered events on the user profile page.
- [x] remove previously registered event from user event list.

??/Apr/2018
- [x] connect to mongoDB
- [x] refactor events and makers to mongoDB and mongoose

20/Apr/2018
- [x] refactor user to be on mongoDB and mongoose.


22/Apr/2018
- [x] fix the registration for event to check first if user already register with the event before.


23/Apr/2018
- [x] adding passport to user and maker

30/Apr/2018
-[x] remove the user's id and maker's id from the browser url for more secure.

03/May/2018
-[x] encrypt the password for user and maker with salt and hash.

04/May/2018
-[x] add google authentication.

06/May/2018
-[x] deploy on heroku and connect the database via mLab as addons of heroku.

07/May/2018
-[x] add profile image.

09/May/2018
-[ ] rebuild the database to be just one collection for users with multi tags [user, maker, admin, superAdmin]. 
-[ ] rebuild the login system to be just one login page if the tag is user go to user maker admin profile respectfuly. 
-[ ] the admin decided if the user is a maker by add a tag maker to the record.




******** future work todo: **********
1. add the admin page to manage:
	a. the registration of the makers.
	b. confirm the publish of the event after added by the maker.
	c. the payment for each user and to show the balance.

2. add the payment for each user managed by the admin.
3. add the validity for each event and add filter to show just the valid events (add events validity for registration on database). 
4. redirect the registered user or maker direct to the profile not to the login page.














