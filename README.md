# DailyPlanner

## Project Description:
1. Who is it for?
   - Anyone who is indecisive about what to do

2. What will it do? (What "human activity" will it support?)
   - It will help with indecision -- users will input their current ‘feelings’, availability, and the maximum distance they are willing to travel. Our app will then return a recommended ‘plan’ to that user
   - The ‘feelings’ that a user selects will be associated with some tag which we will use to lookup associated places.
   - This app will support users in making decisions about what to do.

3. What type of data will it store? What will users be able to do with this data?
   - On each lookup (using Google Places API) we will store the results of that lookup in our database. This will prevent us from continuing to make API requests for the same location. We will refresh the data stored occasionally to ensure it is not out of date.
Users will not have direct access to this data; rather, we will store this data in order to reduce the number of API requests.

4. What is some additional functionality you can add/remove based on time constraints?
   - We could add the ability for a user to login and see their past ‘plans’
   - We could remove the time constraints added by the user and instead of making a schedule just return a list of recommended things to do based on their feelings.

## Project task requirements:
- 3-5 minimal requirements (will definitely complete)
  1. A frontend where users can enter their feelings
  2. Association of these feelings to tags that will be used to lookup places using the Google Places API, and subsequent storage of this data in our db
  3. Creation of some recommended activities for the user

- 3-7 "standard" requirements (will most likely complete)
  1. The ability to return a plan to users that takes into account the distance from one place to another
  2. The ability to return a plan to users that takes into account the times that they are available
  3. The ability to return a commute plan between those suggested places
  4. User can download & import the plan to their calendar

- 2-3 stretch requirements (hope to complete 1!)
  1. Some ML to help learn users' preferences
  2. Mobile friendly UI design

## Initial Task Breakdown:
- Frontend:
    1. Methods to integrate with backend
    2. UI for users -- HTML and CSS
    3. Association of a users feelings with tags
- Backend:
    1. Make requests to Google Places API
    2. Storage of the data returned from these requests in a database


## ProposalDraft:

![Proposal Draft](Reference/ProposalDraft.jpg?raw=true "ProposalDraft")
