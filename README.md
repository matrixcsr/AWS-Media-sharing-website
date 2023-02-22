# Installation
>Using cloud formation template

1: Zip the code and upload it on a media server to directly fetch and unzip inside EC2 instance
2: Configure VPC to allow inbound traffic to PORTS exposed (http, ipv4, 3000, 3001)
3: Assign an elastic IP to the instance.
4: update the old IP with new elastic IP in ./View ./Gallery ./Upload.



![ArchitectureDiagram](https://user-images.githubusercontent.com/82505131/220505325-3d4017dd-f110-405f-b3e1-5402ff9f2bf7.png)
![2023-02-21 11_32_16-Greenshot](https://user-images.githubusercontent.com/82505131/220505449-e324efb6-872d-464e-968b-be11daf84045.png)

![2023-02-21 11_32_22-Greenshot](https://user-images.githubusercontent.com/82505131/220505466-85b4b90d-f13f-47a3-a8b1-12d13b846164.png)
![2023-02-21 11_32_34-Greenshot](https://user-images.githubusercontent.com/82505131/220505477-09ec7fd3-49e9-4100-9f62-aaad342166a4.png)
![2023-02-21 11_32_38-Greenshot](https://user-images.githubusercontent.com/82505131/220505483-78243a9f-8c9e-478e-84ce-7a4c712990bc.png)

# Overview of Web Application Components
>This document provides an overview of the various components that make up a web application, including their features and functionality. The web application is built using several technologies, including React, Node.js, AWS S3, and DynamoDB.
## Node.js Application
>The Node.js application handles file uploads and downloads with Amazon S3 and stores metadata about the files in Amazon DynamoDB. Here are the main parts of the code and what they do:

- AWS SDK - imports the AWS SDK so the application can interact with Amazon S3 and DynamoDB.
- Express Framework - imports the Express framework, which is used to create the HTTP server that handles the file upload and download requests.
- Multer - imports Multer, which is a middleware for handling file uploads.
- CORS Middleware - imports the CORS middleware, which enables cross-origin resource sharing so the frontend can interact with the server.
- S3 Service Client - creates an instance of the S3 service client, which is used to interact with S3.
- DynamoDB Service Client - creates an instance of the DynamoDB service client, which is used to interact with DynamoDB.
- Routes - HTTP routes that fetch, upload, delete, and list files in S3 and their metadata in DynamoDB.
- Express Server - starts the Express server and listens for incoming requests on port 3000.

## About Component
The About component displays information about the project, its developers, and the sources and references used in its development. The component is designed using Bootstrap and custom CSS, and features a full-screen background image and a header divided into two columns.

## Gallery Component

The Gallery component allows users to view images uploaded by others. The component fetches data from an external server using the Axios library and then renders the images on the screen. The user can click on each image to view it in more detail. The component is designed using Bootstrap and custom CSS and has a responsive layout that adjusts to different screen sizes, making it mobile-friendly.



## Home Component

The Home component is the landing page of the web application and introduces the application and provides a brief description of the images available for viewing. It also includes a call-to-action button that prompts users to explore the gallery. The component is designed using Bootstrap and custom CSS and features a full-screen background image and a header divided into two columns.

## Upload Component

The Upload component allows users to upload their images to the gallery. The component provides a simple and intuitive interface that guides users through the process of uploading their images. It also includes validation and error handling to ensure that the uploaded images meet the required standards. The component is designed using Bootstrap and custom CSS and features a full-screen background image and a header divided into two columns.

## View Component

The View component allows a user to view a specific image from the gallery. It imports the necessary CSS and assets and makes an HTTP GET request using the Axios library to fetch the list of images from the server. The useLocation hook is used to extract the filename of the image to be viewed from the URL parameters. The component also allows the user to download the image and delete the image from the gallery, with confirmation.

## App.js

The App.js file is the main file for the application and it contains the routes and components that make up the application. The file starts by importing the required dependencies and components, and it uses the BrowserRouter, Routes, and Route components to manage client-side routing.

## AWS Resources
>The following resources are created for the web application in the lab:

### VPC
A VPC with a CIDR block of 10.0.0.0/16 and with DNS hostnames enabled. The VPC is tagged with a name "Lab VPC".
### Internet Gateway

An internet gateway named "Lab IGW" is created to provide a connection between the VPC and the internet.
### Public Subnets
Two public subnets are created: PublicSubnet1 with a CIDR block of 10.0.0.0/24, and PublicSubnet2 with a CIDR block of 10.0.1.0/24. Both subnets are associated with the VPC created earlier, and are tagged with a name "Public Subnet 1" and "Public Subnet 2", respectively.
### Route Table
A route table is created and associated with the VPC. The route table is named "Public Route Table" and specifies how network traffic is directed within the VPC and to and from the internet.
### EC2 Instance
An EC2 instance is launched into PublicSubnet1. The EC2 instance is created using an Amazon Linux AMI ID and has a security group attached to it. The security group allows incoming traffic on port 80. The EC2 instance is used to run the web application and acts as a web server.
### Security Group
A security group named "Web Security Group" is created to provide a virtual firewall to control inbound and outbound traffic for the EC2 instance.
### S3 Bucket
An S3 bucket is created to store web application data, such as images and other media. The S3 bucket is configured to be accessed publicly by everyone, and accessible by all resources on AWS.
### Dynamo DB Table
A Dynamo DB table is created to store metadata for the web application.

