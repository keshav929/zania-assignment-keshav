Steps to run this application:
1. git clone this repo.
2. navigate to project's root directory: zania-assignment-keshav
3. run command: npm start
4. app will start at port(1234) -> use localhost:1234 to access the application in browser

About the application:

This application displays the 5 document types that are part of an array store in the static.json at '/src/data/'. 

Initially, Just before rendering the application, we are making use of 'msw' service to store this static data into browser storage using post handler. 

The http handlers are located at '/src/mocks/handlers.js'. On Rendering, App component of the application is used to fetch the data using get request from msw service, which internally fetches the data from browser storage. 

Shimmer component of the application is there to show the loading placeholder items till the items are fetched from 'msw' service.

Document component is there to display the document title as well as document image. Different document type images are stored as configuration in the utils.js at '/src/utils', where each document type is mapped to a particular image url.

Overlay component is there to show the clicked document type's image, in the middle of the screen as an overlay. It can be closed using 'esc' key on the keyboard. This has been handled using useEscape hook at '/src/hooks/useEscape.js'

There are two set Intervals one to track the time since last save operation and the other to store the items on the storage through msw post handler every five seconds if the order has been changed.

To integrate drag and drop functionality, react-drag-reorder npm package has been used.
