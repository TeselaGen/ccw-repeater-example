import { Query } from "react-apollo";
import gql from "graphql-tag";
import React, { Component } from "react";
import { AddTodo } from "./AddTodo";

export class ToDos extends Component {
  render() {
    let QRY = gql`
      query myToDoQ($page: Int) {
        todos(pageSize: 10, pageNumber: $page) {
          results {
            id
            name
            description
          }
        }
      }
    `;

    let page = this.props.page;
    return (
      <Query query={QRY} variables={{ page }}>
        {({ loading, error, data, refetch, ...rest }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :( something went wrong </p>;

          console.log(rest);
          console.log(data);

          let todoList = data.todos.results.map(({ id, name, description }) => (
            <div key={id}>
              <p>
                {name}: {description}
              </p>
            </div>
          ));

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
