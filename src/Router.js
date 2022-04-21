import React, { useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Layout from "./components/Layout";
import AuthContext from "./contexts/AuthContext";
import AddQuestion from "./pages/AddQuestion";
import CodePage from "./pages/CodePage";
import VideoPage from "./pages/VideoPage";
import CreateTest from "./pages/CreateTest";
import History from "./pages/History";
import Questions from "./pages/Questions";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Test from "./pages/Test";
import Records from "./pages/Records";

const Router = () => {
  const { loggedIn } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path={"/"}
          exact
          component={() =>
            loggedIn ? (
              <Layout>
                <Test />
              </Layout>
            ) : (
              <Redirect to={"/login"} />
            )
          }
        />
        <Route
          path={"/createTest"}
          exact
          component={() =>
            loggedIn ? (
              <Layout>
                <CreateTest />
              </Layout>
            ) : null
          }
        />
        <Route
          path={"/testHistory"}
          exact
          component={() =>
            loggedIn ? (
              <Layout>
                <History />
              </Layout>
            ) : null
          }
        />
        <Route
          path={"/testRecords"}
          exact
          component={() =>
            loggedIn ? (
              <Layout>
                <Records />
              </Layout>
            ) : null
          }
        />
        <Route
          path={"/allQuestions"}
          exact
          component={() =>
            loggedIn ? (
              <Layout>
                <Questions />
              </Layout>
            ) : null
          }
        />
        <Route
          path={"/addQuestion"}
          exact
          component={() =>
            loggedIn ? (
              <Layout>
                <AddQuestion />
              </Layout>
            ) : null
          }
        />
        <Route
          path={"/code/:testid"}
          exact
          component={() => (loggedIn ? <CodePage /> : null)}
        />
        <Route
          path={"/video/:testid"}
          exact
          component={() => (loggedIn ? <VideoPage /> : null)}
        />
        <Route
          path={"/login"}
          exact
          component={() => (!loggedIn ? <Signin /> : <Redirect to={"/"} />)}
        />
        <Route
          path={"/register"}
          exact
          component={() => (!loggedIn ? <Signup /> : <Redirect to={"/"} />)}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
