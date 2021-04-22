
×
Congrats on completing activity 'Class Components in the Wild'!
Building Components as Classes
Assignment
65 minutes
 Status
Incomplete
We are going to build a second client application that uses our API to present a dashboard view of the interview data. This activity provides a guided approach to using components declared as classes.

In this activity, we will create class-based components and manage some basic state. In the next activity, we will add side effects like data fetching and WebSocket updates.

The purpose of these activities is to gain familiarity with the class syntax.

Project
Fork the scheduler-dashboard project. From the fork, clone the repository to a new project folder. Open the project in VS Code.

This project provides a starting point to learn about components built using JavaScript classes. The src/helpers folder provides functions we can use to manage data, and the src/components folder contains a single Dashboard component.

Ensure all other servers are not running. From the root of the scheduler-dashboard project install the dependencies with npm install and use the npm start command to run the server on the Host machine.

When we open the browser and navigate to the address of the webpack development server, we see a dark and empty page.

The scheduler-dashboard uses port 9000 so that it does not conflict with the scheduler server that runs on port 8000. A the end of this activity we will run three servers, including our scheduler-api on 8001.

Dashboard
We will start with the Dashboard component. There is no Application component because the dashboard is the application.

Open the src/components/Dashboard.js file.

We have declared the Dashboard component using the ES6 Class syntax. The Dashboard class extends the Component class. Extending the class allows us to access some of the common component API functions.

class Dashboard extends Component {
  render() {
    const dashboardClasses = classnames("dashboard");
    return <main className={dashboardClasses} />;
  }
}
The only function that a component needs to declare is the render function. This render function is equivalent to the body of the components that we declare as functions.

If we wrote the same component without classes, it would perform the equivalent behaviour and return the same value.

function Dashboard(props) {
  const dashboardClasses = classnames("dashboard");
  return <main className={dashboardClasses} />;
}
Loading
We are going to start by setting up a loading state. Eventually, we will load data, so we will need to show something while the operation is in progress. It should default to true because the application will start the data immediately after the components render for the first time.

At the top of the class add the initial state value as state = { loading: true }.

When the value of this.state.loading is true we want to render the loading indicator conditionally. 

Create a new src/components/Loading.js file and export a Loading component that is declared using a class.

import React, { Component } from "react";

export default class Loading extends Component {
 render() {
  return <section className="loading">Loading</section>;
 }
}
Now we can import the Loading component from the components/Loading module and show it when the application is in the loading state.

Import the Loading component and show it when the state is loading.

class Dashboard extends Component {
  state = {
    loading: true
  };

  render() {
    const dashboardClasses = classnames("dashboard");

    if (this.state.loading) {
      return <Loading />;
    }

    return <main className={dashboardClasses} />;
  }
}
When we check the browser, we can see a large Loading indicator. It doesn't go away because we don't change the state. Once we have tested that the loading indicator works, we can hide it by default.

Change the initial value of the loading state to false so the empty dashboard renders.

Panel
Our dashboard is going to show four panels. Each panel will display details about our Interview Scheduler.

Panels

We don't have real data at this point. We can still build the components with fake data which we replace later.

Add the fake data to the top of the src/components/Dashboard.js file.

const data = [
  {
    id: 1,
    label: "Total Interviews",
    value: 6
  },
  {
    id: 2,
    label: "Least Popular Time Slot",
    value: "1pm"
  },
  {
    id: 3,
    label: "Most Popular Day",
    value: "Wednesday"
  },
  {
    id: 4,
    label: "Interviews Per Day",
    value: "2.3"
  }
];
A Panel component will represent each of the four panels; we will pass the relevant data to each one.

Create a new src/components/Panel.js file and export a Panel component that is declared using a class. Import the Panel component in src/components/Dashboard.js.

import React, { Component } from "react";

class Panel extends Component {
  render() {
    const { label, value } = this.props;

    return (
      <section
        className="dashboard__panel"
      >
        <h1 className="dashboard__panel-header">{label}</h1>
        <p className="dashboard__panel-value">{value}</p>
      </section>
    );
  }
}

export default Panel;