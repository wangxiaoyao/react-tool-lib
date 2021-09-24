import React from "react";
import { Route, Switch } from "react-router-dom";
import NoMatch from "@page/NoMatch";

const RouteView = (props) => {
  const { defaultConfig } = props;
  return (
    <Switch>
      {defaultConfig.map((item, index) => {
        return (
          <Route
            path={item.path}
            key={item.key}
            exact
            render={(props) => {
              document.title = item.title;
              return <item.component {...props} routers={item.children} />;
            }}
          />
        );
      })}
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
};

export default RouteView;
