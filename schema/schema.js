const typeDefs = `
    type Greet {
        address: String!,
        message: String
    }

    type setGreeterReceipt {
        transactionHash: String!,
        blockHash: String!,
        blockNumber: Int!,
        gasUsed: Int!,
        status: Boolean!
    }

    type Query {
        greet: Greet
    }

    type Mutation {
        setGreeter(message: String!): setGreeterReceipt 
    }
`;

module.exports = typeDefs;
