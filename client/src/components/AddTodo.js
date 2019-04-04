import React, { useState } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const ADD_TODO = gql`
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

const AddTodo = props => {
  let name;
  let description;
  const [loading, setLoading] = useState(false);

  return (
    <Mutation mutation={ADD_TODO}>
      {(addTodo, { data = {} }) => (
        <div>
          <form
            onSubmit={async e => {
              e.preventDefault();
              const nameToUse = name;
              const descriptionToUse = description;
              setLoading(true);
              await addTodo({
                variables: {
                  input: [
                    {
                      name: nameToUse.value,
                      description: descriptionToUse.value
                    }
                  ]
                }
              });
              await props.refetchTodos();
              nameToUse.value = "";
              descriptionToUse.value = "";

              setLoading(false);
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
            <button type="submit">Add Todo</button>
            {loading && <div>loading...</div>}
          </form>
        </div>
      )}
    </Mutation>
  );
};

export default AddTodo;
