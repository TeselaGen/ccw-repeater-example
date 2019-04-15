import { Query } from "react-apollo";
import gql from "graphql-tag";
import React, { Component } from "react";
import { AddTodo } from "./AddTodo";

export class ToDos extends Component {
  render() {
    let QRY = gql`
      query myToDoQ($pageSize: Int, $page: Int, $filter: JSON) {
        todos(pageSize: $pageSize, pageNumber: $page, filter: $filter) {
          results {
            id
            name
            description
            user {
              firstName
            }
          }
        }
      }
    `;

    let page = this.props.page;
    let pageSize = 5;
    let filter = { userId: [1] };
    return (
      <Query query={QRY} variables={{ pageSize, page, filter }}>
        {({ loading, error, data, refetch, ...rest }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :( something went wrong </p>;

          console.log(rest);
          console.log(data);

          let todoList = data.todos.results.map(
            ({ id, user, name, description }) => (
              <div key={id}>
                <p>
                  {name}: {description} ({user.firstName})
                </p>
              </div>
            )
          );

          return (
            <React.Fragment>
              {todoList}
              {<AddTodo refetchTodos={refetch} />}
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}
