import { Query } from "react-apollo";
import gql from "graphql-tag";
import React from "react";
import AddTodo from "./AddTodo";

const ToDos = () => (
  <Query
    query={gql`
      query myq {
        todos {
          results {
            id
            name
            description
          }
        }
      }
    `}
  >
    {({ loading, error, data, refetch, ...rest }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

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
          <AddTodo refetchTodos={refetch} />
        </React.Fragment>
      );
    }}
  </Query>
);

export default ToDos;
