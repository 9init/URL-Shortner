<div id="top"></div>

<!-- PROJECT Intro -->

<p align="center">
    More than just a URL Shortener
    <br />
    <a href="https://github.com/9init/URL-Shortner/issues">Report Bug</a>
    ·
    <a href="https://github.com/9init/URL-Shortner/issues">Request Feature</a>
  </p>
</div>

<!-- ABOUT THE PROJECT -->

# About The Project

URL-Shortner is a full-customizable, open source, free-to-use, usable-design-focued, tracking-intensive URL Shortener with awesome features, and **supports**:

- Creating short urls from long ones with, or without an account
- Customize back-halfs on every slug
- Deploy to custom  URL and Infrastructure
- Edit links after they're created
- Quick Redirections in less than 150ms
- Fast, Reliable
- Built on Modern and Well-used Technologies like Sequalize, Joi & NodeJS
- Use your own DBMS. URL-Shortner is compatible with MySQL, PostgreSQL and [many more](https://sequelize.org/)


<p align="right">(<a href="#top">back to top</a>)</p>

##  Built With (Tech Stack)

The following technologies were involved in the making of this project.

- [Node.js](https://nodejs.org/) - For the backend of the app
- [Joi](https://joi.dev/) - For querying the backend from the frontend efficiently
- [Sequalize](https://sequelize.org/) - The ORM used for the app
- Any relational or non-relational [database that sequalize supports](https://sequelize.org/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

# Quick Start Guide

To get started with having your own instance of URL-Shortner, follow the steps described in the following section

## Prerequisites

You will need these to be already installed:

- [NodeJS](https://nodejs.org/) 16+ and [NPM](https://npmjs.com/)
- [A supported database system](https://sequelize.org/)

And that's it

<p align="right">(<a href="#top">back to top</a>)</p>

## Installation

Follow these steps to get started with your own instance of URL-Shortner

1. Clone the repo and `cd` to the folder base of this repo
2. Run command `npm install` to install all the dependencies
3. Create a database named `url_shortner` in your chosen DBMS and note down the connection Username and Password
4. Fill in the values in the `.env` file
5. To promote to production, run `npm start`

<p align="right">(<a href="#top">back to top</a>)</p>

# Roadmap

This project is far from perfect, and we'll reach there one day, or at least get close.

- [x] Add forgotten password-reset capabilities
- [ ] Adding extra features such as enabling or disabling tracking on certain links
- [ ] Adding docker-compose supported quick installation
- [ ] Track each and every click on a slug, and retrieve
  - IP address
  - ISP Name
  - IP-Location
  - Device details like OS Version and Device Model
  - Browser Name and including version


Known Issues:

See the [open issues](https://github.com/9init/URL-Shortner/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

# API
1. Downlaod [Postman app](https://www.postman.com/)
2. Import the [Postman file](postman/api_url_shorten.json)
3. Run the server and play with it :)
</div>

<!-- CONTRIBUTING -->

# Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

# License

Distributed under the MIT License. See [`LICENSE.md`](LICENSE.md) for more information.

<p align="right">(<a href="#top">back to top</a>)</p>