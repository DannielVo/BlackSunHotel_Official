# 🌑 BlackSunHotel – A Web Application for Hotel Booking

This repository contains the source code for a complete ASP.NET Core Web API demonstrating backend principles, RESTful architecture, and CRUD operations.

## Database Configuration

After installing and setting up SQL Server, update the "ConnectionStrings" string in `appSettings.json` to match your database configuration.

## Quick Start

Follow the steps below to get started quickly:

1. Open the source code in Visual Studio Code.
2. Open the terminal and execute the following command to update the database structure:
   ```bash
   dotnet ef migrations add InitialCreate
   dotnet ef database update
   ```
3. Start the server and Swagger interface with:
   ```bash
   dotnet watch run
   ```
   The Swagger interface should automatically open.
