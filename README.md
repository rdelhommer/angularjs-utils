# ng-utils
Common services, directives, factories, etc. for an AngularJS app

## Installation
### NPM
```
npm install @rdelhommer/ng-utils --save
```
### Yarn
```
yarn add @rdelhommer/ng-utils
```
### Include
```
<script src="node_modules/@rdelhommer/ng-core/dist/ng-core.js"></script>
<script src="node_modules/@rdelhommer/ng/dist/ng.js"></script>
```

## Components

### Directives

#### lowercase
Attribute directive for text inputs transforms value to lowercase.
#### uppercase
Attribute directive for text inputs transforms value to uppercase.
#### contenteditable
Attribute directive to provide ngModel backed contenteditable div
#### enter-as-tab
Attribute directive for inputs that selects the next input when the enter key is pressed

### Services

#### localNotifications
Service for tracking notification counts in local storage.
* Increment count for notification with unique id
* Clear notification counts when going to a particular state
* Subscribe to count changes by notification id

### TODO
* Minification
