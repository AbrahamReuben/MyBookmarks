function superSearch() {
    var CHG_base_url, INC_base_url, SQLCODE_base_url, searchString, table, row, dynamicURLText, found, i, td, rowText, cisFuzzy, cisFuzzyText;
    // Base URLs
    CHG_base_url = "https://xyz.service-now.com/nav_to.do?uri=change_request.do?sysparm_query=number=";
    INC_base_url = "https://xyz.service-now.com/nav_to.do?uri=incident.do?sysparm_query=number=";
    SQLCODE_base_url = "https://www.ibm.com/docs/api/v1/content/ssw_ibm_i_74/rzala/rzalaml.htm#messages__SQL";
    // Get the search string from the input field
    searchString = document.getElementById("myInput").value.toUpperCase();
    // Get the table element to hide/display
    table = document.getElementById("myTable");
    // Get the row element to hide/display
    row = table.getElementsByTagName("tr");
    // Get the dynamic url element to hide/display
    // dynamicURL = document.getElementById("dynamicURL");
    dynamicURLText = "";
    // Set found to blanks
    found = "";
    // Determine the nature of search
    // Do not display the table or the dynamic url element if the search element is blanks
    if (searchString === "") {
        found = "";
    } else {
        // Determine if the search string is something from the table
        for (i = 0; i < row.length; i++) {
            // Get the row detail
            td = row[i].getElementsByTagName("td")[0];
            if (td) {
                rowText = td.textContent.toUpperCase() || td.innerText.toUpperCase();
                // If row text matches with the search string then set the row to display
                if (rowText.indexOf(searchString) > -1) {
                    row[i].style.display = "";
                    found = "row";
                } else {
                    row[i].style.display = "none";
                }
            }
        }
        // Determine if there was a match from the table
        if (found === "") {
            // Determine if the search string is for a Change, Incident or SQLCODE
            cisFuzzy = searchString.match(/^CHG[0-9]{7}$|^INC[0-9]{7}$|^SQL[0-9]{4}$/gi);
            if (cisFuzzy != null) {
                switch (true) {
                    // If the searchString is for a Change
                    case (cisFuzzy[0].search(/CHG[0-9]{7}/gi) == 0):
                        dynamicURLText = "<a href='" + CHG_base_url + cisFuzzy[0] + "' target='_blank'> " + cisFuzzy[0] + "</a> " + " - " + CHG_base_url + cisFuzzy[0];
                        found = "url";
                        break;
                    // If the searchString is for a Change
                    case (cisFuzzy[0].search(/INC[0-9]{7}/gi) == 0):
                        dynamicURLText = "<a href='" + INC_base_url + cisFuzzy[0] + "' target='_blank'> " + cisFuzzy[0] + "</a> " + " - " + INC_base_url + cisFuzzy[0];
                        found = "url";
                        break;
                    // If the searchString is for a Change
                    case (cisFuzzy[0].search(/SQL[0-9]{4}/gi) == 0):
                        dynamicURLText = "<a href='" + SQLCODE_base_url + cisFuzzy[0].substring(3, 7) + "' target='_blank'> SQL" + cisFuzzy[0].substring(3, 7) + "</a> " + " - " + SQLCODE_base_url + cisFuzzy[0].substring(3, 7);
                        found = "url";
                        break;
                }
            }
        }
        // If nothing matches - do a google search?
        if (found === "") {
            dynamicURLText = "<a href='" + 'https://www.google.com/search?q=' + searchString + "' target='_blank'>Perhaps a Google search?" + "</a>";
        }
    }
    // Determine how to render the elements
    switch (true) {
        case (found == ""):
            document.getElementById("dynamicURL").innerHTML = dynamicURLText;
            table.setAttribute("hidden", "hidden");
            break;
        case (found == "url"):
            document.getElementById("dynamicURL").innerHTML = dynamicURLText;
            table.setAttribute("hidden", "hidden");
            break;
        case (found == "row"):
            document.getElementById("dynamicURL").innerHTML = "";
            table.removeAttribute("hidden");
            break;
    }
}

function timeRefresh() {
    var refresh = 1000; // Refresh rate in milli seconds
    mytime = setTimeout('displayCurrentTime()', refresh)
}

function displayCurrentTime() {
    var datetime = new Date();
    document.getElementById('INtime').innerHTML = datetime.toLocaleString("en-US", { timeZone: "Asia/Calcutta" });
    document.getElementById('UStime').innerHTML = datetime.toLocaleString("en-US", { timeZone: "America/Chicago" });
    document.getElementById('PLtime').innerHTML = datetime.toLocaleString("en-US", { timeZone: "Europe/Warsaw" });
    timeRefresh();
}
