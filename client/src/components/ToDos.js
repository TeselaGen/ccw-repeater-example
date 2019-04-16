import { Query } from "react-apollo";
import gql from "graphql-tag";
import React, { Component } from "react";
import { AddTodo } from "./AddTodo";

const myToDoQ = gql`
  query myToDoQ($pageSize: Int, $page: Int, $filter: JSON) {
    todos(pageSize: $pageSize, pageNumber: $page, filter: $filter) {
      results {
        id
        name
        description
        status
        user {
          firstName
        }
      }
      totalResults
    }
  }
`;

export class ToDos extends Component {
  LoadToDos({ loading, error, data, refetch, ...rest }) {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :( something went wrong </p>;

    let totalResults = data.todos.totalResults;
    let todoList = data.todos.results.map(
      ({ id, user, name, description, status }) => (
        <div key={id} className={"Todo." + status}>
          <p>
            {name}: {description} ({user.firstName})
          </p>
        </div>
      )
    );

    return (
      <React.Fragment>
        Page: {this.props.page} of{" "}
        {Math.ceil(totalResults / this.props.pageSize)}
        {todoList}
        {<AddTodo refetchTodos={refetch} />}
      </React.Fragment>
    );
  }

  render() {
    let page = this.props.page;
    let pageSize = 5;
    let filter = {
      userId: [1],
      status: ["Started", "NotStarted"]
    };
    return (
      <Query query={myToDoQ} variables={{ pageSize, page, filter }}>
        {reactObj => {
          return this.LoadToDos(reactObj);
        }}
      </Query>
    );
  }
}
