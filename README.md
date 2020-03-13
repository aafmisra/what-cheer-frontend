# What Cheer :sunny:

![What Cheer journal](https://i.imgur.com/9zq9VOH.png)
![What Cheer add an entry](https://i.imgur.com/08M3H9w.png)

## About What Cheer

What Cheer is a gratitude journal. Gratitude journaling has shown an ability to improve the author’s happiness and life satisfaction, reduce stress levels, and reduce depressive symptoms. We are constantly bombarded with negativity from our TVs, our news feeds, and the people we interact with daily. In today’s fast-paced world, What Cheer lets users slow down, practice mindfulness, and reflect on the positive aspects of their lives. 

It was made by:

- [Asha Misra](https://github.com/aafmisra)
- [Chris Wargo](https://github.com/chrisrw/)

## Features

What Cheer has full CRUD capability with user authentication. Users can create and log in to an account, where they can add, edit, and delete entries in their journal. If they need inspiration when creating a new journal entry, users can click a button to get an idea prompt.

Users can also upload images along with their journal entries. On their journal page, they can filter the entries they see with a search feature. 

### Fully Responsive

![What Cheer mobile](https://i.imgur.com/RTxNExp.png)

What Cheer was built with mobile use in mind, so it was designed for mobile screens.

## Technologies Used

What Cheer was built with React on the frontend, including React Router, hooks, and context. Users are authenticated using JSON Web Token. Image upload is facilitated by Amazon Web Services S3. The app was designed with vanilla CSS.

The backend is an API built with Python, Django REST framework, and PostgreSQL. Both the back and front ends are deployed to Heroku.

You can see the backend repo [here](https://github.com/chrisrw/What-Cheer-Back-End).

## Installation Instructions

Fork and clone or download this repo to get your local copy of the files. Install dependencies with ```npm```. Use ```yarn start``` or ```npm start``` to launch the development server.

Visit the backend repo, download files and install dependencies with ```pipenv```. Install PostgreSQL and run ```psql -U postgres -f settings.sql``` to create your local database. Use ```python3 manage.py runserver``` to run the server locally. 

## Contribution

Please submit an issue on this repo if you find a bug in the code. To make suggestions on features or other behavior, please make a pull request. Thanks!

## Known Bugs & Future Updates

Our image upload feature is not perfect. For some reason that we have spent hours on the internet trying to nail down, our Django model does not honor the "blank=True" attribute on our image field, so images are currently required with journal entry creation. This was not our original intent, and it's something we'd like to address in the future. 

## Gratitude 

Asha and Chris are going to dedicate some very long gratitude journal entries to Jennifer Meade. Without her expertise and patience, we wouldn't have made it as far as we did. Hou Chia's regular standup meetings kept us motivated. Thanks to Esin Saribudak, who shared tutorials that helped us with architecting the frontend and deploying the backend. We are also indebted to many of our cohort-mates, who helped us work out bugs and commiserated with us through this challenging project.