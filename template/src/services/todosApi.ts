import { api, prefixProxyEndpoint } from '@/services';

export type TodoItem = {
  _created: number,
  _data_type: string,
  _is_deleted: boolean,
  _modified: number,
  _self_link: string,
  _user: string,
  _uuid: string,
  completed: boolean,
  title: string
}

export type TodosResponse = {
  cursor?: number;
  items: TodoItem[];
  next_page?: number
}

type TodoBody = {
  _uuid?:string;
  title:string;
  completed:boolean
}

type DeleteTodoBody = {
  _uuid: string;
}

export const todosApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createTodo: builder.mutation<TodosResponse, TodoBody[]>({
      query: (body) => ({
        url: prefixProxyEndpoint(`/v1/task`),
        method: 'POST',
        body,
      })
    }),
    deleteTodo: builder.mutation<TodosResponse, DeleteTodoBody[]>({
      query: (body) => ({
        url: prefixProxyEndpoint(`/v1/task`),
        method: 'DELETE',
        body,
      })
    }),
    updateTodo: builder.mutation<TodosResponse, TodoBody[]>({
      query: (body) => ({
        url: prefixProxyEndpoint(`/v1/task`),
        method: 'PUT',
        body,
      })
    }),
    getTodos: builder.query<TodosResponse,void>({
      query: () => prefixProxyEndpoint(`/v1/task`)
    })
  }),
  overrideExisting: false
});

todosApi.enhanceEndpoints({
  addTagTypes: ['Todos'],
  endpoints: {
    
    getTodos: {
      providesTags: ['Todos']
    },
    createTodo: {
      invalidatesTags: ['Todos']
    },
    deleteTodo: {
      invalidatesTags: ['Todos']
    },
    updateTodo: {
      invalidatesTags: ['Todos']
    }
  }
})

export default todosApi;