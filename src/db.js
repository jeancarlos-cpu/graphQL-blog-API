const users = [{
    id: '1',
    name: 'Andrew',
    email: 'andrew@example.com',
    age: 27
}, {
    id: '2',
    name: 'Sarah',
    email: 'sarah@example.com'
}, {
    id: '3',
    name: 'Mike',
    email: 'mike@example.com'
}]

const posts = [{
    id: '10',
    title: 'GraphQL 101',
    body: 'This is how to use GraphQL...',
    published: true,
    author: '1'
}, {
    id: '11',
    title: 'GraphQL 201',
    body: 'This is an advanced GraphQL post...',
    published: false,
    author: '1'
}, {
    id: '12',
    title: 'Programming Music',
    body: '',
    published: false,
    author: '2'
}]

const comments = [
    {
        id: '331',
        text: 'Minus culpa quia possimus mollitia fuga quaerat delectus',
        author: '1',
        post: '11'
    },
    {
        id: '11654',
        text: 'Perspiciatis quia molestias aliquid',
        author: '1',
        post: '12'
    },
    {
        id: '63151',
        text: 'Iusto incidunt id omnis',
        author: '2',
        post: '10'
    },
    {
        id: '39217',
        text: 'Atque veniam quaerat',
        author: '2',
        post: '11'
    },
    {
        id: '73500',
        text: 'Aut autem qui veritatis consequatur eveniet cum voluptatem atque et',
        author: '3',
        post: '11'
    },
    {
        id: '57995',
        text: 'Voluptates omnis nam',
        author: '3',
        post: '12'
    },
    {
        id: '63112',
        text: 'Rerum est possimus',
        author: '3',
        post: '12'
    },
];

module.exports = {
    users,
    posts,
    comments
}