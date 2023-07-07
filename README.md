
# Drone Zone - Drone E-commerce


This is a personal project to apply my knowledge working with Next.js and Data base.


## About The Project

Drone Zone is an E-commerce website designed to provide users with a seamless drone shopping experience.

I have incorporated various features inspired by real e-commerce platforms, ensuring that users enjoy a familiar and intuitive interface.

The project includes an admin dashboard that allows for easy CRUD (Create, Read, Update, Delete) operations, enabling administrators to manage products and categories efficiently.

## Tech Stack


The front end of the site was built with **HTML5** | **Tailwind** | **Typescript** | **Next.js 13** *(app folder structure)*

The back end of this project was made using MongoDB database.


Some of the libraries used: 

**React Toastify** | 
**React Spinners** | 
**React Tooltip**
## Features

#### For Admins:

- Secure admin dashboard with email authorization (limited to approved email addresses only)
- Products tab for managing product listings (add, edit, delete)
- Categories tab for managing product categories (add, edit, delete)
- Orders tab providing detailed information about current orders

#### For Users:

- User registration and login functionality
- Personalized 404 Error page
- Interactive shopping cart with options to add, update quantities, and remove products
- Advanced filtering feature allowing users to apply multiple combinations of filters
- Frequently Asked Questions (FAQ) and other informative sections in the footer
- Seamless checkout experience with Stripe integration
- Tooltip displays additional information when hovering over cart icons
- Contact form for easy communication
- Loading skeleton for improved user experience
- Similar products section

## Deployment

The deployment of this project was made in Vercel (https://vercel.com)

- Click [here](https://www.drone-zone.co.uk) to access or go to https://www.drone-zone.co.uk



## Authors


- github [@alanrceratti](https://github.com/alanrceratti)

-  linkedin [@alanrceratti](https://www.linkedin.com/in/alan-ceratti-7ab8261b8)



## Lessons Learned

During the development of my Drone Zone E-commerce project, I encountered several challenges and learned valuable lessons. Here are some key takeaways from my experience:

- **Double Login for Admin and Users:**
Implementing separate login systems for administrators and users presented a unique challenge. I needed to ensure that only approved email addresses had access to the admin dashboard. I learned the importance of robust authentication mechanisms and the need to handle user roles effectively. This involved designing a secure login process that differentiated between admin and user roles, granting appropriate access based on email verification and authorization.

- **Advanced Filtering Feature:**
Creating an advanced filtering system that allowed users to apply multiple combinations of filters proved to be a complex task. I discovered the importance of thoughtful architecture and optimized data retrieval. Developing an efficient algorithm to handle various filter combinations while maintaining high performance required careful consideration and testing. I learned the significance of designing scalable and adaptable filtering mechanisms to enhance the user experience.

- **Stripe Integration:**
Integrating Stripe for seamless checkout functionality introduced its own set of challenges. I gained insights into handling payment processing securely and efficiently. Understanding the intricacies of the Stripe API, such as handling tokens and implementing webhook endpoints, became crucial. I also learned the importance of error handling and providing a smooth transaction experience to users while maintaining the security of their sensitive information.

- **Next.js 13 App Structure:**
Working with the new Next.js 13 app structure posed its own set of challenges. I encountered changes in folder organization and project configuration. I learned the significance of keeping up with the latest framework updates, understanding the migration process, and adapting my codebase accordingly. Additionally, I discovered the importance of leveraging the new features and optimizations introduced in Next.js 13 to improve performance, maintainability, and developer productivity.


In conclusion, developing an e-commerce platform like Drone Zone taught me invaluable lessons in tackling specific challenges. I learned the significance of implementing secure and differentiated login systems, designing advanced filtering features, integrating payment gateways effectively, and adapting to new framework structures. These experiences have deepened my understanding of e-commerce development and will inform my future projects, enabling me to build even better solutions for my clients and users.

## Screenshots

- **Admin dashboard Products list**
![App Screenshot](https://dronezone-admin.s3.eu-west-2.amazonaws.com/Drone-zone+prints+git/admin.webp)


- **Admin dashboard orders view**
![App Screenshot](https://dronezone-admin.s3.eu-west-2.amazonaws.com/Drone-zone+prints+git/orders.webp)


- **Home page**
![App Screenshot](https://dronezone-admin.s3.eu-west-2.amazonaws.com/Drone-zone+prints+git/home-page.webp)


- **Product details view**
![App Screenshot](https://dronezone-admin.s3.eu-west-2.amazonaws.com/Drone-zone+prints+git/detail.webp)


- **About section**
![App Screenshot](https://dronezone-admin.s3.eu-west-2.amazonaws.com/Drone-zone+prints+git/aboutus.webp)


- **404 Error page**
![App Screenshot](https://dronezone-admin.s3.eu-west-2.amazonaws.com/Drone-zone+prints+git/404page.webp)

## Roadmap

In the future there may be some integrations and more features like:

- Settings page for user to update name, address, etc
- User page to follow current order status
- Reset password option
- Products rating and review section
- Admin dashboard with option to mark as *Send* to the customer
