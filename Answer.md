# My Answer

# Goal 1

The concept was straightforward: retrieve the most pertinent result on the page, then navigate to that page for additional relevant data about the specific hotel. Employing regex, we managed to sift through the HTML efficiently and extract only the essential information. I employed this method to tackle the issue, relying on AI solely to assist in crafting the regex rules.

With this idea, we have now access to data like:

-   Reviews
-   Photos
-   Facilities
-   Availability
-   Surroundings

# Goal 2 - Feedback about New User Wizard

Hey everyone, fantastic work on implementing this new feature! Before we ship it out, I'd like to add a few considerations.

-   When users fill out the form and click "Save & Continue" if there are any errors, they don't receive appropriate feedback to address them and proceed.

-   I noticed that some components lack cursor pointer effects, especially those with clickable areas, and I'm not satisfied with this type of form. Saving each step doesn't seem ideal because users can't start filling out the form now and continue later. I suggest replacing the "Save & Continue" button with just "Next." Our previous "Review & Edit" step was excellent and solved these issues effectively.

-   Perhaps we could consider implementing some field validations, such as for the booking.com link input. It might be beneficial to verify if the link provided is indeed from booking.com and for domain, can we check if is a valid domain before save?

-   The "Amenities & Services" components don't seem satisfactory. While we currently have only a few options, many hotels offer a wider range of amenities. Perhaps we could introduce a component featuring a list of options. Users could select from the list, but if an option doesn't exist, they should be able to create it, with the addition being available to all users.

-   The social media links input could be significantly improved. Perhaps having separate input fields for each social media platform, such as one for Instagram and another for LinkedIn, would be a much better approach.

-   After logging in, certain user data appears in the console.log, let's remove this.

-   I'm not fond of this wizard style; it doesn't give off a progressive vibe. Users might perceive it as disconnected and feel dissatisfied with the experience. Perhaps we could transform this to resemble an onboarding process. Users could start by answering some initial questions, and then new questions would appear gradually. What does everyone think about this approach?

# Considerations

This test was unlike any other I've ever taken. I appreciate this approach. In my previous job, I worked on a feature similar to this one, which involved a wizard for issuing options in a cap table. I drew upon all the insights and considerations from that experience to inform my approach to this challenge.
