// The base API Management URI
const baseUri = "https://apidev.hku.hk";

// The Microsoft Entra ID application registration client ID
const clientId = "6498d2ce-1f05-4193-929c-15c332996e37";

// The Microsoft Entra ID tenant ID
const tenantId = "e80d8e75-52b9-4839-a358-87abb93b3567";

// The scope for the access token request to call the Microsoft Graph API
// If a refresh token is also required for the application, add "offline_access" to the scope
// e.g. const scope = "https://graph.microsoft.com/.default offline_access"
const scope = "https://graph.microsoft.com/.default"

// Redirects the user to the login endpoint with the appropriate parameters to begin the authentication flow
const login = () => {
    window.location.href =
        `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize?response_type=code&redirect_uri=${baseUri}/auth/callback&client_id=${clientId}&scope=${scope}`;
};

// Logs the user out of the application by redirecting to the logout endpoint of Microsoft Entra ID which will in turn call the logout endpoint of the application to remove the cookie
// This allows the user to be logged out of Microsoft Entra ID and the single-page application itself by deleting the cookie
// If you do not want to log the user out of Microsoft Entra ID, you can remove the redirect to the logout endpoint of Microsoft Entra ID and just call the logout endpoint of the application
const logout = () => {
    window.location.href = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/logout?post_logout_redirect_uri=${baseUri}/auth/logout`;
};

function getCookieValue(cookieName) {
    const cookies = document.cookie.split("; "); // Split cookies into key-value pairs
    for (const cookie of cookies) {
      const [name, value] = cookie.split("="); // Split each key-value pair
      if (name === cookieName) {
        return value; // Return the value if the name matches
      }
    }
    return null; // Return null if the cookie is not found
}

// Calls the graph endpoint and displays the result
const callApi = async () => {
    // Display loading message
    document.getElementById("result").innerText = "Loading...";
    console.log(document.cookie);

    // Call the Graph API endpoint
    const token = getCookieValue("token");
      console.log("Token:", token);
 
      // Make an AJAX request using the token
      $.ajax({
        url: "https://apidev.hku.hk/graph/me",
        method: "GET",
        headers: {
          Cookie: `token=${token}`, // Add the token cookie
          Accept: "application/json",
        },
        success: function (data) {
          console.log("Response data:", data);
        },
        error: function (error) {
          console.error("Error:", error);
        },
      });
};

// Exports the functions to be used in the HTML
export { login, logout, callApi };
