import React from "react";

function DocumentationPage() {
    return (
        <div className="App">
            <label className="label-title"> Documentation </label>

            <div className="div-left-align">
                <label> You can use the "Add City" button in the home page to search for the city and add it into the list. Then you can click on the city to see its weather details. <br/>
                    Note: The search page needs some time to load the list of cities from JSON file, so it will be empty for a couple of seconds when first shown :)
                </label>
            </div>
        </div>
    );
}

export default DocumentationPage