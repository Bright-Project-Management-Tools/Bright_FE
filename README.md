Bright is an all-in-one project management tool designed to streamline and enhance your team's workflow.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Commit Guidelines](#commit-guidelines)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)
- [Feedback](#feedback)

## Installation

To run Bright locally, follow these steps:

1. Clone the project repository:
    ```bash
    git clone https://github.com/Mudoker/Bright_FE.git
    ```

2. Navigate to the project directory:
    ```bash
    cd bright_frontend
    ```

3. Install the necessary dependencies:
    ```bash
    npm i -g pnpm && pnpm i && pnpm i prop-types
    ```

4. Start the development server:
    ```bash
    pnpm start
    ```

## Usage

Once the server is running, you can access Bright through your web browser at the designated local server address.

## Commit Guidelines

To maintain a consistent codebase, please adhere to the Conventional Commits specification for your commit messages. This practice facilitates easier code reviews and debugging.

Refer to the Conventional Commits guidelines: [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

After making your commits, ensure you run the following command to format all files in the repository:
```bash
pnpm format
```

## Tech Stack

**Client:** React, Redux, TailwindCSS, JavaScript, TypeScript

**Server:** Node, ExpressJs, MongoDB, RabbitMQ

## Contributing

Although the project is open source and allows for all non-commercial use, it does not yet allow direct contribution from people outside of the organization. However, contributors can go through the issues tab, search for tasks that have no assignee, create a new branch starting with `feat/`, and create a pull request to the `development` branch.

## Feedback

We value your feedback! If you have any suggestions or encounter any issues, please contact us at: <huuquoc7603@gmail.com>
