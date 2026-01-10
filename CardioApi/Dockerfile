# Use the official .NET SDK image to build the app
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the project file and restore dependencies
COPY ["CardioApi.csproj", "."]
RUN dotnet restore "./CardioApi.csproj"

# Copy the remaining files and build the app
COPY . .
RUN dotnet build "./CardioApi.csproj" -c Release -o /app/build

# Publish the app
FROM build AS publish
RUN dotnet publish "./CardioApi.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Use the official .NET runtime image to run the app
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

# Install native dependencies for ML.NET (libgomp1 is often required)
RUN apt-get update && apt-get install -y libgomp1 && rm -rf /var/lib/apt/lists/*

COPY --from=publish /app/publish .

# Ensure the model file is present in the runtime directory
COPY ["cardio_model.zip", "."]

# Render provides the PORT environment variable. 
# ASP.NET Core 8.0 listens on 8080 by default.
ENV ASPNETCORE_HTTP_PORTS=8080

# Set the entry point for the container
ENTRYPOINT ["dotnet", "CardioApi.dll"]
