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
-[x] rebuild the database to be just one collection for users with multi tags [user, maker, admin, superAdmin]. 
-[x] rebuild the login system to be just one login page if the tag is user go to user maker admin profile respectfuly. 
-[x] the admin decided if the user is a maker by add a tag maker to the record.

-[x] add the validity for each event and add filter to show just the valid events (add events validity for registration on database). 
-[x] redirect the registered user or maker direct to the profile not to the login page.



- [x] changing the database and the logic:
   Register [x] register template
			[x] registerController
			[x] user service client
			[x] user service server
			[x] user model
			[x] user schema
			[x] passport
			[x] server
			[x] database


[x] add the admin page to manage:
	[x] a. the registration of the makers.
	[x] b. confirm the publish of the event after added by the maker.
	
 -[x] the maker can make payment for each user and to show the balance.

 -[x] add the payment for each user managed by the maker.

 -[x] filter events by the starting date greater than today still not expired
 -[x] now we send email to user directly after register with image logo
 -[x] upload profile image with multer to folder
 -[x] upload / display profile image to/from AWS S3 bucket
 -[x] reset password with email confirmation
 -[x] The ability of update user profile
 -[x] add member to event then count on the makers events list
 -[x] maker can add payments for user event
 -[x] readd the ability of updating uploading profile image
 -[x] calculate payment details on maker view for each member
 -[x] add statement of account for each event on maker view
 -[x] fix the location after update profile and add price to new event
 -[x] maker can do payments and list payments details and take members attendance
 -[x] show payments and attended details on user profile
 -[x] create event details day by day calculating the days of the programs based on the days per week

12/July/2018
 -[x] when maker update the event details he can also change the dates of the event.
 -[x] maker can change the days per week.
 -[x] copy the program details for old days and put them in the new days.
 -[x] change the tag of approved and special untill the admin confirm the update.


13/July/2018
 -[x] show the upcomming event details from the (event details day by day) for registered members on their profile.

15/July/2018
 -[x] use mapbox Maps as an alternative to google maps.
 -[x] show markers on Map.
 -[x] zoome the map to show all the available markers.

18/July/2018
 -[x] show the popup on marker when mouse enter and hide it when leave.
 -[x] change the marker symbol to private one.

19/July/2018
 -[x] The carousel now is sliding automatically
 -[x] work on the attendance not keep add attendance to the array on the database but filter the attendance if the event is the same and the date is the same just update the attendance not add new on.

20/July/2018
 -[x] Fix the error message of incorrect credential login.

21/July/2018
 -[x] when update the event by maker the days will displayed so if not updated will still the same.

22/July/2018
 -[x] add option when creating new event to have the location from current location or from the map

23/July/2018
 -[x] Member can write feedback shown on member profile page and maker event details page.





Todo list:
-------------

-[] check the barcode reader if it doable.

-[] Admin controll user type (to create the maker).

-[] add controll to maker to decide taking the member special discount (when make the payment and the balance --> check if there is a discount code putted by the maker on the members list).

-[] count registered members just if they hav a tag 'paid' which it released when make a payment.

-[] create a list of members they registered online removed from the list after pay and registered them on the event registered members.

-[] work on the problem of still access event details by maker although maker signed out?

-[] profile details about each coach in event.

Notes:
	-[] discout for siblings 10% for both.
	-[] special discount by admin.
	-[] siblings and friends code (add tag code for friends for family on registration choose the group name)
	-[] price based on daily price to calculate the registered days then the start and end time event fixed.
	-[] freeze once during the event for the days they want to freeze.
	-[] attendance by the number for each member.















