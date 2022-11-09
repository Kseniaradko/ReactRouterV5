import React from "react";
import {
  Switch,
  Route,
  Link,
  useParams,
  Redirect
} from "react-router-dom";
import users from "./fakeapi/users";

function UsersLayout({ children }) {
  const params = useParams();
  const { userId } = params;
  const isExisted = users.some((user) => user.id === Number(userId));

  if (!isExisted && userId) {
    return <Redirect to="/users" />;
  }
  return children;
}

function Users() {
  const params = useParams();
  const { userId } = params;
  return (
    <UsersLayout>
      <Switch>
        <Route path="/users" exact component={UsersListPage} />
        <Route path="/users/:userId/profile" exact component={UserPage} />
        <Route path="/users/:userId/edit" exact component={EditUserPage} />
        <Redirect to={`/users/${userId}/profile`} />
      </Switch>
    </UsersLayout>
  );
}

function UsersListPage() {
  return (
    <div>
      <br />
      <Link to="/">Home Page</Link>
      <h2>Users List Page</h2>
      <ul>
        {users.map((user) => {
          return (
            <li key={user.id}>
              <Link to={`/users/${user.id}/profile`}>{user.name}</Link>
            </li>  
          )
        })}
      </ul>
    </div>
  )
}

function UserPage() {
  const params = useParams();
  const { userId } = params;
  return (
    <div>
      <br/>
      <Link to="/">Home Page</Link>
      <h2>User Page</h2>
      <ul>
        <li>
          <Link to="/users">Users List Page</Link>
        </li>
        <li>
          <Link to={`/users/${userId}/edit`}>Edit User Page</Link>
        </li>
      </ul>
      {`UserId: ${userId}`} 
    </div>
  );
}

function EditUserPage() {
  const params = useParams();
  const { userId } = params;
  const newUserId = Number(userId) + 1;
  return (
    <>
      <h1>Edit User Page</h1>
      <ul>
        <li>
          <Link to={`/users/${userId}/profile`}>User Page</Link>
        </li>
        <li>
          <Link to={`/users/${newUserId}/profile`}>Another User Page</Link>
        </li>
        <li>
          <Link to="/users">Users List Page</Link>
        </li>
      </ul>
    </>
  )
}


function App() {
  return (
    <>
      <h1>Home Page</h1>
      <Link to="/users">Users List Page</Link>
      <Switch>
        <Route exact path="/" />
        <Route path="/users/:userId?" component={Users} />
        <Redirect to="/" />
      </Switch>
    </>
  );
}

export default App;
