FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
WORKDIR /app
EXPOSE 10000

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY ["New folder (2)/VehicleBookingAPI/VehicleBookingAPI.csproj", "VehicleBookingAPI/"]
RUN dotnet restore "VehicleBookingAPI/VehicleBookingAPI.csproj"
COPY ["New folder (2)/VehicleBookingAPI/", "VehicleBookingAPI/"]
WORKDIR "/src/VehicleBookingAPI"
RUN dotnet publish -c Release -o /app/out

FROM base AS final
WORKDIR /app
COPY --from=build /app/out .
ENV ASPNETCORE_URLS=http://+:10000
ENTRYPOINT ["dotnet", "VehicleBookingAPI.dll"]