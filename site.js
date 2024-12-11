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

// Calls the graph endpoint and displays the result
const callApi = async () => {
    // Display loading message
    document.getElementById("result").innerText = "Loading...";

    // Call the Graph API endpoint
    fetch("https://apidev.hku.hk/graph/me", {
        method: "GET",
        headers: {
          "Cookie": "token=8%2FwPiY%2BIgOH%2F%2F2SnU9Lm%2FRWbqm%2FVjQjqWVL3uQOn5UVk0FHFSLkUkmLNuSApE%2BgXe550RjfV%2B0p6%2FTo5m9p7D3hPQyhs0I9WIGgfId2LV2FF2Sc8NgL6WCMY0sNvTYnVDJahpDTZ0wW%2BzTUIry3rU88HZfwLwQV7BjB06m5b%2FfLmcRPPMyMoeW4mjNJ8%2BV0s4FemX8jSH7WT%2F%2BpV4TjuoZrMEZEE7SFNFStwnn0BdN%2Bl2JzdTYXhau2baGdyp%2BBBurZaeF904aQb4rmrvp3War0msUkPfwaY0lXoog82vJkmJvycNTnXYwQlWL%2BvQOyKmIod8jW86Eu8YuqqR%2FuYzclwNAKYoOeZ1%2BUMR6r82i5TA0NBQe1PqmfiJ2tO19vPLrQs%2FgVk1pqDeWyDajcjDhZ%2Fdd%2BWNDoBv3hMtRgedruIAjOvchrWpspgoU8GTTq9fc%2FGHPzO5OTLBuArctM1EVTbpv4CTd%2F4uWNP%2BremuZusSqPqGXatVCWlSDVslKHwMlxRBgYIaywbyycSruccgBPNaJBQ7en576XoSz0jy%2BHeV764z6fBRGc0Mzcd5UJEl24%2Bn8YkDT%2BnPtmWdKJ14f%2FDedMx0dnB2orLwO4h8iB92iz0mApAf1juQTmQggk1aZ10QlEuy%2BmlwsNBVagoznsDk3DrAe7PVn0Q5laP93STpWi67%2B3TfgGW4XhG1%2FcLydni4EZfv1cvEtS0a46lLv6Aei9afdNSwu1wg46eM9cYi%2FDp1rYR%2BYltrLAqE9m29fKo4KZt4Impf3wonJo4w%2Fw1Sn%2FwUTnfpLkttVfW1V5K8slV0YZZwmasdeLKQtC62usT2UHN4iZnExYvTYk1JMz32zykvCUe0paXdmn52zVlIgyu%2FXrzENhCJwd%2FMYl1Cnhi8ttLXIvBnswyNL7HZoNSmvQK7YNI2%2FWC0jK5%2B7iJHEtocMJoOIWBjJtEurawLSphQELVC%2FZTz5JJ9wI59uSuANj2R7HQE8UYT8rYfi%2BKC%2B%2Bq5EKA%2F7gdKQd3FU%2Bouya%2BHhjPV2Sewm0wd3AKBU65VOKNLlI4zLFFv6qR%2BhvkkhZfN6kbX7AJYUHWE3b5e1oMCm7csHJO%2BllcqhZ2xWBL%2FInLg3KfT4mw6nw%2FWUYXm%2BZgRJ5i1OTBlWk9QP83GUWiMubI%2Fd9Y%2Bs8NjI8bLP%2F3NuOQZyX4UAlnIGqJPMw0RFpWk7aqsSmnU988%2BnwSJ26cmuuAP0mkOZ%2Fw7fUThoz9U9xWdR%2FL56N0FGB72OFp6G0hrPKXCrfJwdyAw1se7u2hPyWikeI%2BqaraMEgkhvPTpnovLGAFhzn5XBlLw01Zx%2FT7KCNuvTdAfPdJ4Du9JsO4HbRo%2FtiwOSxqOP1JT2R0qZlj9yu8dqNy6BuKeZOyEnPrLYEYsxeuWVAx8%2FRCfBHrqtNvTT%2FErr4ybYdaB7B8CTSr%2BNXC3aoo1FqbLGWvlSm64hqfpxE6HHHA%2Fiwv%2BLF2LNWp0cuoMYDIwhHPXj5P4jLiHjcbAWEhOF1IP6d0IhivAxe6uldUsLx8upgqh5vbCMBKCZoOx86kp8oeBtSxk6OYr82D4aayh9AXDGhNVZmalRL2fyJ%2F2T6HU%2Broy%2BwytRawDcXMX7FQZtV4Ipfbe%2BNoWGxBW0QeWQ%2FrSFU6Rf8gXnoiPFABeA%2BzByhpKqEx0jgpYLZW4nM9YbmT3ZH%2BBgoDwM8l9QWCTijVGaIkpMw9rR%2BX8uCzgPlOPZ%2FIREzDoPYhFw9IymtovdEkR6k4ab2D%2FSJzGN1%2FTXFh4M8BQ0hGT7oCBkCvYPgx0XZHVqUsAGVOZoNgE2Pd3YWxESvonh56zZr7l6O8MAWxhIUR0SHze1pJgFvcFOv17by1mBcnqZCk%2BEYYs9cPk7uXjQv4HVxmQP9rDjN20TEXP526MYVadqw7xfImPjawCkpzX3X2npBGTfU4Ga0OBDvNSYRAYa%2FrrjR7GJb%2FmP1o2A%2F06r9cGyF5a3suzE2nFrYORRqfIm4wfb5c5tFtYfv4zM36dL99rtKlbJChV%2FpafN5aZNKji7H1yBzve5n4%2FjoOELdgIHErsmR5D4n%2FokmOASU6b4jo62Cgg01A82%2B4ZBym5zfbHnkZaOJ7RUyy1Ywml11Iv90vD%2BdLKPTgSMqmoltAi5Q4Hpz90NvtRiz%2F8Gr7JwNU9AyTVUc1Fmd8eGGqnJqDkTELCJbrhUA90rm3pBvPhZPJPdAGLpjz5HSEBBNPolDnctdBOhHSmKVvKb2%2FrltZm8C1m9wrv3MnnYfn5Nd9hvCccAZLg%2Fs%2BaDBsDXqPKjmTGEIMFccAM4z%2B%2FjXwMM7GkuAA8mqs%2Fj4LRiZxvZoXM2jKzPoOfCorWGJJ5rwZKHofTVVVOOCKycZ1hi%2FBIBgClOr7FVyVxKIk3XVIVZHI6RwPVOHF7Vfusgv291ZLvJPO%2B7VT6RUE%2F2xhE4U2Ux9ka0mnuZZnK%2Bwjh%2F%2BU1MZHDs7scqsIiBdIx%2FQleDx%2FK1Xl0UY1vByYQa4y4RlXmXVALa%2FZOe033YOlRwjXK9yjSSK%2B139s94RZ8B3Itn9e7W1vs6VOswww1ErMIAU6UMPcpfiXTbKM25o1zpJQMFUfsKpP05b2VPdLQ7wtrej8ezzuLFt3H7R7YT2AR1irMuRYNcnhX1QtYCfB%2Bv6LtBx55PORYFT%2BsoIbzC1JKZ17dBgXFvd4%2Fs393KVCIsoGgxri%2BAiuov%2BhDtRSJAuU6fbuKHKyXDkj0e0IPOtxxKnGWNGCFsrFLrmP%2BG9X%2FxOLQTPC0bF63Zelq1Zq6wrVaDDslc%2FaD54zMzNdZcFfbB%2FAN%2FMc3NGRBBn2mDZPvqfv; Path=/; Domain=https://.hku.hk; Max-Age=3600",
          "Accept": "application/json"
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error("Error:", error);
        });
};

// Exports the functions to be used in the HTML
export { login, logout, callApi };
