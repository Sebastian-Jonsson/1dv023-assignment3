# Release

In this file, you indicate the status of your assignment by checking the checkboxes below. No unchecked checkboxes are allowed in the document when your hand in for the assessment.

## Release status

_To make a release that will be assessed by the examiner you need to make sure all checkboxes below are checked. You check a checkbox by adding a "x" within the brackets._

- [x] I have started working on the assignment.
- [x] `npm install` is being used to install all dependencies.
- [x] `npm start` is being used to start the application.
- [x] All functional requirements are fulfilled.
- [x] All Production requirements are fulfilled.
- [x] All non-functional requirements are fulfilled.
- [x] I have completed the assignment report (see below).

---

- [x] I intend to submit the assignment and at the same time I guarantee that I am the one who created the code that is submitted. In cases where I use external libraries or borrowed code from other sources, the source is clearly stated.
(_Jag avser göra en inlämning av uppgiften och jag garanterar samtidigt att jag är den som skapat koden som lämnas in. I de fall jag använder externa bibliotek eller har lånat kod från andra källor så är källan tydligt angiven._)

---

## Assignment report

### URL to your application

The url to my site is: https://cscloud488.lnu.se/issueView

### Security

I have used Helmet to a further extension of it's capabilites and added the content security policy settings. 
The built in protections of Helmet are being used by calling it's entirety.
I have set environmental variables to not make things to obvious and easy to grab for potential threats.(Mentioned below)
Tokens have been set on Gitlab as a means of safe communication between servers and client.
Used certbot as it had a better reputation than self-signed and is approved according to existing rules existing, giving my site a good certificate.
PM2 and nginx have been used for decent protection against DOS/DDOS attacks for example.
Some security mentioned below.

_Describe what you have done to make your application secure, both in code and when configuring your application server._
helmet(content security policy)


### Description of entities

- Reversed proxy:
    The reverse proxy is the front of the server which listens to the requests from outside 'interference' HTTPS(443) and forwards it to the Node application(web) on HTTP(80), Firewalls for example. Checks and handles certificates listens to protocols. 
    I use it for this purpose on the server. Security foremost and as a forwarding point.

- Process manager:
    I am using PM2 which is used on my production server and is for Node.js applications. It has a built-in load balancer which helps to make sure that the server doesn't get overloaded.
    I use PM2 in order to get a better overview of the active processes and I can use it to create more instances and stop one page while starting another for example. Other than this the built in load-balancer and control gives me more security against as mentioned the server being overloaded.

- TLS certificates:
    One can compare a TLS certificate to a drivers license, granting permissions to use encrypted communication via public key infrastructure and/or authenticate the identity of the one with the certificate.
    In my solution I'm using the Certbot in order to get my certificate in order rather than a self-signed one. Certbot are more approved and provide a better certificate which I felt was a thing to prefer, thus I used it.

- Environment variables
    I quote to a degree. 'An environment variable is a variable whose value is set outside the program." Usually placed in a dotenv file which will be reachable by using the specific string needed to call upon it.
    I use them to hide my secret variables that I don't want anyone to use other than the application itself or me. They are access points which can alter too much to give publicly as identification tokens for example, even the port.
_

### Development vs. Production

Developement is by far more secure as it has not been made public as the production server is. 
Thus less attack avenues for potential threats, using Ngrok is a good option to test in live but I find that for simpler things like CSS, one can test in for example localhost for even more certainty and time.
In production it is far more important to protect the information on the server
production becomes public, more attack opportunities.
Opening up to the public is alot of possibility for server and attacker. 

### Use of external dependencies

I did not in particular use any extra modules as the need for them did not become pressing enough so I will list a few have with a brief reasoning:

    Express = Self-explanatory.

    Express-hsb = Views.

    Helmet = General security which covers alot of ground to go along with the CSP settings which checks the sources of information to the server and what's allowed. The CSP are important because the production server is public and this require the settings to make sure not unwanted script or other malware is allowed.

    HTTP = Requirement for communications, used in tandem with socket.io for example.

    Socket.io = Used instead of WS, socket realtime communications. I check the incoming post requests that they have a specific token bound to my Gitlab which is the only one allowed to send issue updates to this site. Likewise when getting data from the webhook I check the another token there to make sure no unwanted info is sent and grabbed.

### Overall Reflection

I found the initial starting point and setups being the most difficult part, the webhook connection was relatively simple to understand once it was done.
The websocket usage with socket.io had some difficulties in understanding how it worked but became more clearer after using it succesfully, if not a bit hard to explain.
I could have done more research on websocket applications overall to see how the communications worked inbetween different types of applications.
I felt that research was more prominently required in this assignment compared to the previous ones in this course.

### Further improvments

I could have done some whitelisting and only allow access to myself but since I wanted it to be available for the examination it felt unnessecary as the server will go offline once done.
I could have added a login alternative such as in Assignment 2, or even done some oAuth with some more time available.
Could have made a more appealing site with CSS changes.

### Extras

I had begun on making a login process much like the one in assignment 2, however priorities made it unable to fit within the allocated time. Thus I removed what I had, a database connection.

### Feedback

I found this assignment to have a higher focus on how things worked in theory is order to make it work together.
I found this task pleasing to perform and learn about as it gave practical uses aswell as a refresher on security.
