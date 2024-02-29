export const typeDefs = `#graphql

type Games {
    id: ID!
    title: String
    platform: [String!]!
    reviews: [Review!]
}

type Author {
    id: ID!
    name: String!
    verified: Boolean!
    reviews: [Review!]
}

type Review {
    id: ID!
    rating: Int!
    content: String
    game: Games!
    author: Author!
}

type Query {
    reviews: [Review]
    review(id: ID!): Review
    game(id: ID!): Games
    author(id : ID!) : Author
    games: [Games]
    authors: [Author!]!
}

`