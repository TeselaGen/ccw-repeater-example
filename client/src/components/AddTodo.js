import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const addToDoMutation = gql`
  mutation myq($input: [createTodoInput]) {
    createTodo(input: $input) {
      createdItemsCursor {
        results {
          id
        }
        totalResults
      }
    }
  }
`;

export class AddTodo extends React.Component {
  AddAToDo(addTodo, { loading, error, data = {} }) {
    let name;
    let description;
    return (
      <div>
        <form
          onSubmit={async e => {
            e.preventDefault();
            const nameToUse = name;
            const descriptionToUse = description;
            //             setLoading(true);
            await addTodo({
              variables: {
                input: [
                  {
                    name: nameToUse.value,
                    description: descriptionToUse.value,
                    categoryId: "1",
                    userId: "1",
                    status: "NotStarted"
                  }
                ]
              }
            });
            await this.props.refetchTodos();
            nameToUse.value = "";
            descriptionToUse.value = "";

            //             setLoading(false);
          }}
        >
          <div>
            Name:
            <input
              ref={node => {
                name = node;
              }}
            />
          </div>
          <div>
            Description:
            <textarea
              ref={node => {
                description = node;
              }}
            />
          </div>
          <div id="Category" />
          <button type="submit">Add Todo</button>
        </form>
      </div>
    );
  }

  render() {
    return (
      <Mutation mutation={addToDoMutation}>
        {(addTodo, reactObj) => {
          return this.AddAToDo(addTodo, reactObj);
        }}
      </Mutation>
    );
  }
}
