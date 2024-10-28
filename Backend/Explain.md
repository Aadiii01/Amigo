Explain Forget and Reset Password :-

1. In User Model we store 2 Token - resetPasswordToken,resetPasswordExpires
2. If user go to forget password then a resetToken is create by createPasswordResetToken
3. In createPasswordResetToken function -
   . First it create a resetToken we pass user id, Secretkey, Expirekey
   . Then it store the token in the user Model name resetPasswordToken because for further verification
   . It store also Expire time name resetPasswordExpires to 10 minutes after 10 minutes token is not valid
4. Save the user with the newly created reset token without validation
5. We create the URL for reset password by request protocol (HTTP or HTTPS) and the host with the help of token
6. Then we send the URL to user Mail with the help fo nodemailer
7. Then open the email and copy the token and enter new password
8. Then in Database we search the user by resettoken and check expire time also
9. Then change the password and undefined both resetPasswordToken,resetPasswordExpires
10. Then save the user

-------------------------------------------------------------------------------------------------------------------------------------

Explain Email Verification :-

1. When we register the user we give the details with email then we call the sendVerificationEmail function and pass the user,req
2. In sendVerificationEmail function :-
   . Then we create the 2 token by createEmailVerificationToken - emailVerificationToken,emailVerificationExpires
   . Then we save the user
   . Then we Generate the URL and Send the URL by Mail Nodemailer
3. In VerifyEmail Function :-
   . We Extract the token
   . Then we check the token by jwt.verify we this step due to more security (if we skip this step it will work also)
   . Then we find the user by checking the emailVerificationToken in databse
   . Then we verified the user and undefined the both token

-------------------------------------------------------------------------------------------------------------------------------------

Explin Google Auth :-

1. First in app.js initialize session and passport -
   . app.use(session({...})): This sets up a session for your application.
   . secret: A secret key that keeps the session safe (like a password).
   . resave: false: It won’t save the session again if nothing changed, which saves resources.
   . saveUninitialized: false: It won’t save empty sessions, avoiding clutter
   . app.use(passport.initialize()): Starts Passport for handling user authentication.
   . app.use(passport.session()): Keeps track of logged-in users across different pages. It remembers who the user is based on session.

2. Create a File Passport.js :-
   . Set up Google Strategy - clientID, clientSecret, callbackURL
   . Authentication Callback function

   . Paramaters :-
     . accessToken: Token to access Google APIs on behalf of the user.
     . refreshToken: Token to refresh the access token when it expires.
     . profile: Contains information about the user from Google (like ID, email, name).
     . done: A callback function to pass the results of the authentication.

   . It first checks if a user with the given Google ID already exists in the database.

   . If not, it creates a new user :-
     . It generates a username based on the user's display name add a unique timestamp
     . Creates a new user record with data obtained from the Google profile.
     . Saves the user to the database.
   
   . Return the done callback Function

   . Serialization - This function is called when the user is authenticated. It takes the user object and stores the user's ID in the session. This ID  is used to identify the user in subsequent requests.

   . Deserialization - This function retrieves the user object from the database using the user ID stored in the session. This happens on every request after the user is logged in, allowing the app to access the user’s information.

3. Write the googleAuthCallback Controller :-

   . calls the Google authentication strategy (configured earlier in your Passport setup). It passes three arguments:
     . err: If an error occurs during authentication.
     . user: The user object if authentication succeeds.
     . info: Any extra information, such as error messages.

   . If the user is not found (for example, if the authentication fails or the user doesn't exist in your database), the user is redirected back to the login page.

   . req.login: This is a Passport function that establishes a login session for the authenticated user. The user's information will be stored in the session
     . Generate token
     . After successfully setting the cookies, the user is redirected to the current-user endpoint, where they can see their profile or further details.

   . Why req, res, next is passed at the end:
     . the passport.authenticate() function returns another function (a middleware) that needs to be invoked with the req, res, and next arguments.
     . In short, passing req, res, next at the end allows the middleware to correctly process the request and continue through the Express.js request-response cycle.

4. Creating Route :- 
   . GET /auth/google :-
     . When a user hits the /auth/google route, they are redirected to Google's login page.
       . passport.authenticate('google'): Uses the Google OAuth strategy.
       . scope: ['profile', 'email']: Specifies that you want to access the user's profile information and email address.
   
   . GET /auth/google/callback :-
     . Once Google authenticates the user, it redirects the user to this route
