const typeDefs = `
    type Greet {
        address: String!,
        message: String
    }

    type transactionReceipt {
        transactionHash: String!,
        blockHash: String!,
        blockNumber: Int!,
        gasUsed: Int!,
        status: Boolean!
    }
    type setGreeterReceipt {
        transactionHash: String!,
        from: String!,
        to: String!
    }
    type Comment {
        id: String
        content: String
      }
    type Query {
        greet: Greet
    }

    type Mutation {
        setGreeter(message: String!): setGreeterReceipt 
    }
    type Subscription {
        transactionMined: transactionReceipt
      }
`;

module.exports = typeDefs;
