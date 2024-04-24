# My Shop 🛒

A React Native-based, simple groceries shop. 


### List of used libraries and technologies:

* **[Expostack](https://createexpostack.com/):** A really good app bootstrapper, which allows you to create advanced boilerplates with a few keyboard clicks.
* **[TanStack Query](https://tanstack.com/query/latest):** Quite powerful fetching and state management library. A good alternative to Redux when you do not need too much complexity.
* **[Tamagui UI](https://tamagui.dev/):** Modern, a bit "on hype" UI KIT. Fast and multiplatform.
* **[Expo Router](https://docs.expo.dev/router/introduction/):** File-based navigation. A good alternative to classic React Navigation.
* **[Jest](https://jestjs.io/):** Reliable and worldwide beloved testing framework.
* **[Prettier](https://prettier.io/):** Almost de facto standard, code formatting tool.
* **[ESLint](https://eslint.org/):** Also almost an industry standard for linting and code style.

## Installation and Running

* To start app in the dev mode, run the folllowing comands:
```js
npm install
npm run start 
```

* ```npm run test ``` - run unit tests for the Api and Data Layer logic
* ```npm run lint ``` - code style check
* ```npm run lint:formatting ``` - check code formatting

## API and Data Layer Solution

To simulate API calls, I have chosen a strategy commonly used in full-scale API services. There are two types of entities:

* Data Layer - responsible for direct communication with the data source.
* API - holds the business logic.

This approach enables you to achieve the following benefits:

* Decoupling - You can replace parts of the system, making it capable of working with different data sources very easily. This technique especially shines when used in conjunction with dependency injection/inversion of control (as seen in frameworks like Nest.js or Angular, for example).

* Maintainability/Readability - A system comprised of small, well-structured pieces is much easier to read, develop, and maintain.

* Testability - A system composed of small pieces is much easier to test, allowing for independent testing of its components.

