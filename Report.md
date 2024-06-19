# Title: Detailed Report on Ezpayy

Abstract: Main motivation behind this project is to create a digital wallet application that allows users to store their receipts and manage their expenses wuthout having a cluttered UI. I saw Paytm and Google Pay and thought that they are very cluttered and have a lot of features that are not needed. So, I decided to create a simple and intuitive digital wallet application that allows users to store their receipts and manage their expenses. The application provides a simple and intuitive interface for users to add, view, and categorize their receipts. Users can also view their transaction history and manage their expenses using the application.This report provides a detailed analysis of the Ezpayy application. It includes the features, architecture, and the technologies used in the application. The report also includes the challenges faced during the development of the application and the future scope of the application.


# Table of Contents

1. Introduction
2. Features
3. Architecture
4. Technologies Used
5. Challenges Faced
6. Future Scope
7. Conclusion
8. References
9. Appendix
10. Acknowledgements
11. Author
12. License

# 1. Introduction

Ezpayy is a digital wallet application that allows users to store their receipts and manage their expenses. The application provides a simple and intuitive interface for users to add, view, and categorize their receipts. Users can also view their transaction history and manage their expenses using the application.
This Application aims to combine all the good and necessary aspects of a preexisting wallet. In some digital wallets there are unnesary features like games, offers, etc. This application aims to provide a simple and intuitive interface for users to manage their expenses. 


React is a JavaScript library for building user interfaces. It is used to create reusable UI components that can be used to build complex user interfaces. It is used to manage the state of the application and handle user interactions. Example, we have forms, and a user can input data into the form, and React will handle the state of the form and update the UI accordingly. It will show live if the user has entered the correct data or not.

Firebase is a cloud-based platform that provides backend services for web and mobile applications. It provides services like authentication, real-time database, cloud storage, and hosting. Firebase is used to store the receipts and transaction history of the users. It is used to authenticate users and manage user data.

# 2. Features

The Ezpayy application has the following features:

-   User Authentication: Users can sign up and log in to the application using their email and password. And Google Sign-in aswell. They can upload their profile picture and update their profile information. Each user has a unique user ID that is used to identify them in the application. And each user has a unique wallet ID that is used to identify their wallet in the application.
- Add Money to Wallet: Users can add money to their wallet ideally using their credit or debit card. I have not implemented this feature yet. But this feature is very important for a digital wallet application. Users now just input the amount they want to add to their wallet and the amount is added to their wallet.

-   Add Receipt: Users can add a new receipt to their wallet. They can take a picture of the recipt and using Gemini API, the data is extracted from the image and added to the wallet. The user can also manually enter the data if the image is not clear. The user can add the receipt amount, date, category, and notes to the receipt. The receipt is stored in the Firebase database and displayed in the user's wallet.
-   View Receipt: Users can view the receipts in their wallet. They can filter the receipts by category and date. They can also search for a specific receipt using the search bar. The receipts are displayed in a list view with the receipt amount, date, category, and notes. The user can click on a receipt to view the details of the receipt.
-   Edit Receipt: Users can edit the details of a receipt. They can change the receipt amount, date, category, and notes. The changes are saved to the Firebase database and reflected in the user's wallet.
-   Delete Receipt: Users can delete a receipt from their wallet. The receipt is removed from the Firebase database and no longer displayed in the user's wallet.
-   Transaction History: Users can view their transaction history in the application. They can see the total amount spent, total amount earned, and the balance in their wallet. They can also view the transaction details like the date, amount, category, and notes.
-   Categories: Users can categorize their receipts into different categories like food, travel, shopping, etc. They can create new categories and assign receipts to the categories. They can filter the receipts by category and view the total amount spent in each category.
-   User can manage their credit and debit cards and add money to their wallet using the cards. They can also transfer money to other users using the application.

# Architecture

The Ezpayy application is built using a client-server architecture. The client is built using Next.js and React. The server is built using Firebase. The client communicates with the server using REST APIs. The client sends requests to the server to add, view, edit, and delete receipts. The server processes the requests and sends back the response to the client. The client displays the response to the user in the form of a list of receipts or transaction history. The client also handles user interactions like clicking on a receipt to view the details or editing a receipt. The client sends the changes to the server to update the receipt in the database. The server stores the receipts and transaction history in the Firebase database. It authenticates users using Firebase authentication. It manages user data like profile information and wallet balance. It provides APIs to add, view, edit, and delete receipts. It also provides APIs to view the transaction history and manage categories. The server is hosted on Firebase hosting and the client is hosted on Vercel.

# Technologies Used

The Ezpayy application uses the following technologies:

-   Next.js: Next.js is a React framework that allows developers to build server-side rendered applications. It provides features like server-side rendering, static site generation, and API routes. It is used to build the client-side of the application.
-   React: React is a JavaScript library for building user interfaces. It is used to create reusable UI components that can be used to build complex user interfaces. It is used to manage the state of the application and handle user interactions.
-   Material-UI: Material-UI is a React component library that provides pre-built UI components like buttons, forms, and cards. It is used to create the user interface of the application. It provides a consistent design and layout for the application.
-   Tailwind CSS: Tailwind CSS is a utility-first CSS framework that provides pre-built utility classes like flex, grid, and spacing. It is used to style the user interface of the application. It provides a responsive design that works on different screen sizes.
-   Local Storage: Local Storage is a web storage API that allows developers to store data in the browser. It is used to store the user's authentication token and profile information. It is used to persist the user's data between sessions.
-   JWT: JWT (JSON Web Token) is a standard for creating access tokens that can be used to authenticate users. It is used to generate a token when the user logs in and verify the token when the user makes a request to the server. It is used to authenticate users and protect the API routes.
-   Firebase: Firebase is a cloud-based platform that provides backend services for web and mobile applications. It provides services like authentication, real-time database, cloud storage, and hosting. It is used to store the receipts and transaction history of the users. It is used to authenticate users and manage user data.
    Firebase is a NoSQL database that stores data in JSON format. It is a scalable database that can handle large amounts of data. It provides real-time synchronization of data between clients and servers. It is used to store the receipts and transaction history of the users. It is used to authenticate users and manage user data.
-   Gemini API: Gemini API is used to extract data from the receipt image. It provides OCR (Optical Character Recognition) services to extract text from the image. It is used to extract the receipt amount, date, and other details from the receipt image.
-   Vercel: Vercel is a cloud platform for static sites and serverless functions. It is used to host the client-side of the application. It provides features like automatic deployment, custom domains, and serverless functions. It is used to deploy the Next.js application.
-   Cloudflare: Cloudflare is a content delivery network (CDN) that provides security and performance services for websites. It is used to cache the static assets of the application and improve the performance of the application. It provides features like DDoS protection, SSL encryption, and firewall rules. This manages my domain and provides security to the application.

# Challenges Faced

The development of the Ezpayy application faced the following challenges:

-   Security: The application stores sensitive user data like receipts and transaction history. It needs to be secure to prevent unauthorized access to the data. The application uses Firebase authentication and JWT tokens to authenticate users and protect the API routes. The application also uses HTTPS to encrypt the data in transit and secure the communication between the client and server. But still firebase rules are very open and need to be more secure. Any user can access any other user's data.
-   Error Handling: The application needs to handle errors gracefully and provide meaningful error messages to the users. The application uses try-catch blocks to catch errors and display error messages to the users. But still, there are some errors that are not handled properly and need to be fixed.
-   UI Design: The application needs to have a user-friendly and intuitive interface. The application uses Material-UI and Tailwind CSS to create the user interface. But still, the UI needs to be improved and made more responsive. The application also needs to have better error handling and feedback for the users.
-   Digital Wallet: The application needs to have more features in the digital wallet like adding money to the wallet, transferring money to other users, and managing credit and debit cards. The application uses Firebase to store the wallet balance and transaction history. But still, the wallet features need to be implemented and tested.
