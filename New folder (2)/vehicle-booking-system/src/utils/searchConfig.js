const ROLE_LABEL = { 0: "company", 1: "owner", 2: "admin" };

export function getSearchConfig(pathname, role, tab) {
  const roleName = ROLE_LABEL[role] ?? "user";

  if (pathname === "/vehicles") {
    return {
      key: role === 2 ? "adminVehicleSearch" : "vehicleSearch",
      placeholder: role === 2 ? "Search all available vehicles" : "Search vehicles to book",
    };
  }

  if (pathname === "/bookings") {
    return {
      key: role === 2 ? "adminBookingSearch" : "myBookingSearch",
      placeholder: role === 2 ? "Search all bookings" : "Search your bookings",
    };
  }

  if (pathname === "/my-vehicles") {
    return {
      key: "ownerFleetSearch",
      placeholder: "Search your fleet",
    };
  }

  if (pathname === "/admin") {
    if (tab === "users") {
      return { key: "adminUserSearch", placeholder: "Search users by name, email, phone, or role" };
    } else if (tab === "vehicles") {
      return { key: "adminVehicleSearch", placeholder: "Search vehicles by make, model, category, or year" };
    } else {
      return { key: "adminReviewSearch", placeholder: "Search booking reviews" };
    }
  }

  return {
    key: `${roleName}DashboardSearch`,
    placeholder: `Search ${roleName} dashboard`,
  };
}
