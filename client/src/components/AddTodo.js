import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

export class AddTodo extends React.Component {
  constructor() {
    super();
    this.addTodoMutation = gql`
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
  }

  render() {
    let name;
    let description;
    //   const [loading, setLoading] = useState(false);

    return (
      <Mutation mutation={this.addTodoMutation}>
        {(addTodo, { data = {} }) => (
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
                        userId: "1"
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
        )}
      </Mutation>
    );
  }
}
